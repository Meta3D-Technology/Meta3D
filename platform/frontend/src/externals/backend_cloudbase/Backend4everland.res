open FrontendUtils.BackendCloudbaseType

@module("backend-4everland")
external init: init = ""

@module("backend-4everland")
external handleLogin: handleLogin = ""

// @module("backend-4everland")
// external registerUser: registerUser = ""

let buildFrontendService = (): FrontendUtils.FrontendType.backendService => {
  {
    init: init,
    handleLogin: handleLogin,
  }
}
