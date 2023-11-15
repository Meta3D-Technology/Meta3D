let _convertAllPackageData = allPackageData => {
  allPackageData
  ->Meta3dCommonlib.ArraySt.map(((
    (protocol, entryExtensionName, version, name, entryExtensionProtocolConfigStr),
    binaryFile,
  )): FrontendUtils.AssembleSpaceCommonType.packageData => {
    {
      id: FrontendUtils.IdUtils.generateId(Js.Math.random),
      protocol,
      entryExtensionName,
      version,
      name,
      binaryFile,
      protocolConfigStr: switch entryExtensionProtocolConfigStr {
      | "" => None
      | value => Some(value)
      },
      isStart: false,
    }
  })
  ->Meta3dCommonlib.ListSt.fromArray
}

let _import = (
  (
    service: FrontendUtils.FrontendType.service,
    (setFlag, dispatchImportApp, dispatchBatchStorePackagesInApp),
  ),
  stream,
) => {
  stream
  ->Meta3dBsMostDefault.Most.flatMap(
    ((
      allPackageDataStoredInApp,
      (allExtensionFileData, allContributeFileData, allPackageBinaryFiles),
    )) => {
      let extensionProtocolNames = allExtensionFileData->Meta3dCommonlib.ArraySt.map(((
        extensionPackageData: Meta3d.AppAndPackageFileType.extensionPackageData,
        _,
      )) => {
        extensionPackageData.protocol.name
      })
      let contributeProtocolNames = allContributeFileData->Meta3dCommonlib.ArraySt.map(((
        contributePackageData: Meta3d.AppAndPackageFileType.contributePackageData,
        _,
      )) => {
        contributePackageData.protocol.name
      })

      MostUtils.concatArray([
        service.backend.batchFindPublishExtensionProtocols(. extensionProtocolNames),
        service.backend.batchFindPublishExtensionProtocolConfigs(.
          extensionProtocolNames,
        )->Obj.magic,
        service.backend.batchFindPublishContributeProtocols(. contributeProtocolNames),
        service.backend.batchFindPublishContributeProtocolConfigs(.
          contributeProtocolNames,
        )->Obj.magic,
      ])
      ->Meta3dBsMostDefault.Most.reduce((arr, data) => {
        arr->Meta3dCommonlib.ArraySt.push(data)
      }, [
        allPackageDataStoredInApp->Obj.magic,
        allExtensionFileData->Obj.magic,
        allContributeFileData->Obj.magic,
        allPackageBinaryFiles->Obj.magic,
      ], _)
      ->Meta3dBsMostDefault.Most.fromPromise
    },
    _,
  )
  ->Meta3dBsMostDefault.Most.tap(
    arr => {
      let (
        allPackageDataStoredInApp: array<(
          Meta3d.AppAndPackageFileType.packageData,
          Js.Typed_array.ArrayBuffer.t,
        )>,
        allExtensionFileData: array<(
          Meta3d.AppAndPackageFileType.extensionPackageData,
          Meta3d.ExtensionFileType.extensionFuncData,
        )>,
        allContributeFileData: array<(
          Meta3d.AppAndPackageFileType.contributePackageData,
          Meta3d.ExtensionFileType.contributeFuncData,
        )>,
        allPackageBinaryFiles: array<Js.Typed_array.ArrayBuffer.t>,
        extensionProtocols: FrontendUtils.BackendCloudbaseType.protocols,
        extensionProtocolConfigs: FrontendUtils.BackendCloudbaseType.protocolConfigs,
        contributeProtocols: FrontendUtils.BackendCloudbaseType.protocols,
        contributeProtocolConfigs: FrontendUtils.BackendCloudbaseType.protocolConfigs,
      ) =
        arr->Obj.magic

      let selectedExtensions =
        allExtensionFileData
        ->Meta3dCommonlib.ArraySt.map(data => {
          let (extensionPackageData, extensionFuncData) = data

          let extensionProtocol =
            extensionProtocols
            ->Meta3dCommonlib.ArraySt.filter(
              extensionProtocol => {
                extensionProtocol.name == extensionPackageData.protocol.name &&
                  Meta3d.Semver.satisfies(
                    extensionProtocol.version,
                    extensionPackageData.protocol.version,
                  )
              },
            )
            ->Meta3dCommonlib.ArraySt.getFirst
            ->Meta3dCommonlib.OptionSt.getExn

          let extensionProtocolConfig =
            extensionProtocolConfigs
            ->Meta3dCommonlib.ArraySt.filter(
              extensionProtocolConfig => {
                extensionProtocolConfig.name == extensionPackageData.protocol.name &&
                  Meta3d.Semver.satisfies(
                    extensionProtocolConfig.version,
                    extensionPackageData.protocol.version,
                  )
              },
            )
            ->Meta3dCommonlib.ArraySt.getFirst

          (
            (
              {
                id: FrontendUtils.IdUtils.generateId(Js.Math.random),
                protocolName: extensionProtocol.name,
                protocolVersion: extensionProtocol.version,
                protocolIconBase64: extensionProtocol.iconBase64,
                protocolDisplayName: extensionProtocol.displayName,
                protocolRepoLink: extensionProtocol.repoLink,
                protocolDescription: extensionProtocol.description,
                data: (
                  {
                    extensionPackageData: {
                      name: extensionPackageData.name,
                      version: extensionPackageData.version,
                      account: extensionPackageData.account,
                      protocol: extensionPackageData.protocol,
                      displayName: extensionPackageData.displayName,
                      repoLink: extensionPackageData.repoLink,
                      description: extensionPackageData.description,
                      dependentPackageStoredInAppProtocolNameMap: extensionPackageData.dependentPackageStoredInAppProtocolNameMap,
                      dependentBlockProtocolNameMap: extensionPackageData.dependentBlockProtocolNameMap,
                    },
                    extensionFuncData,
                  }: Meta3d.ExtensionFileType.extensionFileData
                ),
                version: extensionPackageData.version,
                account: extensionPackageData.account,
              }: FrontendUtils.AssembleSpaceCommonType.extension
            ),
            extensionProtocolConfig,
          )
        })
        ->Meta3dCommonlib.ListSt.fromArray
      let selectedContributes =
        allContributeFileData
        ->Meta3dCommonlib.ArraySt.map(data => {
          let (contributePackageData, contributeFuncData) = data

          let contributeProtocol =
            contributeProtocols
            ->Meta3dCommonlib.ArraySt.filter(
              contributeProtocol => {
                contributeProtocol.name == contributePackageData.protocol.name &&
                  Meta3d.Semver.satisfies(
                    contributeProtocol.version,
                    contributePackageData.protocol.version,
                  )
              },
            )
            ->Meta3dCommonlib.ArraySt.getFirst
            ->Meta3dCommonlib.OptionSt.getExn

          let contributeProtocolConfig =
            contributeProtocolConfigs
            ->Meta3dCommonlib.ArraySt.filter(
              contributeProtocolConfig => {
                contributeProtocolConfig.name == contributePackageData.protocol.name &&
                  Meta3d.Semver.satisfies(
                    contributeProtocolConfig.version,
                    contributePackageData.protocol.version,
                  )
              },
            )
            ->Meta3dCommonlib.ArraySt.getFirst

          (
            (
              {
                id: FrontendUtils.IdUtils.generateId(Js.Math.random),
                protocolName: contributeProtocol.name,
                protocolVersion: contributeProtocol.version,
                protocolIconBase64: contributeProtocol.iconBase64,
                data: (
                  {
                    contributePackageData: {
                      name: contributePackageData.name,
                      version: contributePackageData.version,
                      account: contributePackageData.account,
                      protocol: contributePackageData.protocol,
                      displayName: contributePackageData.displayName,
                      repoLink: contributePackageData.repoLink,
                      description: contributePackageData.description,
                      dependentPackageStoredInAppProtocolNameMap: contributePackageData.dependentPackageStoredInAppProtocolNameMap,
                      dependentBlockProtocolNameMap: contributePackageData.dependentBlockProtocolNameMap,
                    },
                    contributeFuncData,
                  }: Meta3d.ExtensionFileType.contributeFileData
                ),
                version: contributePackageData.version,
                account: contributePackageData.account,
              }: FrontendUtils.AssembleSpaceCommonType.contribute
            ),
            contributeProtocolConfig,
          )
        })
        ->Meta3dCommonlib.ListSt.fromArray

      let selectedPackagesStoredInApp = allPackageDataStoredInApp->_convertAllPackageData
      let selectedPackagesNotStoredInApp =
        allPackageBinaryFiles->Meta3dCommonlib.ArraySt.reduceOneParam((. result, binaryFile) => {
          let (_, _, _, packageData) = Meta3d.Main.getAllDataOfPackage(binaryFile)

          result->Meta3dCommonlib.ArraySt.push((packageData, binaryFile))
        }, [])->_convertAllPackageData

      setFlag()

      dispatchImportApp(
        selectedExtensions,
        selectedContributes,
        Meta3dCommonlib.ListSt.concat(selectedPackagesStoredInApp, selectedPackagesNotStoredInApp),
      )
      dispatchBatchStorePackagesInApp(
        selectedPackagesStoredInApp->Meta3dCommonlib.ListSt.map(({id}) => id),
      )
    },
    // dispatchImportApp(selectedExtensions, selectedContributes, selectedPackages)
    // dispatchBatchStorePackagesInApp(selectedPackages->Meta3dCommonlib.ListSt.map(({id}) => id))

    // let selectedPackages =
    //   Js.Array.concat(
    //     allPackageDataStoredInApp,
    //     allPackageBinaryFiles->Meta3dCommonlib.ArraySt.reduceOneParam((. result, binaryFile) => {
    //       let (_, _, _, packageData) = Meta3d.Main.getAllDataOfPackage(binaryFile)

    //       result->Meta3dCommonlib.ArraySt.push((packageData, binaryFile))
    //     }, []),
    //   )
    //   ->Meta3dCommonlib.ArraySt.map(((
    //     (protocol, entryExtensionName, version, name, entryExtensionProtocolConfigStr),
    //     binaryFile,
    //   )): FrontendUtils.AssembleSpaceCommonType.packageData => {
    //     {
    //       id: FrontendUtils.IdUtils.generateId(Js.Math.random),
    //       protocol,
    //       entryExtensionName,
    //       version,
    //       name,
    //       binaryFile,
    //       protocolConfigStr: switch entryExtensionProtocolConfigStr {
    //       | "" => None
    //       | value => Some(value)
    //       },
    //       isStart: false,
    //     }
    //   })
    // ->Meta3dCommonlib.ListSt.fromArray

    _,
  )
  ->Meta3dBsMostDefault.Most.drain
  ->Js.Promise.catch(e => {
    service.console.errorWithExn(. e->FrontendUtils.Error.promiseErrorToExn, None)->Obj.magic
  }, _)
  ->ignore
}

let importApp = _import

let importPackage = (
  (service: FrontendUtils.FrontendType.service, (setFlag, dispatchImportPackage)),
  stream,
) => {
  _import(
    (service, (setFlag, dispatchImportPackage, _ => ())),
    stream->Meta3dBsMostDefault.Most.map(
      ((allExtensionFileData, allContributeFileData, allPackageBinaryFiles, _)) => {
        ([], (allExtensionFileData, allContributeFileData, allPackageBinaryFiles))
      },
      _,
    ),
  )
}
