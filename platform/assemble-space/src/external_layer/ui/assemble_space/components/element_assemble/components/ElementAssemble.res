open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let resetAllAssemble = dispatch => {
    dispatch(FrontendUtils.AssembleSpaceStoreType.ResetWhenSwitch)
  }

  let addGeneratedCustoms = (
    service,
    selectedContributes,
    account,
    customInputs,
    customActions,
  ) => {
    selectedContributes
    ->FrontendUtils.ElementUtils.addGeneratedInputContributesForElementAssemble(
      (service.meta3d.generateContribute, service.meta3d.loadContribute),
      _,
      account,
      customInputs,
    )
    ->FrontendUtils.ElementUtils.addGeneratedActionContributesForElementAssemble(
      (service.meta3d.generateContribute, service.meta3d.loadContribute),
      _,
      account,
      customActions,
    )
  }

  let useSelector = (
    {apAssembleState, elementAssembleState}: FrontendUtils.AssembleSpaceStoreType.state,
  ) => {
    let {selectedContributes, customInputs, customActions} = apAssembleState

    (selectedContributes, customInputs, customActions)
  }
}

@react.component
let make = (~service: service, ~account, ~selectedElementsFromMarket) => {
  let dispatch = service.react.useDispatch()
  let (selectedContributes, customInputs, customActions) = service.react.useSelector(.
    Method.useSelector,
  )

  let (
    selectedContributesAfterGeneratedCustoms,
    setSelectedContributesAfterGeneratedCustoms,
  ) = service.react.useState(_ => None)

  service.react.useEffectOnce(() => {
    Method.resetAllAssemble(dispatch)

    ((), None)
  })

  service.react.useEffect1(. () => {
    setSelectedContributesAfterGeneratedCustoms(_ =>
      Method.addGeneratedCustoms(
        service,
        selectedContributes,
        account->Meta3dCommonlib.OptionSt.getExn,
        customInputs,
        customActions,
      )->Some
    )

    None
  }, [selectedContributes, customInputs->Obj.magic, customActions->Obj.magic])

  {
    switch selectedContributesAfterGeneratedCustoms {
    | None => <p> {React.string(`处理中...`)} </p>
    | Some(selectedContributesAfterGeneratedCustoms) =>
      <Layout>
        <Layout.Content>
          <Space direction=#horizontal size=#small>
            <PublishElement service account />
            // <ElementController service />
            <RunElementVisualController
              service account selectedContributes=selectedContributesAfterGeneratedCustoms
            />
            <CanvasController service />
          </Space>
        </Layout.Content>
        <Layout>
          <Layout.Sider theme=#light>
            <Collapse defaultActiveKey={["1"]}>
              <Collapse.Panel header="UI Controls" key="1">
                <UIControls service selectedContributes=selectedContributesAfterGeneratedCustoms />
              </Collapse.Panel>
              <Collapse.Panel header="Selected UI Controls" key="2">
                <SelectedUIControls service />
              </Collapse.Panel>
            </Collapse>
          </Layout.Sider>
          <Layout.Content>
            <ElementVisual
              service
              account
              selectedElementsFromMarket
              selectedContributes=selectedContributesAfterGeneratedCustoms
            />
          </Layout.Content>
          <Layout.Sider theme=#light>
            <ElementInspector
              service selectedContributes=selectedContributesAfterGeneratedCustoms
            />
          </Layout.Sider>
        </Layout>
      </Layout>
    }
  }
}
