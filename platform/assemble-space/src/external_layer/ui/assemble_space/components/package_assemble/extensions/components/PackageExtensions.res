open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let selectExtension = (
    dispatch,
    protocolIconBase64,
    protocolDisplayName,
    protocolRepoLink,
    protocolDescription,
    protocolConfigStr,
    extension,
  ) => {
    dispatch(
      FrontendUtils.PackageAssembleStoreType.SelectExtension(
        protocolIconBase64,
        protocolDisplayName,
        protocolRepoLink,
        protocolDescription,
        protocolConfigStr,
        extension,
      ),
    )
  }
}

@react.component
let make = (~service: service, ~selectedExtensionsFromMarket: selectedExtensionsFromMarket) => {
  <ExtensionsUtils
    service
    selectedExtensionsFromMarket
    useDispatch=ReduxUtils.PackageAssemble.useDispatch
    selectExtension=Method.selectExtension
  />
}
