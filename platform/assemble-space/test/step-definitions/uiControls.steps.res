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
              ~protocolConfigStr="u1_config"->Some,
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
    let protocolConfigStr = ref(Obj.magic(1))
    let name = ref(Obj.magic(1))
    let data = ref(Obj.magic(1))
    let s1Name = "s1"
    let getSkinProtocolDataStub = ref(Obj.magic(1))
    let execGetContributeFuncStub = ref(Obj.magic(1))
    let selectedContributes = ref(Obj.magic(1))
    let dispatchStub = ref(Obj.magic(1))

    _prepare(given)

    given("select uiControl u1 in ap view", () => {
      protocolIconBase64 := "1"
      protocolConfigStr := "c"
      name := "u1"
      data := Obj.magic(11)
    })

    \"and"("select skin s1 which is used by u1 in ap view", () => {
      let protocolName = "meta3d-skin-s-protocol"

      getSkinProtocolDataStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
          UIControlInspectorTool.buildSkinProtocolData(
            ~protocolName,
            ~protocolVersion="^0.5.0",
            (),
          ),
          _,
        )

      execGetContributeFuncStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      execGetContributeFuncStub.contents
      ->onCall(0, _)
      ->returns(
        {
          "skinName": s1Name,
        },
        _,
      )
      ->ignore

      selectedContributes :=
        list{
          SelectedContributesTool.buildSelectedContribute(
            ~id=s1Name,
            ~newName=None,
            ~protocolConfigStr=""->Some,
            ~data=ContributeTool.buildContributeData(
              ~contributePackageData=ContributeTool.buildContributePackageData(
                ~name=s1Name,
                ~protocol=(
                  {
                    name: protocolName,
                    version: "^0.5.1",
                  }: Meta3d.ExtensionFileType.contributeProtocolData
                ),
                (),
              ),
              (),
            ),
            (),
          ),
        }
    })

    \"when"("select u1", () => {
      dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      UIControlsTool.selectUIControl(
        ServiceTool.build(
          ~sandbox,
          ~execGetContributeFunc=execGetContributeFuncStub.contents->Obj.magic,
          ~getSkinProtocolData=getSkinProtocolDataStub.contents->Obj.magic,
          (),
        ),
        dispatchStub.contents,
        selectedContributes.contents,
        protocolIconBase64.contents,
        protocolConfigStr.contents->Some,
        name.contents,
        data.contents,
      )
    })

    \"and"("should find s1", () => {
      ()
    })

    then("dispatch SelectUIControl action", () => {
      dispatchStub.contents
      ->Obj.magic
      ->SinonTool.calledWith(
        FrontendUtils.ElementAssembleStoreType.SelectUIControl(
          protocolIconBase64.contents,
          protocolConfigStr.contents,
          name.contents,
          data.contents,
          UIControlInspectorTool.buildSkin(s1Name),
        ),
      )
      ->expect == true
    })
  })
})
