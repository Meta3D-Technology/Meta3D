open BackendCloudbaseType

type backendService = {
  init: init,
  handleLogin: handleLogin,
}

type service = {backend: backendService}
