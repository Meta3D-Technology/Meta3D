open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let resetAllAssemble = dispatch => {
    dispatch(FrontendUtils.AssembleSpaceStoreType.ResetWhenSwitch)
  }
}

@react.component
let make = (~service: service, ~account, ~selectedElementsFromMarket) => {
  let dispatch = service.react.useDispatch()

  service.react.useEffectOnce(() => {
    Method.resetAllAssemble(dispatch)

    ((), None)
  })

  <Layout>
    <Layout.Content>
      <Space direction=#horizontal size=#small>
        <PublishElement service account />
        // <ElementController service />
        <RunElementVisualController service account />
        <CanvasController service />
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
        <ElementVisual service account selectedElementsFromMarket />
      </Layout.Content>
      <Layout.Sider theme=#light>
        // <ElementInspector service />
        <UIControlInspector service />
      </Layout.Sider>
    </Layout>
  </Layout>
}
