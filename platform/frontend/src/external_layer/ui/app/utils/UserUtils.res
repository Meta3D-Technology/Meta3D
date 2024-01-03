let buildAdminAccount = () => "meta3d"

let buildTestUserAccount = key => {
  j`testUser_${key}`
}

let _isTestUser = account => {
  account->Js.String.includes("testUser_", _)
}

let isAdmin = account => {
  switch account {
  | Some(account) if account->_isTestUser || account == "meta3d" => true
  | _ => false
  }
}
