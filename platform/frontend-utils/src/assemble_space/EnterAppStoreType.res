type account = string

type appName = string


type action = EnterApp(account, appName)

type state = {
  account: option<string>,
  appName: option<string>,
}
