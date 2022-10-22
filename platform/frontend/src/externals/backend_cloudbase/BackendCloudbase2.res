open FrontendUtils.BackendCloudbaseType

@module("backend-cloudbase")
external init: init = ""

@module("backend-cloudbase")
external handleLogin: handleLogin = ""

// @module("backend-cloudbase")
// external registerUser: registerUser = ""

let buildFrontendService = (): FrontendUtils.FrontendType.backendService => {
  {
    init: init,
    handleLogin: handleLogin,
  }
}
