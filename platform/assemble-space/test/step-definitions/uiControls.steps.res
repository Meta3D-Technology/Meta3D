open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

open Js.Promise

let feature = loadFeature("./test/features/uiControls.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))
  let allPublishUIControlProtocols = ref([])
  let selectedUIControlsFromShop = ref(list{})

  let _prepare = given => {
    given("prepare", () => {
      sandbox := createSandbox()
    })
  }

  test(."show uiControls list", ({given, \"when", \"and", then}) => {
    let useSelectorStub = ref(Obj.magic(1))

    _prepare(given)

    given("select uiControl u1 in ap view", () => {
      ()
    })

    \"and"("select action a1 in ap view", () => {
      useSelectorStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
          list{
            UIControlsTool.buildSelectedContribute(
              ~id="1",
              ~newName="u1"->Some,
              ~protocolName="meta3d-ui-control-u1",
              (),
            ),
            UIControlsTool.buildSelectedContribute(
              ~id="2",
              ~newName="a1"->Some,
              ~protocolName="meta3d-action-a1",
              (),
            ),
          },
          _,
        )
    })

    \"when"("switch to ui view", () => {
      ()
    })

    then("should show u1", () => {
      UIControlsTool.buildUI(
        ~sandbox,
        ~service=ServiceTool.build(~sandbox, ~useSelector=useSelectorStub.contents, ()),
        (),
      )
      ->ReactTestRenderer.create
      ->ReactTestTool.createSnapshotAndMatch
    })
  })

  test(."select uiControl", ({given, \"when", \"and", then}) => {
    let protocolIconBase64 = ref(Obj.magic(1))
    let name = ref(Obj.magic(1))
    let data = ref(Obj.magic(1))
    let dispatchStub = ref(Obj.magic(1))

    _prepare(given)

    given("select uiControl u1 in ap view", () => {
      protocolIconBase64 := "1"
      name := "u1"
      data := Obj.magic(11)
    })

    \"when"("select u1", () => {
      dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      UIControlsTool.selectUIControl(
        dispatchStub.contents,
        protocolIconBase64.contents,
        ""->Some,
        name.contents,
        data.contents,
      )
    })

    then("should dispatch selectUIControl action", () => {
      dispatchStub.contents
      ->Obj.magic
      ->SinonTool.calledWith(
        FrontendUtils.UIViewStoreType.SelectUIControl(
          protocolIconBase64.contents,
          "",
          name.contents,
          data.contents,
        ),
      )
      ->expect == true
    })
  })
})
