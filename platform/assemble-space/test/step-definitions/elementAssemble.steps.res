open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/elementAssemble.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))

  let _prepare = (given, \"and") => {
    given("prepare", () => {
      sandbox := createSandbox()
      ReactTestTool.prepare()

      FileTool.buildFakeTextDecoder(FileTool.convertUint8ArrayToBuffer)
      FileTool.buildFakeTextEncoder(.)
    })
  }

  test(."import element custom", ({given, \"when", \"and", then}) => {
    let e1 = ref(Obj.magic(1))
    let e2 = ref(Obj.magic(1))
    let customInput1 = CustomTool.buildCustomInput(~name="Input1", ~fileStr="f1", ())
    let customInput2 = customInput1
    let customInput3 = CustomTool.buildCustomInput(~name="Input3", ~fileStr="f3", ())
    let i1Name = "input1"
    let dispatchStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    given(
      "select element e1 which has custom input1",
      () => {
        e1 :=
          ImportElementTool.buildElementAssembleData(
            ~account="a1",
            ~elementName="d1",
            ~elementVersion="0.0.1",
            ~customInputs=[customInput1],
            (),
          )
      },
    )

    \"and"(
      "select element e2 which has custom input2 duplicate with custom input1 and has custom input3",
      () => {
        e2 :=
          ImportElementTool.buildElementAssembleData(
            ~account="a2",
            ~elementName="d2",
            ~elementVersion="0.0.1",
            ~customInputs=[customInput2, customInput3],
            (),
          )
      },
    )

    \"when"(
      "import all selected elements's custom",
      () => {
        dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

        AssembleSpaceTool.importElementCustom(dispatchStub.contents, list{e1.contents, e2.contents})
      },
    )

    then(
      "merge custom inputs to [custom input1, custom input3]",
      () => {
        ()
      },
    )

    \"and"(
      "dispatch ImportElementCustom action with them",
      () => {
        dispatchStub.contents
        ->Obj.magic
        ->SinonTool.calledWith(
          FrontendUtils.ElementAssembleStoreType.ImportElementCustom(list{
            customInput1,
            customInput3,
          }),
        )
        ->expect == true
      },
    )
  })

  test(."add generated custom to selected contributes", ({given, \"and", \"when", then}) => {
    let selectedContributes = list{}
    let account = "a1"
    let customInputs = ref(Obj.magic(1))
    let customActions = ref(Obj.magic(1))
    let inputName = "i1"
    let inputFileStr = ElementVisualTool.buildEmptyContributeFileStr()
    let actionName = "action1"
    let actionFileStr = ElementVisualTool.buildEmptyContributeFileStr()
    let result = ref(Obj.magic(1))

    _prepare(given, \"and")

    given(
      "prepare service",
      () => {
        ()
      },
    )

    \"and"(
      "prepare custom data",
      () => {
        customInputs :=
          list{CustomTool.buildCustomInput(~name=inputName, ~fileStr=inputFileStr, ())}
        customActions :=
          list{CustomTool.buildCustomAction(~name=actionName, ~fileStr=actionFileStr, ())}
      },
    )

    \"when"(
      "add generated custom to selected contributes",
      () => {
        result :=
          ElementAssembleTool.addGeneratedCustoms(
            ServiceTool.build(
              ~sandbox,
              ~generateContribute=Meta3d.Main.generateContribute->Obj.magic,
              ~loadContribute=Meta3d.Main.loadContribute->Obj.magic,
              (),
            ),
            selectedContributes,
            account,
            customInputs.contents,
            customActions.contents,
          )
      },
    )

    then(
      "selected contributes should has them",
      () => {
        result.contents->expect ==
          list{
            ContributeTool.generateContribute(
              ~name=inputName,
              ~version=FrontendUtils.ElementUtils.getElementContributeVersion(),
              ~account,
              ~displayName="",
              ~repoLink="",
              ~description="",
              ~protocolName=j`meta3d-input-custom-${inputName}-protocol`,
              ~protocolVersion=FrontendUtils.ElementUtils.getElementContributeProtocolVersion(),
              ~dependentPackageStoredInAppProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              ~fileStr=inputFileStr,
              (),
            )
            ->Meta3d.Main.loadContribute
            ->FrontendUtils.ElementUtils.buildContribute(
              ~id=inputName,
              ~version=FrontendUtils.ElementUtils.getElementContributeVersion(),
              ~data=_,
              (),
            ),
            ContributeTool.generateContribute(
              ~name=actionName,
              ~version=FrontendUtils.ElementUtils.getElementContributeVersion(),
              ~account,
              ~displayName="",
              ~repoLink="",
              ~description="",
              ~protocolName=j`meta3d-action-custom-${actionName}-protocol`,
              ~protocolVersion=FrontendUtils.ElementUtils.getElementContributeProtocolVersion(),
              ~dependentPackageStoredInAppProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              ~fileStr=actionFileStr,
              (),
            )
            ->Meta3d.Main.loadContribute
            ->FrontendUtils.ElementUtils.buildContribute(
              ~id=actionName,
              ~version=FrontendUtils.ElementUtils.getElementContributeVersion(),
              ~data=_,
              (),
            ),
          }
      },
    )
  })
})
