type action = SetUserName(string)
// type userCenterAction = SetUserName(string)

type state = {username: option<string>}

let reducer = (state, action) => {
  switch action {
  | SetUserName(username) => {username: Some(username)}
  }
}

let initialState = {
  username: None,
}

// let store = Remporium.makeStore(initialState, reducer)

// module UserCenterStore = Remporium.CreateModule({
//   type action = action
//   type state = state
// })

// let useDispatch = UserCenterStore.useDispatch

// let useSelector = UserCenterStore.useSelector
