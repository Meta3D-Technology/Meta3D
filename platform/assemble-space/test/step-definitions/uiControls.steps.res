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

    given(
      "select uiControl u1 in ap view",
      () => {
        ()
      },
    )

    \"and"(
      "select action a1 in ap view",
      () => {
        useSelectorStub :=
          createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
            (
              list{
                UIControlsTool.buildSelectedContribute(
                  ~id="1",
                  ~name="u1",
                  ~protocolName="meta3d-ui-control-u1",
                  ~protocolConfigStr="u1_config"->Some,
                  (),
                ),
                UIControlsTool.buildSelectedContribute(
                  ~id="2",
                  ~name="a1",
                  ~protocolName="meta3d-action-a1",
                  (),
                ),
              },
              None,
            ),
            // ~newName="u1"->Some,

            // ~newName="a1"->Some,

            _,
          )
      },
    )

    \"when"(
      "switch to ui view",
      () => {
        ()
      },
    )

    then(
      "should show u1",
      () => {
        UIControlsTool.buildUI(
          ~sandbox,
          ~service=ServiceTool.build(~sandbox, ~useSelector=useSelectorStub.contents, ()),
          (),
        )
        ->ReactTestRenderer.create
        ->ReactTestTool.createSnapshotAndMatch
      },
    )
  })

  test(."select uiControl", ({given, \"when", \"and", then}) => {
    let protocolIconBase64 = ref(Obj.magic(1))
    let protocolConfigStr = ref(Obj.magic(1))
    let sepcific = ref(Obj.magic(1))
    let name = ref(Obj.magic(1))
    let data = ref(Obj.magic(1))
    let s1Name = "s1"
    let execGetContributeFuncStub = ref(Obj.magic(1))
    let selectedContributes = ref(Obj.magic(1))
    let dispatchStub = ref(Obj.magic(1))

    _prepare(given)

    given(
      "select uiControl u1 in ap view",
      () => {
        protocolIconBase64 := "1"
        protocolConfigStr := "c"
        name := "u1"
        data :=
          ContributeTool.buildContributeData(
            ~contributePackageData=ContributeTool.buildContributePackageData(),
            (),
          )

        sepcific := [
            UIControlsTool.buildSpecific(~name="s1", ~type_=#string, ~value="d1"->Obj.magic, ()),
          ]
      },
    )

    \"when"(
      "select u1",
      () => {
        dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

        UIControlsTool.selectUIControl(
          ServiceTool.build(
            ~sandbox,
            ~execGetContributeFunc=execGetContributeFuncStub.contents->Obj.magic,
            ~getUIControlSpecificDataFields=createEmptyStub(refJsObjToSandbox(sandbox.contents))
            ->returns(sepcific.contents, _)
            ->Obj.magic,
            (),
          ),
          dispatchStub.contents,
          list{},
          selectedContributes.contents,
          protocolIconBase64.contents,
          protocolConfigStr.contents->Some,
          name.contents,
          data.contents,
          None,
        )
      },
    )

    then(
      "dispatch SelectUIControl action",
      () => {
        dispatchStub.contents
        ->Obj.magic
        ->SinonTool.calledWith(
          FrontendUtils.ElementAssembleStoreType.SelectUIControl(
            protocolIconBase64.contents,
            protocolConfigStr.contents,
            name.contents,
            data.contents,
            None,
            [
              UIControlInspectorTool.buildSpecific(
                ~name="s1",
                ~type_=#string,
                ~value="d1"->Obj.magic->FrontendUtils.ElementAssembleStoreType.SpecicFieldDataValue,
                (),
              ),
            ],
          ),
        )
        ->expect == true
      },
    )
  })

  test(.
    "if already select ui control Scene View before, select ui control Scene View again should error",
    ({given, \"when", \"and", then}) => {
      // let name = UIControlsTool.getScenViewUIControlName()
      let errorStub = ref(Obj.magic(1))
      let data = ref(Obj.magic(1))

      _prepare(given)

      given(
        "select uiControl Scene View in ap view",
        () => {
          data :=
            ContributeTool.buildContributeData(
              ~contributePackageData=ContributeTool.buildContributePackageData(
                ~protocol=(
                  {
                    name: UIControlsTool.getScenViewUIControlProtocolName(),
                    version: "^0.0.1",
                  }: Meta3d.ExtensionFileType.contributeProtocolData
                ),
                (),
              ),
              (),
            )
        },
      )

      \"and"(
        "select Scene View",
        () => {
          ()
        },
      )

      \"when"(
        "select Scene View",
        () => {
          errorStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

          UIControlsTool.selectUIControl(
            ServiceTool.build(~sandbox, ~error=errorStub.contents, ()),
            Obj.magic(1),
            list{SelectedUIControlsTool.buildSelectedUIControl(~data=data.contents, ())},
            Obj.magic(1),
            Obj.magic(1),
            ""->Some,
            "",
            data.contents,
            None,
          )
        },
      )

      then(
        "error",
        () => {
          errorStub.contents
          ->Obj.magic
          ->SinonTool.calledWith({j`只能有1个Scene View UI Control`})
          ->expect == true
        },
      )
    },
  )
})
