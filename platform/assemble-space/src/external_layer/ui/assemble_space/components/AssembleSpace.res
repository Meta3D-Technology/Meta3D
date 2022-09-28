open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

// TODO check login

type view =
  | Ap
  | UI

module Method = {
  let reset = dispatch => {
    dispatch(FrontendUtils.AssembleSpaceStoreType.Reset)
  }

  let useEffectOnce = dispatch => {
    reset(dispatch)

    ((), None)
  }
}

@react.component
let make = (
  ~service: service,
  ~username,
  ~selectedExtensionsFromShop: selectedExtensionsFromShop,
  ~selectedContributesFromShop: selectedContributesFromShop,
) => {
  let dispatch = service.react.useDispatch()

  let (currentView, setCurrentView) = service.react.useState(_ => Ap)

  service.react.useEffectOnce(() => Method.useEffectOnce(dispatch))

  <Layout>
    <Layout.Header>
      <Button
        onClick={_ => {
          setCurrentView(_ => Ap)
        }}>
        {React.string(`应用视图`)}
      </Button>
      <Button
        onClick={_ => {
          setCurrentView(_ => UI)
        }}>
        {React.string(`UI视图`)}
      </Button>
    </Layout.Header>
    <Layout.Content>
      {switch currentView {
      | Ap => <ApView service username selectedExtensionsFromShop selectedContributesFromShop />
      | UI => <UIView service />
      }}
    </Layout.Content>
  </Layout>
}
