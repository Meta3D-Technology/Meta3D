let _getContributes = (
  selectedContributes: FrontendUtils.ApAssembleStoreType.selectedContributes,
  contributeType,
) => {
  selectedContributes->Meta3dCommonlib.ListSt.filter(({data}) => {
    data.contributePackageData.protocol.name->ContributeTypeUtils.decideContributeType ==
      contributeType
  })
}

let getUIControls = _getContributes(_, Meta3dType.ContributeType.UIControl)

let getActions = _getContributes(_, Meta3dType.ContributeType.Action)

let getElements = _getContributes(_, Meta3dType.ContributeType.Element)
