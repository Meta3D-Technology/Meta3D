open FrontendUtils.AntdCharts
open FrontendUtils.AssembleSpaceType

type nodeType =
  | Extension
  | Contribute

type packageName = string

type nodeData = {
  type_: nodeType,
  isStart: bool,
  packageName: option<packageName>,
  protocol: Meta3d.ExtensionFileType.extensionProtocolData,
  protocolIconBase64: FrontendUtils.ApAssembleStoreType.protocolIconBase64,
  displayName: string,
  name: string,
  version: FrontendUtils.ApAssembleStoreType.version,
  dependentBlockProtocolNameMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    Meta3d.ExtensionFileType.blockProtocolName,
    Meta3d.ExtensionFileType.blockProtocolVersion,
  >,
}

module Method = {
  let _buildNodes = (
    service,
    selectedPackages: FrontendUtils.ApAssembleStoreType.selectedPackages,
    selectedExtensions: FrontendUtils.ApAssembleStoreType.selectedExtensions,
    selectedContributes: FrontendUtils.ApAssembleStoreType.selectedContributes,
  ): list<nodeData> => {
    let nodes = selectedPackages->Meta3dCommonlib.ListSt.reduce(list{}, (
      nodes,
      {name, protocol, binaryFile},
    ) => {
      let (
        allExtensionFileData,
        allContributeFileData,
      ) = service.meta3d.getAllExtensionAndContributeFileDataOfPackage(. binaryFile)

      let nodes =
        allExtensionFileData->Meta3dCommonlib.ArraySt.reduceOneParam(
          (. nodes, (extensionPackageData, _)) => {
            nodes->Meta3dCommonlib.ListSt.push({
              type_: Extension,
              isStart: false,
              packageName: name->Some,
              protocol: extensionPackageData.protocol,
              protocolIconBase64: protocol.iconBase64,
              displayName: extensionPackageData.displayName,
              name: extensionPackageData.name,
              version: extensionPackageData.version,
              dependentBlockProtocolNameMap: extensionPackageData.dependentBlockProtocolNameMap,
            })
          },
          nodes,
        )
      let nodes =
        allContributeFileData->Meta3dCommonlib.ArraySt.reduceOneParam(
          (. nodes, (contributePackageData, _)) => {
            nodes->Meta3dCommonlib.ListSt.push({
              type_: Contribute,
              isStart: false,
              packageName: name->Some,
              protocol: contributePackageData.protocol,
              protocolIconBase64: protocol.iconBase64,
              displayName: contributePackageData.displayName,
              name: contributePackageData.name,
              version: contributePackageData.version,
              dependentBlockProtocolNameMap: contributePackageData.dependentBlockProtocolNameMap,
            })
          },
          nodes,
        )

      nodes
    })

    let nodes = selectedExtensions->Meta3dCommonlib.ListSt.reduce(nodes, (nodes, extension) => {
      nodes->Meta3dCommonlib.ListSt.push({
        type_: Extension,
        isStart: extension.isStart,
        packageName: None,
        protocol: extension.data.extensionPackageData.protocol,
        protocolIconBase64: extension.protocolIconBase64,
        displayName: extension.data.extensionPackageData.displayName,
        name: extension.data.extensionPackageData.name,
        version: extension.data.extensionPackageData.version,
        dependentBlockProtocolNameMap: extension.data.extensionPackageData.dependentBlockProtocolNameMap,
      })
    })
    let nodes = selectedContributes->Meta3dCommonlib.ListSt.reduce(nodes, (nodes, contribute) => {
      nodes->Meta3dCommonlib.ListSt.push({
        type_: Contribute,
        isStart: false,
        packageName: None,
        protocol: contribute.data.contributePackageData.protocol,
        protocolIconBase64: contribute.protocolIconBase64,
        displayName: contribute.data.contributePackageData.displayName,
        name: contribute.data.contributePackageData.name,
        version: contribute.data.contributePackageData.version,
        dependentBlockProtocolNameMap: contribute.data.contributePackageData.dependentBlockProtocolNameMap,
      })
    })

    nodes
  }

  let _buildItems = (node: nodeData) => {
    let items = [
      {
        "text": "协议名",
        "value": node.protocol.name,
      },
      {
        "text": "协议版本",
        "value": node.protocol.version,
      },
      {
        "text": "协议icon",
        "icon": node.protocolIconBase64,
      }->Obj.magic,
      {
        "text": "实现名",
        "value": node.name,
      },
      {
        "text": "实现版本",
        "value": node.version,
      },
    ]
    switch node.packageName {
    | None => items
    | Some(packageName) =>
      items->Meta3dCommonlib.ArraySt.push({
        "text": "所属包名",
        "value": packageName,
      })
    }
  }

  let rec _buildData = (
    node: option<nodeData>,
    nodes,
    (blockProtocolName, blockProtocolVersion),
  ) => {
    let data = Meta3dCommonlib.ImmutableHashMap.createEmpty()

    switch node {
    | None =>
      data
      ->Meta3dCommonlib.ImmutableHashMap.set(
        "id",
        {j`Empty_${blockProtocolName->Meta3dCommonlib.OptionSt.getExn}`},
      )
      ->Meta3dCommonlib.ImmutableHashMap.set(
        "value",
        Meta3dCommonlib.ImmutableHashMap.createEmpty()
        ->Meta3dCommonlib.ImmutableHashMap.set("title", "无")
        ->Meta3dCommonlib.ImmutableHashMap.set(
          "items",
          [
            {
              "text": "协议名",
              "value": blockProtocolName->Meta3dCommonlib.OptionSt.getExn,
            },
            {
              "text": "协议版本",
              "value": blockProtocolVersion->Meta3dCommonlib.OptionSt.getExn,
            },
          ]->Obj.magic,
        )
        ->Obj.magic,
      )

    | Some({name, displayName, dependentBlockProtocolNameMap} as node) =>
      data
      ->Meta3dCommonlib.ImmutableHashMap.set("id", name)
      ->Meta3dCommonlib.ImmutableHashMap.set(
        "value",
        Meta3dCommonlib.ImmutableHashMap.createEmpty()
        ->Meta3dCommonlib.ImmutableHashMap.set("title", displayName)
        ->Meta3dCommonlib.ImmutableHashMap.set("items", _buildItems(node)->Obj.magic)
        ->Obj.magic,
      )
      ->Meta3dCommonlib.ImmutableHashMap.set(
        "children",
        dependentBlockProtocolNameMap
        ->Meta3dCommonlib.ImmutableHashMap.entries
        ->Meta3dCommonlib.ArraySt.reduceOneParam(
          (. children, (blockProtocolName, blockProtocolVersion)) => {
            children->Meta3dCommonlib.ArraySt.push(
              _buildData(
                nodes->Meta3dCommonlib.ListSt.find(({protocol}) =>
                  protocol.name == blockProtocolName &&
                    Meta3d.Semver.gte(
                      Meta3d.Semver.minVersion(protocol.version),
                      Meta3d.Semver.minVersion(blockProtocolVersion),
                    )
                ),
                nodes,
                (blockProtocolName->Some, blockProtocolVersion->Some),
              ),
            )
          },
          [],
        )
        ->Obj.magic,
      )
    }
  }

  let useEffectOnce = (
    setData,
    service,
    (
      selectedPackages: FrontendUtils.ApAssembleStoreType.selectedPackages,
      selectedExtensions: FrontendUtils.ApAssembleStoreType.selectedExtensions,
      selectedContributes: FrontendUtils.ApAssembleStoreType.selectedContributes,
    ),
  ) => {
    switch selectedExtensions->Meta3dCommonlib.ListSt.find(({isStart}) => {
      isStart
    }) {
    | None => setData(_ => Meta3dCommonlib.ImmutableHashMap.createEmpty())
    | Some(extension) =>
      let nodes = _buildNodes(service, selectedPackages, selectedExtensions, selectedContributes)

      setData(_ =>
        _buildData(nodes->Meta3dCommonlib.ListSt.find(({isStart}) => isStart), nodes, (None, None))
      )
    }
  }

  let useSelector = (
    {
      selectedPackages,
      selectedExtensions,
      selectedContributes,
    }: FrontendUtils.ApAssembleStoreType.state,
  ) => {
    (selectedPackages, selectedExtensions, selectedContributes)
  }
}

@react.component
let make = (~service: service) => {
  let (data, setData) = service.react.useState(_ => Meta3dCommonlib.ImmutableHashMap.createEmpty())

  let (
    selectedPackages,
    selectedExtensions,
    selectedContributes,
  ) = ReduxUtils.ApAssemble.useSelector(service.react.useSelector, Method.useSelector)

  service.react.useEffect1(. () => {
    Method.useEffectOnce(
      setData,
      service,
      (selectedPackages, selectedExtensions, selectedContributes),
    )

    None
  }, [selectedPackages, selectedExtensions->Obj.magic, selectedContributes->Obj.magic])

  {
    data == Meta3dCommonlib.ImmutableHashMap.createEmpty()
      ? {React.string(`请指定启动扩展`)}
      : <DecompositionTreeGraph
          data={data->Obj.magic}
          markerCfg={cfg => {
            let {children} = cfg

            {
              show: children->Meta3dCommonlib.ArraySt.length,
            }
          }}
          behaviors=["drag-canvas", "zoom-canvas", "drag-node"]
        />
  }
}
