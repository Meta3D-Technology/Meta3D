open Antd
%%raw("import 'antd/dist/antd.css'")
open AssembleSpaceType

module Method = {
  let selectPackage = (dispatch, package) => {
    dispatch(ApAssembleStoreType.SelectPackage(package))
  }

  let useSelector = ({selectedPackages}: ApAssembleStoreType.state) => {
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
