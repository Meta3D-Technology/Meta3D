let useDispatchForAssembleSpaceStore = () => {
  let dispatch = AppStore.useDispatch()

  assembleSpaceAction => {
    dispatch(AppStoreType.AssembleSpaceAction(assembleSpaceAction))
  }
}
