let useDispatchForAssembleSpaceStore = () => {
  let dispatch = AppStore.useDispatch()

  assembleSpaceAction => {
    dispatch(FrontendUtils.AppStoreType.AssembleSpaceAction(assembleSpaceAction))
  }
}
