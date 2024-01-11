let judgeToJumpToLogin = (func, account) => {
  switch account {
  | Some(_) => func()
  | None => RescriptReactRouter.push("/Login")
  }
}

let login = (dispatch, account) => {
  Meta3dUserUtils.Main.saveAccount(account)

  dispatch(AppStoreType.UserCenterAction(UserCenterStoreType.SetAccount(account)))

  RescriptReactRouter.push("/")
}
