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
    }: FrontendUtils.ApAssembleStoreType.state,
  ) => {
    (selectedPackages, selectedExtensions, selectedContributes)
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = ReduxUtils.ApAssemble.useDispatch(service.react.useDispatch)

  let (
    selectedPackages,
    selectedExtensions,
    selectedContributes,
  ) = ReduxUtils.ApAssemble.useSelector(service.react.useSelector, Method.useSelector)

  <DependencyGraphUtils
    service
    markIsPassDependencyGraphCheck={Method.markIsPassDependencyGraphCheck(dispatch)}
    selectedPackages
    selectedExtensions
    selectedContributes
  />
}
