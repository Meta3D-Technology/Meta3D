module ApAssemble = {
  let buildDispatch = (reducer, store: AssembleSpaceStoreType.state, action) => {
    reducer(store, AssembleSpaceStoreType.ApAssembleAction(action))
  }

  let useSelector = (store, useSelectorForStore) => {
    useSelectorForStore(store)
  }
}
