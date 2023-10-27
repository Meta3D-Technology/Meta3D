open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let resetAllAssemble = dispatch => {
    dispatch(FrontendUtils.AssembleSpaceStoreType.ResetWhenSwitch)
  }
}

@react.component
let make = (
  ~service: service,
  ~account,
  ~selectedPackagesFromMarket: selectedPackagesFromMarket,
  ~selectedExtensionsFromMarket: selectedExtensionsFromMarket,
  ~selectedContributesFromMarket: selectedContributesFromMarket,
  ~storedPackageIdsInApp,
) => {
  let dispatch = service.react.useDispatch()

  service.react.useEffectOnce(() => {
    Method.resetAllAssemble(dispatch)

    ((), None)
  })

  <Layout>
    <Layout.Content>
      <Space direction=#horizontal size=#small>
        <Publish service account storedPackageIdsInApp />
        <ApController service />
      </Space>
    </Layout.Content>
    <Layout>
      <Layout.Sider theme=#light>
        <Collapse defaultActiveKey={["1"]}>
          <Collapse.Panel header="Packages" key="1">
            <Packages service selectedPackagesFromMarket />
          </Collapse.Panel>
          <Collapse.Panel header="Extensions" key="2">
            <Extensions service selectedExtensionsFromMarket />
          </Collapse.Panel>
          <Collapse.Panel header="Contributes" key="3">
            <Contributes service selectedContributesFromMarket />
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
        <ApDependencyGraph service storedPackageIdsInApp />
      </Layout.Content>
      <Layout.Sider theme=#light>
        <ExtensionInspector service />
        <ContributeInspector service />
        <PackageInspector service storedPackageIdsInApp />
        <ApInspector service />
      </Layout.Sider>
    </Layout>
  </Layout>
}
