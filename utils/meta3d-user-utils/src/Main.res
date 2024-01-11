let _buildAccountKey = () => "meta3d_account"

let saveAccount = account => {
  Meta3dStorageUtils.Main.set(_buildAccountKey(), account)
}

let readAccount = () => {
  // Meta3dStorageUtils.Main.get(_buildAccountKey())->Meta3dCommonlib.OptionSt.fromNullable
  Meta3dStorageUtils.Main.get(_buildAccountKey())
}

let logOut = () => {
  Meta3dStorageUtils.Main.remove(_buildAccountKey())
}

let buildAdminAccount = () => "meta3d"

let buildTestUserAccount = key => {
  j`testUser_${key}`
}

let _isTestUser = account => {
  account->Js.String.includes("testUser_", _)
}

let isAdmin = account => {
  switch account {
  | Some(account) if account->_isTestUser || account == buildAdminAccount() => true
  | _ => false
  }
}
