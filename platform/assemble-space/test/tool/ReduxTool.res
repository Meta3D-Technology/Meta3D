module ApAssemble = {
  let buildDispatch = (reducer, store: FrontendUtils.AssembleSpaceStoreType.state, action) => {
    reducer(store, FrontendUtils.AssembleSpaceStoreType.ApAssembleAction(action))
  }

  let useSelector = (store, useSelectorForStore) => {
    useSelectorForStore(store)
  }
}
