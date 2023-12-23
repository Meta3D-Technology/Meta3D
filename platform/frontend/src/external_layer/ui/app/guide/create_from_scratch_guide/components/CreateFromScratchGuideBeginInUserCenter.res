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
    </Layout.Content>
  </Layout>
}
