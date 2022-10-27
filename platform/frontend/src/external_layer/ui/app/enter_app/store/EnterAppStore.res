type account = string

type appName = string

type action = EnterApp(account, appName)

type state = {
  account: option<string>,
  appName: option<string>,
}

let reducer = (state, action) => {
  switch action {
  | EnterApp(account, appName) => {
      ...state,
      account: account->Some,
      appName: appName->Some,
    }
  }
}

let initialState = {
  account: None,
  appName: None,
}
