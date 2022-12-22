open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

// TODO check login

type view =
  | Ap
  | Element
  | Package

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
  ~account,
  ~selectedExtensionsFromShop: selectedExtensionsFromShop,
  ~selectedContributesFromShop: selectedContributesFromShop,
  ~selectedPackagesFromShop: selectedPackagesFromShop,
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
      <Button
        onClick={_ => {
          setCurrentAssemble(_ => Package)
        }}>
        {React.string(`包装配`)}
      </Button>
    </Layout.Header>
    <Layout.Content>
      {switch currentAssemble {
      | Ap =>
        <ApAssemble
          service
          account
          selectedExtensionsFromShop
          selectedContributesFromShop
          selectedPackagesFromShop
        />
      | Element => <ElementAssemble service account />
      | Package =>
        <PackageAssemble
          service
          account
          selectedExtensionsFromShop
          selectedContributesFromShop
          selectedPackagesFromShop
        />
      }}
    </Layout.Content>
  </Layout>
}
