open Antd
%%raw("import 'antd/dist/reset.css'")
open AssembleSpaceType

module Method = {
  let selectExtension = (dispatch, id) => {
    dispatch(PackageAssembleStoreType.SetInspectorCurrentExtensionId(id))
  }

  let useSelector = ({selectedExtensions}: PackageAssembleStoreType.state) => {
    selectedExtensions
  }
}

@react.component
let make = (~service: service) => {
  <SelectedExtensionsUtils
    service
    useDispatch=ReduxUtils.PackageAssemble.useDispatch
    useSelectorResult={ReduxUtils.PackageAssemble.useSelector(
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
