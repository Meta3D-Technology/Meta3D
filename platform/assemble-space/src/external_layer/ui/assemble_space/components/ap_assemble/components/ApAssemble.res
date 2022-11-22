open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let resetElementAssemble = dispatch => {
    dispatch(FrontendUtils.ElementAssembleStoreType.ResetWhenSwitch)
  }
}

@react.component
let make = (
  ~service: service,
  ~account,
  ~selectedExtensionsFromShop: selectedExtensionsFromShop,
  ~selectedContributesFromShop: selectedContributesFromShop,
) => {
  let dispatch = ReduxUtils.ElementAssemble.useDispatch(service.react.useDispatch)

  service.react.useEffectOnce(() => {
    Method.resetElementAssemble(dispatch)

    ((), None)
  })

  <Layout>
    <Layout.Header> <Publish service account /> <ApController service /> </Layout.Header>
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
      <Layout.Content> <CanvasController service /> <Visual service /> </Layout.Content>
      <Layout.Sider>
        <ExtensionInspector service /> <ContributeInspector service /> <ApInspector service />
      </Layout.Sider>
    </Layout>
  </Layout>
}
