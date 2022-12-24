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
  ~selectedPackagesFromShop: selectedPackagesFromShop,
  ~selectedExtensionsFromShop: selectedExtensionsFromShop,
  ~selectedContributesFromShop: selectedContributesFromShop,
) => {
  let dispatch = ReduxUtils.ElementAssemble.useDispatch(service.react.useDispatch)

  service.react.useEffectOnce(() => {
    Method.resetElementAssemble(dispatch)

    ((), None)
  })

  <Layout>
    <Layout.Header>
      <Publish service account />
      <ApController service />
    </Layout.Header>
    <Layout>
      // TODO extract Sider component
      <Layout.Sider>
        <Collapse defaultActiveKey={["1"]}>
          <Collapse.Panel header="Packages" key="1">
            <Packages service selectedPackagesFromShop />
          </Collapse.Panel>
          <Collapse.Panel header="Extensions" key="2">
            <Extensions service selectedExtensionsFromShop />
          </Collapse.Panel>
          <Collapse.Panel header="Contributes" key="3">
            <Contributes service selectedContributesFromShop />
          </Collapse.Panel>
          <Collapse.Panel header="Selected Packages" key="4">
            <SelectedPackages service />
          </Collapse.Panel>
          <Collapse.Panel header="Selected Extensions" key="5">
            <SelectedExtensions service />
          </Collapse.Panel>
          <Collapse.Panel header="Selected Contributes" key="6">
            <SelectedContributes service />
          </Collapse.Panel>
        </Collapse>
      </Layout.Sider>
      <Layout.Content>
        <CanvasController service />
        <Visual service />
      </Layout.Content>
      <Layout.Sider>
        <ExtensionInspector service />
        <ContributeInspector />
        <ApInspector service />
      </Layout.Sider>
    </Layout>
  </Layout>
}
