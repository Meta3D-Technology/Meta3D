let buildDispatch = (reducer, store, action) => {
  reducer(store, action)
}

let useSelector = (store, useSelectorForStore) => {
  useSelectorForStore(store)
}
