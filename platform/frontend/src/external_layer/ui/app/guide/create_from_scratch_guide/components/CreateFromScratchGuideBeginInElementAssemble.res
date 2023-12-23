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
            // setOpenTour(_ => true)

            // dispatchForElementAssembleStore(
            //   ElementAssembleStoreType.EndJumpToCreateFromScratchTourPhase2Guide,
            // )
            RescriptReactRouter.push("/AssembleSpace")
          }
        )->Some,
        1,
        GuideUtils.buildCreateFromScratchStepData(),
      )}
    </Layout.Content>
  </Layout>
}
