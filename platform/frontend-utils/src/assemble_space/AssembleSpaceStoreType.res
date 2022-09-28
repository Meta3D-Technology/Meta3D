type action = ..

type action +=
  | ApViewAction(ApViewStoreType.action)
  | UIViewAction(UIViewStoreType.action)

type state = {
  apViewState: ApViewStoreType.state,
  uiViewState: UIViewStoreType.state,
}
