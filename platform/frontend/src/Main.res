let _getEnv = (): FrontendUtils.EnvType.env => #production

let _hiddenLoadding = %raw(`
    function(){
    document.querySelector("#loading").style.display = "none"
    }
    `)

let _buildFrontendService = (env): FrontendUtils.FrontendType.service => {
  backend: switch env {
  | #local => BackendCloudbase2.buildFrontendService()
  | #production => Backend4everland.buildFrontendService()
  },
}

_hiddenLoadding()

// BackendCloudbase2.init()->Meta3dBsMost.Most.flatMap(_ => {
//   BackendCloudbase2.registerUser("u1", "p1")
// }, _)->Meta3dBsMost.Most.drain->Js.Promise.catch(e => {
//   Js.log(e)->Obj.magic
// }, _)->ignore

// Backend4everland.init()
// ->Meta3dBsMost.Most.concat(Backend4everland.registerUser("u1", "p1"), _)
// ->Meta3dBsMost.Most.drain
// ->Js.Promise.catch(e => {
//   Js.log(e)->Obj.magic
// }, _)
// ->ignore

// BackendCloudbase.init()->Meta3dBsMost.Most.drain->Js.Promise.then_(_ => {
//   Js.log("init backend success")->Js.Promise.resolve
// }, _)->ignore

let service = _buildFrontendService(_getEnv())

service.backend.init()->Meta3dBsMost.Most.drain->Js.Promise.then_(_ => {
  Js.log("init backend success")->Js.Promise.resolve
}, _)->ignore

ReactDOM.render(
  <React.StrictMode>
    <AppStore.AppStore.Provider store=AppStore.store>
      <App service env=_getEnv() />
    </AppStore.AppStore.Provider>
  </React.StrictMode>,
  ReactDOM.querySelector("#root")->Meta3dCommonlib.OptionSt.getExn,
)
