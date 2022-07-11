open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

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
  ~selectedExtensionsFromShop: selectedExtensionsFromShop,
  ~selectedContributesFromShop: selectedContributesFromShop,
) => {
  let dispatch = service.react.useDispatch()

  service.react.useEffectOnce(() => Method.useEffectOnce(dispatch))

  <Layout>
    <Layout.Header>
      <Button
        onClick={_ => {
          ()
        }}>
        {React.string(`发布`)}
      </Button>
    </Layout.Header>
    <Layout>
      // TODO extract Sider component
      <Layout.Sider>
        <Collapse defaultActiveKey={["1"]}>
          <Collapse.Panel header="Extensions" key="1">
            <Extensions service selectedExtensionsFromShop />
          </Collapse.Panel>
          <Collapse.Panel header="Contributes" key="2">
            <Contributes service selectedContributesFromShop />
          </Collapse.Panel>
          <Collapse.Panel header="Selected Extensions" key="3">
            <SelectedExtensions service />
          </Collapse.Panel>
          <Collapse.Panel header="Selected Contributes" key="4">
            <SelectedContributes service />
          </Collapse.Panel>
        </Collapse>
      </Layout.Sider>
      <Layout.Content> {React.string(`装配空间`)} </Layout.Content>
      <Layout.Sider> <ExtensionInspector service /> <ContributeInspector service /> </Layout.Sider>
    </Layout>
  </Layout>
}
