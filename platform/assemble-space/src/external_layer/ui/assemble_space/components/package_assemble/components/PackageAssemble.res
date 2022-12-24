open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {

}

@react.component
let make = (
  ~service: service,
  ~account,
  ~selectedPackagesFromShop: selectedPackagesFromShop,
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
          <Collapse.Panel header="Packages" key="1">
            <PackagePackages service selectedPackagesFromShop />
          </Collapse.Panel>
          <Collapse.Panel header="Extensions" key="2">
            <PackageExtensions service selectedExtensionsFromShop />
          </Collapse.Panel>
          <Collapse.Panel header="Contributes" key="3">
            <PackageContributes service selectedContributesFromShop />
          </Collapse.Panel>
          <Collapse.Panel header="Selected Packages" key="4">
            <PackageSelectedPackages service />
          </Collapse.Panel>
          <Collapse.Panel header="Selected Extensions" key="5">
            <PackageSelectedExtensions service />
          </Collapse.Panel>
          <Collapse.Panel header="Selected Contributes" key="6">
            <PackageSelectedContributes service />
          </Collapse.Panel>
        </Collapse>
      </Layout.Sider>
      <Layout.Content />
      <Layout.Sider>
        <PackageExtensionInspector service />
        <PackageContributeInspector />
      </Layout.Sider>
    </Layout>
  </Layout>
}
