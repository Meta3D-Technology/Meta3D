open FrontendUtils.AntdCharts
open FrontendUtils.AssembleSpaceType

module Method = {
  let markIsPassDependencyGraphCheck = (dispatch, isPass) => {
    dispatch(FrontendUtils.ApAssembleStoreType.MarkIsPassDependencyGraphCheck(isPass))
  }

  let useSelector = (
    {
      selectedPackages,
      selectedExtensions,
      selectedContributes,
      storedPackageIdsInApp,
    }: FrontendUtils.ApAssembleStoreType.state,
  ) => {
    (selectedPackages, selectedExtensions, selectedContributes, storedPackageIdsInApp)
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = FrontendUtils.ReduxUtils.ApAssemble.useDispatch(service.react.useDispatch)

  let (
    selectedPackages,
    selectedExtensions,
    selectedContributes,
    storedPackageIdsInApp,
  ) = FrontendUtils.ReduxUtils.ApAssemble.useSelector(service.react.useSelector, Method.useSelector)

  let (selectedPackages, allPackagesStoredInApp) = AppUtils.splitPackages(
    selectedPackages,
    storedPackageIdsInApp,
  )

  <DependencyGraphUtils
    service
    markIsPassDependencyGraphCheck={Method.markIsPassDependencyGraphCheck(dispatch)}
    // selectedPackages={AppUtils.splitPackages(
    //   selectedPackages,
    //   storedPackageIdsInApp,
    // )->Meta3dCommonlib.Tuple2.getFirst->Meta3dCommonlib.ListSt.fromArray}
    selectedPackages={selectedPackages->Meta3dCommonlib.ListSt.fromArray}
    allPackagesStoredInApp={allPackagesStoredInApp->Meta3dCommonlib.ListSt.fromArray}
    selectedExtensions
    selectedContributes
  />
}
