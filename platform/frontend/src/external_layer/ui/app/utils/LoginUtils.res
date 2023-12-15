let judgeToJumpToLogin = (func, account) => {
  switch account {
  | Some(_) => func()
  | None => RescriptReactRouter.push("/Login")
  }
}
