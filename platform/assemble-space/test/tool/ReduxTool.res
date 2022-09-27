module ApView = {
  let buildDispatch = (reducer, store: FrontendUtils.AssembleSpaceStoreType.state, action) => {
    reducer(store, FrontendUtils.AssembleSpaceStoreType.ApViewAction(action))
  }

  let useSelector = (store, useSelectorForStore) => {
    useSelectorForStore(store)
  }
}
