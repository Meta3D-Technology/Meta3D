open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let selectPackage = (dispatch, package) => {
    dispatch(FrontendUtils.ApAssembleStoreType.SelectPackage(package))
  }
}

@react.component
let make = (~service: service, ~selectedPackagesFromShop: selectedPackagesFromShop) => {
  <PackagesUtils
    service
    selectedPackagesFromShop
    useDispatch=ReduxUtils.ApAssemble.useDispatch
    selectPackage=Method.selectPackage
  />
}
