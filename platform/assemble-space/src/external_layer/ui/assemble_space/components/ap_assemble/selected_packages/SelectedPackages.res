open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let selectPackage = (dispatch, id) => {
    dispatch(FrontendUtils.ApAssembleStoreType.SetInspectorCurrentPackageId(id))
  }

  let useSelector = ({selectedPackages}: FrontendUtils.ApAssembleStoreType.state) => {
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
