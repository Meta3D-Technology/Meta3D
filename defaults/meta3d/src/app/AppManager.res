open Js.Typed_array

open AppFileType

let _checkVersion = (protocolVersion, dependentProtocolVersion) => {
  Semver.satisfies(Semver.minVersion(protocolVersion), dependentProtocolVersion)
    ? ()
    : Meta3dCommonlib.Exception.throwErr(
        Meta3dCommonlib.Exception.buildErr(
          Meta3dCommonlib.Log.buildErrorMessage(
            ~title="version not match",
            ~description={
              j`${protocolVersion} not match dependentProtocolVersion:${dependentProtocolVersion}`
            },
            ~reason="",
            ~solution=j``,
            ~params=j``,
          ),
        ),
      )
}

let _convertDependentMap = (dependentMap, allDataMap) => {
  dependentMap
  ->Meta3dCommonlib.ImmutableHashMap.entries
  ->Meta3dCommonlib.ArraySt.reduceOneParam(
    (. map, (dependentNameKey, dependentData: ExtensionFileType.dependentData)) => {
      let (newName, protocolVersion) = switch allDataMap->Meta3dCommonlib.ImmutableHashMap.get(
        dependentData.protocolName,
      ) {
      | None =>
        Meta3dCommonlib.Exception.throwErr(
          Meta3dCommonlib.Exception.buildErr(
            Meta3dCommonlib.Log.buildErrorMessage(
              ~title={j`not find dependent protocol: ${dependentData.protocolName}`},
              ~description={
                j``
              },
              ~reason="",
              ~solution=j``,
              ~params=j``,
            ),
          ),
        )
      | Some(data) => data
      }

      _checkVersion(protocolVersion, dependentData.protocolVersion)

      map->Meta3dCommonlib.ImmutableHashMap.set(dependentNameKey, newName)
    },
    Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  )
}

let convertAllFileData = (
  allExtensionFileData: array<ExtensionFileType.extensionFileData>,
  allContributeFileData: array<ExtensionFileType.contributeFileData>,
  (
    allExtensionNewNames: array<Meta3dType.Index.extensionName>,
    isStartedExtensions: array<Meta3dType.Index.extensionName>,
    allContributeNewNames: array<Meta3dType.Index.contributeName>,
  ),
): (
  array<(extensionPackageData, ExtensionFileType.extensionFuncData)>,
  array<(contributePackageData, ExtensionFileType.contributeFuncData)>,
) => {
  // TODO check:allExtensionNewNames.length == allExtensionFileData.length
  // TODO check:allContributeNewNames.length == allContributeFileData.length

  let allExtensionDataMap =
    allExtensionFileData->Meta3dCommonlib.ArraySt.reduceOneParami(
      (. result, {extensionPackageData}, i) => {
        result->Meta3dCommonlib.ImmutableHashMap.set(
          extensionPackageData.protocol.name,
          (
            allExtensionNewNames->Meta3dCommonlib.ArraySt.getExn(i),
            extensionPackageData.protocol.version,
          ),
        )
      },
      Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    )
  let allContributeDataMap =
    allContributeFileData->Meta3dCommonlib.ArraySt.reduceOneParami(
      (. result, {contributePackageData}, i) => {
        result->Meta3dCommonlib.ImmutableHashMap.set(
          contributePackageData.protocol.name,
          (
            allContributeNewNames->Meta3dCommonlib.ArraySt.getExn(i),
            contributePackageData.protocol.version,
          ),
        )
      },
      Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    )

  (
    allExtensionFileData->Meta3dCommonlib.ArraySt.reduceOneParami(
      (. result, {extensionPackageData, extensionFuncData}, i) => {
        let newName = allExtensionNewNames->Meta3dCommonlib.ArraySt.getExn(i)

        result->Meta3dCommonlib.ArraySt.push((
          (
            {
              name: newName,
              isStart: isStartedExtensions->Meta3dCommonlib.ArraySt.includes(newName),
              dependentExtensionNameMap: _convertDependentMap(
                extensionPackageData.dependentExtensionNameMap,
                allExtensionDataMap,
              ),
              dependentContributeNameMap: _convertDependentMap(
                extensionPackageData.dependentContributeNameMap,
                allContributeDataMap,
              ),
            }: extensionPackageData
          ),
          extensionFuncData,
        ))
      },
      [],
    ),
    allContributeFileData->Meta3dCommonlib.ArraySt.reduceOneParami(
      (. result, {contributePackageData, contributeFuncData}, i) => {
        let newName = allContributeNewNames->Meta3dCommonlib.ArraySt.getExn(i)

        result->Meta3dCommonlib.ArraySt.push((
          (
            {
              name: newName,
              dependentExtensionNameMap: _convertDependentMap(
                contributePackageData.dependentExtensionNameMap,
                allExtensionDataMap,
              ),
              dependentContributeNameMap: _convertDependentMap(
                contributePackageData.dependentContributeNameMap,
                allContributeDataMap,
              ),
            }: contributePackageData
          ),
          contributeFuncData,
        ))
      },
      [],
    ),
  )
}

let generate = ((
  allExtensionFileData: array<(extensionPackageData, ExtensionFileType.extensionFuncData)>,
  allContributeFileData: array<(contributePackageData, ExtensionFileType.contributeFuncData)>,
)): ArrayBuffer.t => {
  let encoder = TextEncoder.newTextEncoder()

  [
    allExtensionFileData
    ->Meta3dCommonlib.ArraySt.reduceOneParam(
      (. result, (extensionPackageData, extensionFuncData)) => {
        result
        ->Meta3dCommonlib.ArraySt.push(
          TextEncoder.encodeUint8Array(extensionPackageData->Obj.magic->Js.Json.stringify, encoder),
        )
        ->Meta3dCommonlib.ArraySt.push(extensionFuncData)
      },
      [],
    )
    ->BinaryFileOperator.generate
    ->Uint8Array.fromBuffer,
    allContributeFileData
    ->Meta3dCommonlib.ArraySt.reduceOneParam(
      (. result, (contributePackageData, contributeFuncData)) => {
        result
        ->Meta3dCommonlib.ArraySt.push(
          TextEncoder.encodeUint8Array(
            contributePackageData->Obj.magic->Js.Json.stringify,
            encoder,
          ),
        )
        ->Meta3dCommonlib.ArraySt.push(contributeFuncData)
      },
      [],
    )
    ->BinaryFileOperator.generate
    ->Uint8Array.fromBuffer,
  ]->BinaryFileOperator.generate
}

let _parse = (appBinaryFile: ArrayBuffer.t) => {
  let decoder = TextDecoder.newTextDecoder("utf-8")

  let [allExtensionBinaryUint8File, allContributeBinaryUint8File] = BinaryFileOperator.load(
    appBinaryFile,
  )

  (
    BinaryFileOperator.load(allExtensionBinaryUint8File->Uint8Array.buffer)
    ->Meta3dCommonlib.ArraySt.chunk(2)
    ->Meta3dCommonlib.ArraySt.map(([extensionPackageData, extensionFuncData]) => {
      let lib =
        TextDecoder.decodeUint8Array(extensionFuncData, decoder)->LibUtils.serializeLib("Extension")

      {
        extensionPackageData: TextDecoder.decodeUint8Array(extensionPackageData, decoder)
        ->FileUtils.removeAlignedEmptyChars
        ->Js.Json.parseExn
        ->Obj.magic,
        extensionFuncData: {
          getExtensionServiceFunc: LibUtils.getFuncFromLib(lib, "getExtensionService")->Obj.magic,
          createExtensionStateFunc: LibUtils.getFuncFromLib(lib, "createExtensionState")->Obj.magic,
          getExtensionLifeFunc: LibUtils.getFuncFromLib(lib, "getExtensionLife")->Obj.magic,
        },
      }
    }),
    BinaryFileOperator.load(allContributeBinaryUint8File->Uint8Array.buffer)
    ->Meta3dCommonlib.ArraySt.chunk(2)
    ->Meta3dCommonlib.ArraySt.map(([contributePackageData, contributeFuncData]) => {
      let lib =
        TextDecoder.decodeUint8Array(contributeFuncData, decoder)->LibUtils.serializeLib(
          "Contribute",
        )

      {
        contributePackageData: TextDecoder.decodeUint8Array(contributePackageData, decoder)
        ->FileUtils.removeAlignedEmptyChars
        ->Js.Json.parseExn
        ->Obj.magic,
        contributeFuncData: {
          getContributeFunc: LibUtils.getFuncFromLib(lib, "getContribute")->Obj.magic,
        },
      }
    }),
  )
}

let _prepare = (): Meta3dType.Index.state => {
  {
    extensionServiceMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    extensionStateMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    extensionLifeMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    contributeMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  }
}

let _getStartExtensionName = allExtensionDataArr => {
  switch allExtensionDataArr->Meta3dCommonlib.ArraySt.filter(({extensionPackageData}) => {
    extensionPackageData.isStart
  }) {
  | startExtensions if startExtensions->Meta3dCommonlib.ArraySt.length !== 1 =>
    Meta3dCommonlib.Exception.throwErr(
      Meta3dCommonlib.Exception.buildErr(
        Meta3dCommonlib.Log.buildErrorMessage(
          ~title="should only has one start extension",
          ~description={
            j``
          },
          ~reason="",
          ~solution=j``,
          ~params=j``,
        ),
      ),
    )
  | startExtensions => startExtensions[0].extensionPackageData.name
  }
}

let _run = ((allExtensionDataArr, allContributeDataArr)) => {
  let state =
    allExtensionDataArr->Meta3dCommonlib.ArraySt.reduceOneParam(
      (. state, {extensionPackageData, extensionFuncData}: extensionFileData) => {
        state->ExtensionManager.registerExtension(
          extensionPackageData.name,
          extensionFuncData.getExtensionServiceFunc,
          extensionFuncData.getExtensionLifeFunc,
          (
            extensionPackageData.dependentExtensionNameMap,
            extensionPackageData.dependentContributeNameMap,
          ),
          extensionFuncData.createExtensionStateFunc(),
        )
      },
      _prepare(),
    )

  let state =
    allContributeDataArr->Meta3dCommonlib.ArraySt.reduceOneParam(
      (. state, {contributePackageData, contributeFuncData}: contributeFileData) => {
        state->ExtensionManager.registerContribute(
          contributePackageData.name,
          contributeFuncData.getContributeFunc,
          (
            contributePackageData.dependentExtensionNameMap,
            contributePackageData.dependentContributeNameMap,
          ),
        )
      },
      state,
    )

  (state, allExtensionDataArr)
}

let load = (appBinaryFile: ArrayBuffer.t): (
  Meta3dType.Index.state,
  array<AppFileType.extensionFileData>,
) => {
  appBinaryFile->_parse->_run
}

let start = ((state, allExtensionDataArr)): unit => {
  state->ExtensionManager.startExtension(_getStartExtensionName(allExtensionDataArr))
}

let _getExtensionNames = allExtensionDataArr => {
  allExtensionDataArr->Meta3dCommonlib.ArraySt.map(({extensionPackageData}) => {
    extensionPackageData.name
  })
}

let init = ((state, allExtensionDataArr), data) => {
    _getExtensionNames(allExtensionDataArr)->Meta3dCommonlib.ArraySt.traverseReducePromiseM(
      (. state, extensionName) => {
        state->ExtensionManager.initExtension(extensionName, data)
      },
      state,
    )
}

let update = ((state, allExtensionDataArr), data) => {
  
    _getExtensionNames(allExtensionDataArr)->Meta3dCommonlib.ArraySt.traverseReducePromiseM(
      (. state, extensionName) => {
        state->ExtensionManager.updateExtension(extensionName, data)
      },
      state,
    )
  
}
