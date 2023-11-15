open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let showApInspector = dispatch => {
    dispatch(FrontendUtils.ApAssembleStoreType.ShowApInspector)
  }

  let selectAll = (
    dispatch,
    selectedPackagesFromMarket: selectedPackagesFromMarket,
    // selectedExtensionsFromMarket: selectedExtensionsFromMarket,
    selectedContributesFromMarket: selectedContributesFromMarket,
  ) => {
    // selectedExtensionsFromMarket->Meta3dCommonlib.ListSt.forEach(((
    //   extension,
    //   protocolConfigOpt,
    // )) => {
    //   dispatch(
    //     FrontendUtils.ApAssembleStoreType.SelectExtension(
    //       extension.protocolIconBase64,
    //       protocolConfigOpt->ExtensionsContributesUtils.getProtocolConfigStr,
    //       extension,
    //     ),
    //   )
    // })
    selectedContributesFromMarket->Meta3dCommonlib.ListSt.forEach(((
      contribute,
      protocolConfigOpt,
    )) => {
      dispatch(
        FrontendUtils.ApAssembleStoreType.SelectContribute(
          contribute.protocolIconBase64,
          protocolConfigOpt->ExtensionsContributesUtils.getProtocolConfigStr,
          contribute,
        ),
      )
    })
    selectedPackagesFromMarket->Meta3dCommonlib.ListSt.forEach(package => {
      dispatch(FrontendUtils.ApAssembleStoreType.SelectPackage(package))
    })
  }
}

@react.component
let make = (
  ~service: service,
  ~selectedPackagesFromMarket: selectedPackagesFromMarket,
  // ~selectedExtensionsFromMarket: selectedExtensionsFromMarket,
  ~selectedContributesFromMarket: selectedContributesFromMarket,
) => {
  let dispatch = FrontendUtils.ReduxUtils.ApAssemble.useDispatch(service.react.useDispatch)

  <>
    <Button
      onClick={_ => {
        Method.showApInspector(dispatch)
      }}>
      {React.string(`显示Ap Inspector`)}
    </Button>
    <Button
      onClick={_ => {
        Method.selectAll(
          dispatch,
          selectedPackagesFromMarket,
          // selectedExtensionsFromMarket,
          selectedContributesFromMarket,
        )
      }}>
      {React.string({j`选择所有`})}
    </Button>
  </>
}
