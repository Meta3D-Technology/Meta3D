open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let resetAllAssemble = dispatch => {
    dispatch(FrontendUtils.AssembleSpaceStoreType.ResetWhenSwitch)
  }

//   /* ! TODO handle same name:
// now just remove duplicate one, but need handle more:

// compare equal(first length, then all)?{
// use local input
// } :{
// remain one custom input;
// rename another custom input's name to add post fix:"_copy";
// }
//  */
//   let _mergeCustoms = selectedElementsFromMarket => {
//     selectedElementsFromMarket
//     ->Meta3dCommonlib.ListSt.reduce([], (
//       mergedCustomInputs,
//       {customInputs}: FrontendUtils.BackendCloudbaseType.elementAssembleData,
//     ) => {
//       mergedCustomInputs
//       ->Js.Array.concat(customInputs, _)
//       ->Meta3dCommonlib.ArraySt.removeDuplicateItemsWithBuildKeyFunc((. {name}) => {
//         name
//       })
//     })
//     ->Meta3dCommonlib.ListSt.fromArray
//   }

  // let importElementCustom = (dispatchForElementAssembleStore, selectedElementsFromMarket) => {
  //   let mergedCustomInputs = _mergeCustoms(selectedElementsFromMarket)

  //   dispatchForElementAssembleStore(
  //     FrontendUtils.ElementAssembleStoreType.ImportElementCustom(mergedCustomInputs),
  //   )
  // }

  // let addGeneratedCustoms = (
  //   service,
  //   selectedContributes,
  //   account,
  //   customInputs,
  //   customActions,
  // ) => {
  //   selectedContributes
  //   ->FrontendUtils.ElementUtils.addGeneratedInputContributesForElementAssemble(
  //     (service.meta3d.generateContribute, service.meta3d.loadContribute),
  //     _,
  //     account,
  //     customInputs,
  //   )
  //   ->FrontendUtils.ElementUtils.addGeneratedActionContributesForElementAssemble(
  //     (service.meta3d.generateContribute, service.meta3d.loadContribute),
  //     _,
  //     account,
  //     customActions,
  //   )
  // }

  let useSelector = (
    {apAssembleState, elementAssembleState}: FrontendUtils.AssembleSpaceStoreType.state,
  ) => {
    let {selectedContributes} = apAssembleState
    let {currentCustomInputName} = elementAssembleState

    (selectedContributes, currentCustomInputName)
  }
}

@react.component
let make = (~service: service, ~account, ~selectedElementsFromMarket) => {
  let dispatch = service.react.useDispatch()
  let dispatchForElementAssembleStore = FrontendUtils.ReduxUtils.ElementAssemble.useDispatch(
    service.react.useDispatch,
  )
  let (selectedContributes, currentCustomInputName) = service.react.useSelector(.
    Method.useSelector,
  )

  // let (
  //   selectedContributesAfterGeneratedCustoms,
  //   setSelectedContributesAfterGeneratedCustoms,
  // ) = service.react.useState(_ => None)

  service.react.useEffectOnce(() => {
    Method.resetAllAssemble(dispatch)

    ((), None)
  })

  // service.react.useEffect1(. () => {
  //   Method.importElementCustom(dispatchForElementAssembleStore, selectedElementsFromMarket)

  //   None
  // }, [selectedElementsFromMarket])

  // service.react.useEffect1(. () => {
  //   setSelectedContributesAfterGeneratedCustoms(_ =>
  //     Method.addGeneratedCustoms(
  //       service,
  //       selectedContributes,
  //       account->Meta3dCommonlib.OptionSt.getExn,
  //       customInputs,
  //       customActions,
  //     )->Some
  //   )

  //   None
  // }, [selectedContributes, customInputs->Obj.magic, customActions->Obj.magic])

  // {
  //   switch selectedContributesAfterGeneratedCustoms {
  //   | None => <p> {React.string(`处理中...`)} </p>
  //   | Some(selectedContributesAfterGeneratedCustoms) =>
  //   }
  // }

  <Layout>
    <Layout.Content>
      <Space direction=#horizontal size=#small>
        <PublishElement service account />
        // <ElementController service />
        <RunElementVisualController service account selectedContributes />
        <CanvasController service />
      </Space>
    </Layout.Content>
    <Layout>
      <Layout.Sider theme=#light>
        <Collapse defaultActiveKey={["1"]}>
          <Collapse.Panel header="UI Controls" key="1">
            <UIControls service selectedContributes />
          </Collapse.Panel>
          <Collapse.Panel header="Selected UI Controls" key="2">
            <SelectedUIControls service />
          </Collapse.Panel>
          <Collapse.Panel header="Custom Inputs" key="3">
            <CustomInputs service />
          </Collapse.Panel>
        </Collapse>
      </Layout.Sider>
      <Layout.Content>
        {switch currentCustomInputName {
        | None =>
          <Layout>
            <Layout.Content>
              <ElementVisual service account selectedElementsFromMarket selectedContributes />
            </Layout.Content>
            <Layout.Sider theme=#light>
              <ElementInspector service account  selectedContributes />
            </Layout.Sider>
          </Layout>

        | Some(currentCustomInputName) =>
          <Layout>
            <Layout.Content>
              <CustomInputCodeEdit service currentCustomInputName />
            </Layout.Content>
          </Layout>
        }}
      </Layout.Content>
    </Layout>
  </Layout>
}
