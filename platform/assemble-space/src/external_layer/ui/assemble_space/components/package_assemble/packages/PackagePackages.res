open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let selectPackage = (dispatch, package) => {
    dispatch(FrontendUtils.PackageAssembleStoreType.SelectPackage(package))
  }

  let useSelector = ({selectedPackages}: FrontendUtils.PackageAssembleStoreType.state) => {
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
