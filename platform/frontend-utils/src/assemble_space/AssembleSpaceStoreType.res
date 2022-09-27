type action = ..

type action +=
  | ApViewAction(ApViewStoreType.action)

type state = {apViewState: ApViewStoreType.state}
