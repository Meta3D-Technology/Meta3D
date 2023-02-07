open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let selectPackage = (dispatch, package) => {
    dispatch(FrontendUtils.PackageAssembleStoreType.SelectPackage(package))
  }
}

@react.component
let make = (~service: service, ~selectedPackagesFromMarket: selectedPackagesFromMarket) => {
  <PackagesUtils
    service
    selectedPackagesFromMarket
    useDispatch=ReduxUtils.PackageAssemble.useDispatch
    selectPackage=Method.selectPackage
  />
}
