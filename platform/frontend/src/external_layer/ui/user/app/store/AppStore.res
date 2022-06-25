// type thunk('state) = ..;

// type thunk('state) +=
//   | Thunk ((Reductive.Store.t(thunk('state), 'state) => unit));

// open UserCenterStore

type action = ..

// type thunk +=
//   | ReplaceState

// type action +=
//   | B

type action +=
  // | UserCenterStore.action
  // | UserCenterAction(userCenterAction)
  | UserCenterAction(UserCenterStore.action)

// type ReduxThunk.thunk(_) +=
// | InitEngineAction
// | MapAction(mapAction(componentsMap))
// | InspectorAction(inspectorAction(int, bool))
// | UpdateAction(updateAction(updateComponentTypeArr))
// | ShowComponentAction(showComponentAction(bottomComponentType));

type state = {userCenterState: UserCenterStore.state}

let reducer = (state, action) => {
  // switch action {
  // // | UserCenterStore.action => 1
  // | UserCenterStore.SetUserName(username) => {username: Some(username)}
  // }
  // UserCenterStore.reducer(state, action)
  switch action {
  | UserCenterAction(action) => {
      ...state,
      userCenterState: UserCenterStore.reducer(state.userCenterState, action),
    }
  }
}

let initialState = {
  // username: None,
  userCenterState: UserCenterStore.initialState,
}

let store = Remporium.makeStore(initialState, reducer)

module AppStore = Remporium.CreateModule({
  type action = action
  type state = state
})

let useDispatch = AppStore.useDispatch

let useSelector = AppStore.useSelector
