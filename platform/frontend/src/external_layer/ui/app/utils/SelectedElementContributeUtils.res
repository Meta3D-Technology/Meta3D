let removeElementContribute = (selectedContributes: UserCenterStoreType.selectedContributes) => {
  selectedContributes->Meta3dCommonlib.ListSt.filter((({protocolName}, _)) => {
    protocolName != ElementUtils.getElementContributeProtocolName()
  })
}
