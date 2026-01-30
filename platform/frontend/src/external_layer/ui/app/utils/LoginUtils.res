let judgeToJumpToLogin = (func, account) => {
  switch account {
  | Some(_) => func()
  | None => RouterUtils.pushUrl("/Login")
  }
}

let login = (dispatch, account) => {
  UserUtils.saveAccount(account)

  dispatch(AppStoreType.UserCenterAction(UserCenterStoreType.SetAccount(account)))

  RouterUtils.pushUrl("/")
}
