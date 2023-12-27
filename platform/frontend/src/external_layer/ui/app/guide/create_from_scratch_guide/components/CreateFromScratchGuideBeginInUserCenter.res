open Antd
%%raw("import 'antd/dist/reset.css'")

@react.component
let make = (~account) => {
  let dispatch = AppStore.useDispatch()

  <Layout>
    <Layout.Header>
      <Nav
        currentKey="1"
        account={account}
        navTarget={Meta3dCommonlib.NullableSt.getEmpty()->Obj.magic}
      />
    </Layout.Header>
    <Layout.Content>
      {GuideUtils.buildSteps(
        (
          () => {
            // dispatch(
            //   AppStoreType.UserCenterAction(
            //     UserCenterStoreType.EndJumpToCreateFromScratchTourPhase1Guide,
            //   ),
            // )
            RescriptReactRouter.push("/UserCenter")
          }
        )->Some,
        0,
        GuideUtils.buildCreateFromScratchStepData(),
      )}
      <Button
        _type=#link
        onClick={_ => {
          LinkUtils.openLink(PublishedAppUtils.buildURL("meta3d", "最简单的编辑器1"))
        }}>
        {React.string(`提前预览最终成果`)}
      </Button>
    </Layout.Content>
  </Layout>
}
