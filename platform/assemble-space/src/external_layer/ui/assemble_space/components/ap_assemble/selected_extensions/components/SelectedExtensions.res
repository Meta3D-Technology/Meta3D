open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let selectExtension = (dispatch, id) => {
    dispatch(FrontendUtils.ApAssembleStoreType.SetInspectorCurrentExtensionId(id))
  }

  let useSelector = ({selectedExtensions}: FrontendUtils.ApAssembleStoreType.state) => {
    selectedExtensions
  }
}

@react.component
let make = (~service: service) => {
  <SelectedExtensionsUtils
    service
    useDispatch=FrontendUtils.ReduxUtils.ApAssemble.useDispatch
    useSelectorResult={FrontendUtils.ReduxUtils.ApAssemble.useSelector(
      service.react.useSelector,
      Method.useSelector,
    )->Meta3dCommonlib.ListSt.map(({id, protocolIconBase64, data}) => (
      id,
      protocolIconBase64,
      data,
    ))}
    selectExtension=Method.selectExtension
  />
}
