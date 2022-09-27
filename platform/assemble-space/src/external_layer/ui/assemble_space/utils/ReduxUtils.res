module ApView = {
  let useDispatch = useDispatchForAssembleSpaceAction => {
    let dispatch = useDispatchForAssembleSpaceAction()

    apViewAction => {
      dispatch(FrontendUtils.AssembleSpaceStoreType.ApViewAction(apViewAction))
    }
  }

  let useSelector = (useSelectorForAssembleSpaceStore, func) => {
    useSelectorForAssembleSpaceStore((
      {apViewState}: FrontendUtils.AssembleSpaceStoreType.state,
    ) => {
      func(apViewState)
    })
  }
}
