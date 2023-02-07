open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let selectExtension = (dispatch, protocolIconBase64, protocolConfigStr, extension) => {
    dispatch(
      FrontendUtils.ApAssembleStoreType.SelectExtension(
        protocolIconBase64,
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
    useDispatch=ReduxUtils.ApAssemble.useDispatch
    selectExtension=Method.selectExtension
  />
}
