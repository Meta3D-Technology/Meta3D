open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let selectExtension = (dispatch, protocolIconBase64, protocolConfigStr, extension) => {
    dispatch(
      FrontendUtils.PackageAssembleStoreType.SelectExtension(
        protocolIconBase64,
        protocolConfigStr,
        extension,
      ),
    )
  }
}

@react.component
let make = (~service: service, ~selectedExtensionsFromShop: selectedExtensionsFromShop) => {
  <ExtensionsUtils
    service
    selectedExtensionsFromShop
    useDispatch=ReduxUtils.PackageAssemble.useDispatch
    selectExtension=Method.selectExtension
  />
}
