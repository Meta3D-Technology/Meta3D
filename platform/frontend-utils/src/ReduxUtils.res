module ApAssemble = {
  let useDispatch = useDispatchForAssembleSpaceAction => {
    let dispatch = useDispatchForAssembleSpaceAction()

    apAssembleAction => {
      dispatch(AssembleSpaceStoreType.ApAssembleAction(apAssembleAction))
    }
  }

  let useSelector = (useSelectorForAssembleSpaceStore, func) => {
    useSelectorForAssembleSpaceStore(.(
      {apAssembleState}: AssembleSpaceStoreType.state,
    ) => {
      func(apAssembleState)
    })
  }
}

module ElementAssemble = {
  let useDispatch = useDispatchForAssembleSpaceAction => {
    let dispatch = useDispatchForAssembleSpaceAction()

    elementAssembleAction => {
      dispatch(AssembleSpaceStoreType.ElementAssembleAction(elementAssembleAction))
    }
  }

  let useSelector = (useSelectorForAssembleSpaceStore, func) => {
    useSelectorForAssembleSpaceStore(.(
      {elementAssembleState}: AssembleSpaceStoreType.state,
    ) => {
      func(elementAssembleState)
    })
  }
}

module PackageAssemble = {
  let useDispatch = useDispatchForAssembleSpaceAction => {
    let dispatch = useDispatchForAssembleSpaceAction()

    packageAssembleAction => {
      dispatch(AssembleSpaceStoreType.PackageAssembleAction(packageAssembleAction))
    }
  }

  let useSelector = (useSelectorForAssembleSpaceStore, func) => {
    useSelectorForAssembleSpaceStore(.(
      {packageAssembleState}: AssembleSpaceStoreType.state,
    ) => {
      func(packageAssembleState)
    })
  }
}
