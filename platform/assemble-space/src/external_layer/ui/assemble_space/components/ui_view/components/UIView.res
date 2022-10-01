open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

@react.component
let make = (~service: service) => {
  <Layout>
    <Layout.Header />
    <Layout.Sider>
      <Collapse defaultActiveKey={["1"]}>
        <Collapse.Panel header="UI Controls" key="1"> <UIControls service /> </Collapse.Panel>
        <Collapse.Panel header="Selected UI Controls" key="2">
          <SelectedUIControls service />
        </Collapse.Panel>
      </Collapse>
    </Layout.Sider>
    <Layout.Content> <UIVisual service /> </Layout.Content>
    <Layout.Sider />
  </Layout>
}
