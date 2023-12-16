open Antd
%%raw("import 'antd/dist/reset.css'")
open AssembleSpaceType

module Method = {
  let selectPackage = (dispatch, id) => {
    dispatch(ApAssembleStoreType.SetInspectorCurrentPackageId(id))
  }

  let useSelector = ({selectedPackages}: ApAssembleStoreType.state) => {
    selectedPackages
  }
}

@react.component
let make = (~service: service) => {
  <SelectedPackagesUtils
    service
    useDispatch=ReduxUtils.ApAssemble.useDispatch
    useSelectorResult={ReduxUtils.ApAssemble.useSelector(
      service.react.useSelector,
      Method.useSelector,
    )->Meta3dCommonlib.ListSt.map(({id, protocol, name}) => (id, protocol.iconBase64, name))}
    selectPackage=Method.selectPackage
  />
}
