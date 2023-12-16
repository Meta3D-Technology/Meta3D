open Antd
%%raw("import 'antd/dist/reset.css'")
open AssembleSpaceType

module Method = {
  let selectPackage = (dispatch, package) => {
    dispatch(PackageAssembleStoreType.SelectPackage(package))
  }

  let useSelector = ({selectedPackages}: PackageAssembleStoreType.state) => {
    selectedPackages
  }
}

@react.component
let make = (~service: service, ~selectedPackagesFromMarket: selectedPackagesFromMarket) => {
  <PackagesUtils
    service
    selectedPackagesFromMarket
    selectedPackageNames={ReduxUtils.PackageAssemble.useSelector(
      service.react.useSelector,
      Method.useSelector,
    )->Meta3dCommonlib.ListSt.map(({name}) => name)}
    useDispatch=ReduxUtils.PackageAssemble.useDispatch
    selectPackage=Method.selectPackage
  />
}
