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

module UIView = {
  let useDispatch = useDispatchForAssembleSpaceAction => {
    let dispatch = useDispatchForAssembleSpaceAction()

    uiViewAction => {
      dispatch(FrontendUtils.AssembleSpaceStoreType.UIViewAction(uiViewAction))
    }
  }

  let useSelector = (useSelectorForAssembleSpaceStore, func) => {
    useSelectorForAssembleSpaceStore((
      {uiViewState}: FrontendUtils.AssembleSpaceStoreType.state,
    ) => {
      func(uiViewState)
    })
  }
}
