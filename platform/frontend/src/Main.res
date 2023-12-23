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
    error: (. errorMessage, durationOpt) => MessageUtils.error(errorMessage, durationOpt),
    errorWithExn: (. error, durationOpt) => MessageUtils.errorWithExn(error, durationOpt),
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
      <Antd.ConfigProvider
        theme={
          components: {
            "Layout": (
              {
                headerBg: "#ffffff",
                headerPadding: "0 20px",
              }: Antd.ConfigProvider.layoutToken
            ),
            "Button": (
              {
                textHoverBg: "#ffffff",
              }: Antd.ConfigProvider.buttonToken
            ),
          },
        }>
        <App service env={EnvUtils.getEnv()} />
      </Antd.ConfigProvider>
    </AppStore.AppStore.Provider>
  </React.StrictMode>,
  ReactDOM.querySelector("#root")->Meta3dCommonlib.OptionSt.getExn,
)
