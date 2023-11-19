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

  let getCurrentKey = (currentAssemble: view) => {
    switch currentAssemble {
    | Ap => "1"
    | Element => "2"
    | Package => "3"
    }
  }

  let useEffectOnce = dispatch => {
    (
      (),
      Some(
        () => {
          reset(dispatch)
        },
      ),
    )
  }
}

@react.component
let make = (
  ~service: service,
  ~account,
  ~selectedPackagesFromMarket: selectedPackagesFromMarket,
  ~selectedExtensionsFromMarket: selectedExtensionsFromMarket,
  ~selectedContributesFromMarket: selectedContributesFromMarket,
  ~selectedElementsFromMarket: selectedElementsFromMarket,
) => {
  let dispatch = service.react.useDispatch()

  let (currentAssemble, setCurrentAssemble) = service.react.useState(_ => Ap)

  service.react.useEffectOnce(() => Method.useEffectOnce(dispatch))

  <Layout>
    <Layout.Content>
      <Menu
        theme=#light
        mode=#horizontal
        defaultSelectedKeys={["1"]}
        selectedKeys={[Method.getCurrentKey(currentAssemble)]}
        onClick={({key}) => {
          switch key {
          | "2" => setCurrentAssemble(_ => Element)
          | "3" => setCurrentAssemble(_ => Package)
          | "1"
          | _ =>
            setCurrentAssemble(_ => Ap)
          }
        }}
        items=[
          {
            key: "1",
            label: {React.string(`应用装配`)},
          },
          {
            key: "2",
            label: {React.string(`页面装配`)},
          },
          {
            key: "3",
            label: {React.string(`包装配`)},
          },
        ]
      />
    </Layout.Content>
    <Layout.Content>
      {switch currentAssemble {
      | Ap =>
        <ApAssemble
          service
          account
          selectedExtensionsFromMarket
          selectedContributesFromMarket
          selectedPackagesFromMarket
          selectedElementsFromMarket
        />
      | Element => <ElementAssemble service account selectedElementsFromMarket />
      | Package =>
        <PackageAssemble
          service
          account
          selectedExtensionsFromMarket
          selectedContributesFromMarket
          selectedPackagesFromMarket
        />
      }}
    </Layout.Content>
  </Layout>
}
