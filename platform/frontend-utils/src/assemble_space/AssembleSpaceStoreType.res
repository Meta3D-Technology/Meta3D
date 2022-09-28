type action = ..

type action +=
  | Reset
  | ApViewAction(ApViewStoreType.action)
  | UIViewAction(UIViewStoreType.action)

type state = {
  apViewState: ApViewStoreType.state,
  uiViewState: UIViewStoreType.state,
}
