let judgeToJumpToLogin = (func, account) => {
  switch account {
  | Some(_) => func()
  | None => RescriptReactRouter.push("/Login")
  }
}

let _buildAccountKey = () => "meta3d_account"

let saveAccount = account => {
  LocalStorageUtils.set(_buildAccountKey(), account)
}

let readAccount = () => {
  LocalStorageUtils.get(_buildAccountKey())->Meta3dCommonlib.OptionSt.fromNullable
}

let logOut = () => {
  LocalStorageUtils.remove(_buildAccountKey())
}


let login = (dispatch, account) => {
            saveAccount(account)

            dispatch(AppStoreType.UserCenterAction(UserCenterStoreType.SetAccount(account)))

            RescriptReactRouter.push("/")
}