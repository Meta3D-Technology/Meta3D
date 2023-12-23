open AppStoreType

// type action = ..

// type action +=
//   | UserCenterAction(UserCenterStoreType.action)
//   | EnterAppAction(EnterAppStore.action)
//   | AssembleSpaceAction(AssembleSpaceStoreType.action)

// type state = {
//   userCenterState: UserCenterStoreType.state,
//   enterAppState: EnterFrontendUtils.AppStoreType.state,
//   assembleSpaceState: AssembleSpaceStoreType.state,
// }

let reducer = (state, action) => {
  switch action {
  | UserCenterAction(action) => {
      ...state,
      userCenterState: UserCenterStore.reducer(state.userCenterState, action),
    }
  | EnterAppAction(action) => {
      ...state,
      enterAppState: EnterAppStore.reducer(state.enterAppState, action),
    }
  | AssembleSpaceAction(action) => {
      ...state,
      assembleSpaceState: AssembleSpaceStore.reducer(state.assembleSpaceState, action),
    }
  }
}

let initialState = {
  userCenterState: UserCenterStore.initialState,
  enterAppState: EnterAppStore.initialState,
  assembleSpaceState: AssembleSpaceStore.initialState,
  eventEmitter: Event.eventEmitter(),
}

let store = Remporium.makeStore(initialState, reducer)

module AppStore = Remporium.CreateModule({
  type action = action
  type state = state
})

let useDispatch = AppStore.useDispatch

let useSelector = AppStore.useSelector
