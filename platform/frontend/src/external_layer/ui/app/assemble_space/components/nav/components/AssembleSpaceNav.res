open AssembleSpaceType
open Antd
%%raw("import 'antd/dist/reset.css'")

module Method = {
  let useSelector = ({elementAssembleState}: AssembleSpaceStoreType.state) => {
    elementAssembleState.isInCreateFromScratchTourPhase2
  }
}

@react.component
let make = (
  ~service: service,
  ~currentKey="2",
  ~appName,
  ~assembleSpaceNavTarget: React.ref<Js.Nullable.t<'a>>,
) => {
  let dispatchForAppStore = service.app.useDispatch()
  let dispatchForElementAssembleStore = ReduxUtils.ElementAssemble.useDispatch(
    service.react.useDispatch,
  )

  let isInCreateFromScratchTourPhase2 = service.react.useSelector(. Method.useSelector)

  <section ref={assembleSpaceNavTarget->Obj.magic}>
    <Menu
      theme=#light
      mode=#horizontal
      defaultSelectedKeys={["2"]}
      selectedKeys={[currentKey]}
      onClick={({key}) => {
        switch key {
        | "1" =>
          !GuideUtils.readIsFinishCreateFromScratchTour() && isInCreateFromScratchTourPhase2
            ? {
                dispatchForElementAssembleStore(
                  ElementAssembleStoreType.EndCreateFromScratchTourPhase2,
                )

                dispatchForAppStore(
                  AppStoreType.UserCenterAction(
                    UserCenterStoreType.StartCreateFromScratchTourPhase3,
                  ),
                )
              }
            : ()

          RescriptReactRouter.push("/UserCenter")

        | "2"
        | _ =>
          RescriptReactRouter.push("/AssembleSpace")
        }
      }}
      items=[
        {
          key: "1",
          label: {React.string(`返回用户中心`)},
        },
        {
          key: "2",
          label: {React.string(`${appName}`)},
        },
      ]
    />
  </section>
}
