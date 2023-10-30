open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let selectAll = (
    dispatch,
    selectedPackagesFromMarket: selectedPackagesFromMarket,
    selectedExtensionsFromMarket: selectedExtensionsFromMarket,
    selectedContributesFromMarket: selectedContributesFromMarket,
  ) => {
    selectedExtensionsFromMarket->Meta3dCommonlib.ListSt.forEach(((
      extension,
      protocolConfigOpt,
    )) => {
      dispatch(
        FrontendUtils.PackageAssembleStoreType.SelectExtension(
          extension.protocolIconBase64,
          extension.protocolDisplayName,
          extension.protocolRepoLink,
          extension.protocolDescription,
          protocolConfigOpt->ExtensionsContributesUtils.getProtocolConfigStr,
          extension,
        ),
      )
    })
    selectedContributesFromMarket->Meta3dCommonlib.ListSt.forEach(((
      contribute,
      protocolConfigOpt,
    )) => {
      dispatch(
        FrontendUtils.PackageAssembleStoreType.SelectContribute(
          contribute.protocolIconBase64,
          protocolConfigOpt->ExtensionsContributesUtils.getProtocolConfigStr,
          contribute,
        ),
      )
    })
    selectedPackagesFromMarket->Meta3dCommonlib.ListSt.forEach(package => {
      dispatch(FrontendUtils.PackageAssembleStoreType.SelectPackage(package))
    })
  }
}

@react.component
let make = (
  ~service: service,
  ~selectedPackagesFromMarket: selectedPackagesFromMarket,
  ~selectedExtensionsFromMarket: selectedExtensionsFromMarket,
  ~selectedContributesFromMarket: selectedContributesFromMarket,
) => {
  let dispatch = FrontendUtils.ReduxUtils.PackageAssemble.useDispatch(service.react.useDispatch)

  <>
    <Button
      onClick={_ => {
        Method.selectAll(
          dispatch,
          selectedPackagesFromMarket,
          selectedExtensionsFromMarket,
          selectedContributesFromMarket,
        )
      }}>
      {React.string({j`选择所有`})}
    </Button>
  </>
}
