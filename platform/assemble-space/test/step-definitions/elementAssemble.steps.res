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
        customInputs := list{CustomTool.buildCustomInput(~name=inputName, ~fileStr=inputFileStr, ())}
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
              ~protocolName=j`${inputName}-protocol`,
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
              ~protocolName=j`${actionName}-protocol`,
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
