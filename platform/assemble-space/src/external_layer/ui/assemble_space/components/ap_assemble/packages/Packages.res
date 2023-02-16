open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let selectPackage = (dispatch, package) => {
    dispatch(FrontendUtils.ApAssembleStoreType.SelectPackage(package))
  }

  let useSelector = ({selectedPackages}: FrontendUtils.ApAssembleStoreType.state) => {
    selectedPackages
  }
}

@react.component
let make = (~service: service, ~selectedPackagesFromMarket: selectedPackagesFromMarket) => {
  <PackagesUtils
    service
    selectedPackagesFromMarket
    selectedPackageNames={ReduxUtils.ApAssemble.useSelector(
      service.react.useSelector,
      Method.useSelector,
    )->Meta3dCommonlib.ListSt.map(({name}) => name)}
    useDispatch=ReduxUtils.ApAssemble.useDispatch
    selectPackage=Method.selectPackage
  />
}
