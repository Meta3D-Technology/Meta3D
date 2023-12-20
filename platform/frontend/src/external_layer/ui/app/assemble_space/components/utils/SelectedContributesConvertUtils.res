let convertSelectedContributesFromAssembleToApAssemble = (
  selectedContributes: AssembleSpaceType.selectedContributesFromMarket,
): ApAssembleStoreType.selectedContributes => {
  selectedContributes->Meta3dCommonlib.ListSt.map(((
    {id, protocolIconBase64, version, data},
    protocolConfig,
  )): ApAssembleStoreType.contribute => {
    {
      id,
      protocolIconBase64,
      protocolConfigStr: protocolConfig->Meta3dCommonlib.OptionSt.map(({configStr}) => configStr),
      version,
      data,
    }
  })
}