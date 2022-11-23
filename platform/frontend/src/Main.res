let _getEnv = (): FrontendUtils.EnvType.env => #production

let _hiddenLoadding = %raw(`
    function(){
    document.querySelector("#loading").style.display = "none"
    }
    `)

let _buildFrontendService = (env): FrontendUtils.FrontendType.service => {
  backend: switch env {
  | #local => BackendCloudbase.buildFrontendService()
  | #production =>
    // TODO restore 4everland
    // Backend4everland.buildFrontendService()

    BackendCloudbase.buildFrontendService()
  },
}

let _getBackendEnv = (env: FrontendUtils.EnvType.env) => {
  switch env {
  | #local =>
   "meta3d-4g18u7z10c8427f9"
    // "meta3d-production-6eaj4630a6b9e7"
  | #production => "meta3d-production-6eaj4630a6b9e7"
  }
}

_hiddenLoadding()

let service = _buildFrontendService(_getEnv())

service.backend.init(_getBackendEnv(_getEnv()))->Meta3dBsMost.Most.drain->Js.Promise.then_(_ => {
  Js.log("init backend success")->Js.Promise.resolve
}, _)->ignore

ReactDOM.render(
  <React.StrictMode>
    <AppStore.AppStore.Provider store=AppStore.store>
      <App service env={_getEnv()} />
    </AppStore.AppStore.Provider>
  </React.StrictMode>,
  ReactDOM.querySelector("#root")->Meta3dCommonlib.OptionSt.getExn,
)
