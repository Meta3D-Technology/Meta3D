open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

@react.component
let make = (~service: service, ~account) => {
  <Layout>
    <Layout.Content>
      <Space direction=#horizontal size=#small>
        <PublishElement service account />
        <ElementController service />
        <RunElementVisualController service />
      </Space>
    </Layout.Content>
    <Layout>
      <Layout.Sider theme=#light>
        <Collapse defaultActiveKey={["1"]}>
          <Collapse.Panel header="UI Controls" key="1">
            <UIControls service />
          </Collapse.Panel>
          <Collapse.Panel header="Selected UI Controls" key="2">
            <SelectedUIControls service />
          </Collapse.Panel>
        </Collapse>
      </Layout.Sider>
      <Layout.Content>
        <ElementVisual service account />
      </Layout.Content>
      <Layout.Sider theme=#light>
        <ElementInspector service />
        <UIControlInspector service />
      </Layout.Sider>
    </Layout>
  </Layout>
}
