open AntdCharts
open AssembleSpaceType

module Method = {
  let markIsPassDependencyGraphCheck = (dispatch, isPass) => {
    dispatch(ApAssembleStoreType.MarkIsPassDependencyGraphCheck(isPass))
  }

  let useSelector = (
    {
      selectedPackages,
      selectedExtensions,
      selectedContributes,
      storedPackageIdsInApp,
    }: ApAssembleStoreType.state,
  ) => {
    (selectedPackages, selectedExtensions, selectedContributes, storedPackageIdsInApp)
  }
}

@react.component
let make = (~service: service, ~selectedElementsFromMarket) => {
  let dispatch = ReduxUtils.ApAssemble.useDispatch(service.react.useDispatch)

  let (
    selectedPackages,
    selectedExtensions,
    selectedContributes,
    storedPackageIdsInApp,
  ) = ReduxUtils.ApAssemble.useSelector(service.react.useSelector, Method.useSelector)
  <DependencyGraphUtils
    service
    markIsPassDependencyGraphCheck={Method.markIsPassDependencyGraphCheck(dispatch)}
    // selectedPackages={AppUtils.splitPackages(
    //   selectedPackages,
    //   storedPackageIdsInApp,
    // )->Meta3dCommonlib.Tuple2.getFirst->Meta3dCommonlib.ListSt.fromArray}
    selectedPackages
    storedPackageIdsInApp
    selectedExtensions
    selectedContributes
    selectedElementsFromMarket
  />
}
