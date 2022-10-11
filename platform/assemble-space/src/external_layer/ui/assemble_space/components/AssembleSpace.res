open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

// TODO check login

type view =
  | Ap
  | Element

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

  let (currentAssemble, setCurrentAssemble) = service.react.useState(_ => Ap)

  service.react.useEffectOnce(() => Method.useEffectOnce(dispatch))

  <Layout>
    <Layout.Header>
      <Button
        onClick={_ => {
          setCurrentAssemble(_ => Ap)
        }}>
        {React.string(`应用装配`)}
      </Button>
      <Button
        onClick={_ => {
          setCurrentAssemble(_ => Element)
        }}>
        {React.string(`Element装配`)}
      </Button>
    </Layout.Header>
    <Layout.Content>
      {switch currentAssemble {
      | Ap => <ApAssemble service username selectedExtensionsFromShop selectedContributesFromShop />
      | Element => <ElementAssemble service />
      }}
    </Layout.Content>
  </Layout>
}
