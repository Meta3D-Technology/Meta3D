open Antd
%%raw("import 'antd/dist/reset.css'")
open AssembleSpaceType

module Method = {
  let useSelector = ({selectedPackages}: PackageAssembleStoreType.state) => {
    selectedPackages
  }
}

@react.component
let make = (~service: service) => {
  <SelectedPackagesUtils
    service
    useDispatch=ReduxUtils.PackageAssemble.useDispatch
    useSelectorResult={ReduxUtils.PackageAssemble.useSelector(
      service.react.useSelector,
      Method.useSelector,
    )->Meta3dCommonlib.ListSt.map(({id, protocol, name}) => (id, protocol.iconBase64, name))}
  />
}
