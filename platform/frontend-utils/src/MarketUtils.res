let isNotInnerProtocol = protocolName => {
  switch protocolName {
  | "meta3d-element-assemble-visual-protocol"
  | "meta3d-element-assemble-visual-run-protocol" => false
  | _ => true
  }
}

let getPageSize = () => 30

let getLimitCount = () => 1000

let getCurrentPage = (allPublishItems, page, pageSize) => {
  allPublishItems->Meta3dCommonlib.ArraySt.slice((page - 1) * pageSize, page * pageSize)
}

let isSelect = (getId, id, selectedItems) => {
  selectedItems->Meta3dCommonlib.ListSt.includesByFunc(selectedItem => id === getId(selectedItem))
}

let groupAllPublishProtocols = (allPublishProtocols: array<BackendCloudbaseType.protocol>): array<
  array<BackendCloudbaseType.protocol>,
> => {
  allPublishProtocols
  ->Meta3dCommonlib.ArraySt.reduceOneParam((. map, {name} as protocol) => {
    map->Meta3dCommonlib.ImmutableHashMap.set(
      name,
      map
      ->Meta3dCommonlib.ImmutableHashMap.get(name)
      ->Meta3dCommonlib.OptionSt.getWithDefault([])
      ->Meta3dCommonlib.ArraySt.push(protocol),
    )
  }, Meta3dCommonlib.ImmutableHashMap.createEmpty())
  ->Meta3dCommonlib.ImmutableHashMap.entries
  ->Meta3dCommonlib.ArraySt.map(((name, protocols: array<BackendCloudbaseType.protocol>)) => {
    protocols
    // ->Meta3dCommonlib.ArraySt.copy
    ->Meta3dCommonlib.ArraySt.sort((a, b) => {
      Meta3d.Semver.gt(a.version, b.version) ? -1 : 1
    })
  })
}

let groupAllPublishItems = ((getName, getVersion), allPublishItems) => {
  allPublishItems
  ->Meta3dCommonlib.ArraySt.reduceOneParam((. map, item) => {
    map->Meta3dCommonlib.ImmutableHashMap.set(
      // info.name,
      getName(item),
      map
      ->Meta3dCommonlib.ImmutableHashMap.get(getName(item))
      ->Meta3dCommonlib.OptionSt.getWithDefault([])
      ->Meta3dCommonlib.ArraySt.push(item),
    )
  }, Meta3dCommonlib.ImmutableHashMap.createEmpty())
  ->Meta3dCommonlib.ImmutableHashMap.entries
  ->Meta3dCommonlib.ArraySt.map(((
    name,
    // implements: array<FrontendUtils.FrontendType.publishExtension>,
    items,
  )) => {
    items
    // ->Meta3dCommonlib.ArraySt.copy
    ->Meta3dCommonlib.ArraySt.sort((a, b) => {
      Meta3d.Semver.gt(getVersion(a), getVersion(b)) ? -1 : 1
    })
  })
}

let getAllProtocolsCount = allPublishProtocols => {
  allPublishProtocols->groupAllPublishProtocols->Meta3dCommonlib.ArraySt.length
}
