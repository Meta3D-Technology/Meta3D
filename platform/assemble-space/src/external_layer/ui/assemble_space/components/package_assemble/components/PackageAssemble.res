open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {

}

@react.component
let make = (
  ~service: service,
  ~account,
  ~selectedExtensionsFromShop: selectedExtensionsFromShop,
  ~selectedContributesFromShop: selectedContributesFromShop,
) => {
  <Layout>
    <Layout.Header>
      <PublishPackage service account />
    </Layout.Header>
    <Layout>
      // TODO extract Sider component
      <Layout.Sider>
        <Collapse defaultActiveKey={["1"]}>
          <Collapse.Panel header="Extensions" key="1">
            <PackageExtensions service selectedExtensionsFromShop />
          </Collapse.Panel>
          <Collapse.Panel header="Contributes" key="2">
            <PackageContributes service selectedContributesFromShop />
          </Collapse.Panel>
          <Collapse.Panel header="Selected Extensions" key="3">
            <PackageSelectedExtensions service />
          </Collapse.Panel>
          <Collapse.Panel header="Selected Contributes" key="4">
            <PackageSelectedContributes service />
          </Collapse.Panel>
        </Collapse>
      </Layout.Sider>
      <Layout.Content />
      <Layout.Sider>
        <PackageExtensionInspector service />
        <PackageContributeInspector service />
      </Layout.Sider>
    </Layout>
  </Layout>
}
