module ApAssemble = {
  let useDispatch = useDispatchForAssembleSpaceAction => {
    let dispatch = useDispatchForAssembleSpaceAction()

    apAssembleAction => {
      dispatch(FrontendUtils.AssembleSpaceStoreType.ApAssembleAction(apAssembleAction))
    }
  }

  let useSelector = (useSelectorForAssembleSpaceStore, func) => {
    useSelectorForAssembleSpaceStore((
      {apAssembleState}: FrontendUtils.AssembleSpaceStoreType.state,
    ) => {
      func(apAssembleState)
    })
  }
}

module ElementAssemble = {
  let useDispatch = useDispatchForAssembleSpaceAction => {
    let dispatch = useDispatchForAssembleSpaceAction()

    elementAssembleAction => {
      dispatch(FrontendUtils.AssembleSpaceStoreType.ElementAssembleAction(elementAssembleAction))
    }
  }

  let useSelector = (useSelectorForAssembleSpaceStore, func) => {
    useSelectorForAssembleSpaceStore((
      {elementAssembleState}: FrontendUtils.AssembleSpaceStoreType.state,
    ) => {
      func(elementAssembleState)
    })
  }
}
