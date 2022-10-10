type action = ..

type action +=
  | Reset
  | ApViewAction(ApViewStoreType.action)
  | UIViewAction(UIViewStoreType.action)

type state = {
  isDebug: bool,
  apViewState: ApViewStoreType.state,
  uiViewState: UIViewStoreType.state,
}
