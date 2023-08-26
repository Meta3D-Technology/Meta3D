let _import = (
  (
    service: FrontendUtils.FrontendType.service,
    (setFlag, dispatchImportApp, dispatchBatchStorePackagesInApp),
  ),
  stream,
) => {
  stream
  ->Meta3dBsMost.Most.flatMap(
    ((allPackageDataStoredInApp, (allExtensionFileData, allContributeFileData))) => {
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
      ->Meta3dBsMost.Most.reduce((arr, data) => {
        arr->Meta3dCommonlib.ArraySt.push(data)
      }, [
        allPackageDataStoredInApp->Obj.magic,
        allExtensionFileData->Obj.magic,
        allContributeFileData->Obj.magic,
      ], _)
      ->Meta3dBsMost.Most.fromPromise
    },
    _,
  )
  ->Meta3dBsMost.Most.tap(arr => {
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

    let selectedPackages =
      allPackageDataStoredInApp
      ->Meta3dCommonlib.ArraySt.map(((
        (protocol, entryExtensionName, version, name),
        binaryFile,
      )): FrontendUtils.AssembleSpaceCommonType.packageData => {
        {
          id: FrontendUtils.IdUtils.generateId(Js.Math.random),
          protocol,
          entryExtensionName,
          version,
          name,
          binaryFile,
        }
      })
      ->Meta3dCommonlib.ListSt.fromArray

    setFlag()

    dispatchImportApp(selectedExtensions, selectedContributes, selectedPackages)
    dispatchBatchStorePackagesInApp(selectedPackages->Meta3dCommonlib.ListSt.map(({id}) => id))
  }, _)
  ->Meta3dBsMost.Most.drain
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
    (
      service,
      (
        setFlag,
        (selectedExtensions, selectedContributes, _) =>
          dispatchImportPackage(selectedExtensions, selectedContributes),
        _ => (),
      ),
    ),
    stream->Meta3dBsMost.Most.map(((allExtensionFileData, allContributeFileData)) => {
      ([], (allExtensionFileData, allContributeFileData))
    }, _),
  )
}
