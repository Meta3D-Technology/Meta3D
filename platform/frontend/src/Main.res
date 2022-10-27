let _getEnv = (): FrontendUtils.EnvType.env => #production

let _hiddenLoadding = %raw(`
    function(){
    document.querySelector("#loading").style.display = "none"
    }
    `)

let _buildFrontendService = (env): FrontendUtils.FrontendType.service => {
  backend: switch env {
  | #local => BackendCloudbase.buildFrontendService()
  | #production => Backend4everland.buildFrontendService()
  },
}

_hiddenLoadding()

let service = _buildFrontendService(_getEnv())

service.backend.init()->Meta3dBsMost.Most.drain->Js.Promise.then_(_ => {
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
