let _hiddenLoadding = %raw(`
    function(){
    document.querySelector("#loading").style.display = "none"
    }
    `)

let _buildFrontendService = (env): FrontendType.service => {
  backend: switch env {
  | #local => BackendCloudbase.buildFrontendService()
  | #production =>
    // TODO restore 4everland
    // Backend4everland.buildFrontendService()

    BackendCloudbase.buildFrontendService()
  },
  console: {
    error: (. errorMessage, durationOpt) => ErrorUtils.error(errorMessage, durationOpt),
    errorWithExn: (. error, durationOpt) => ErrorUtils.errorWithExn(error, durationOpt),
  },
}

_hiddenLoadding()

let service = _buildFrontendService(EnvUtils.getEnv())

service.backend.init(InitUtils.getBackendEnv(EnvUtils.getEnv()))
->Meta3dBsMostDefault.Most.drain
->Js.Promise.then_(_ => {
  Js.log("init backend success")->Js.Promise.resolve
}, _)
->ignore

ReactDOM.render(
  <React.StrictMode>
    <AppStore.AppStore.Provider store=AppStore.store>
      <App service env={EnvUtils.getEnv()} />
    </AppStore.AppStore.Provider>
  </React.StrictMode>,
  ReactDOM.querySelector("#root")->Meta3dCommonlib.OptionSt.getExn,
)
