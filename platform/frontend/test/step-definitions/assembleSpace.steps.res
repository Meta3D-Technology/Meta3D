open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/assembleSpace.feature")

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

  test(."get imported element custom", ({given, \"when", \"and", then}) => {
    let e1 = ref(Obj.magic(1))
    let e2 = ref(Obj.magic(1))
    let customInput1 = CustomTool.buildCustomInput(~name="Input1", ~fileStr="f1", ())
    let customInput2 = customInput1
    let customInput3 = CustomTool.buildCustomInput(~name="Input3", ~fileStr="f3", ())
    let i1Name = "input1"
    let result = ref(Obj.magic(1))
    // let dispatchStub = ref(Obj.magic(1))

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
      "get imported all selected elements's custom",
      () => {
        result := AssembleSpaceTool.getImportedElementCustom(list{e1.contents, e2.contents})
      },
    )

    then(
      "get merged custom inputs as [custom input1, custom input3]",
      () => {
        result.contents->expect == ( list{customInput1, customInput3}, list{} )
      },
    )
  })

  test(."convert local to custom", ({given, \"when", \"and", then}) => {
    let localInput1 = ref(Obj.magic(1))
    let localInput1Name = "localInput1"
    let localInput1BundledSource = AssembleSpaceTool.buildLocalInputBundledSource(localInput1Name)
    let localInput2 = ref(Obj.magic(1))
    let localInput2Name = "localInput2"
    let customInput1 = ref(Obj.magic(1))
    let result = ref(Obj.magic(1))

    _prepare(given, \"and")

    given(
      "select local input1",
      () => {
        localInput1 :=
          AssembleSpaceTool.buildSelectedContribute(
            ~protocolName="-input-protocol",
            ~data=ContributeTool.buildContributeData(
              ~contributePackageData=ContributeTool.buildContributePackageData(),
              ~contributeFuncData=Meta3d.Main.getContributeFuncData(localInput1BundledSource),
              (),
            ),
            (),
          )
      },
    )

    \"and"(
      "select local input2",
      () => {
        localInput2 :=
          AssembleSpaceTool.buildSelectedContribute(
            ~protocolName="-input-protocol",
            ~data=ContributeTool.buildContributeData(
              ~contributePackageData=ContributeTool.buildContributePackageData(),
              ~contributeFuncData=Meta3d.Main.getContributeFuncData(
                AssembleSpaceTool.buildLocalInputBundledSource(localInput2Name),
              ),
              (),
            ),
            (),
          )
      },
    )

    \"and"(
      "build custom input1 whose name is duplicated with local input2",
      () => {
        customInput1 :=
          CustomTool.buildCustomInput(
            ~name=localInput2Name,
            ~fileStr=ElementVisualTool.buildEmptyContributeFileStr(),
            (),
          )
      },
    )

    \"when"(
      "convert local to custom",
      () => {
        result :=
          AssembleSpaceTool.convertLocalToCustom(
            ServiceTool.build(
              ~sandbox,
              ~getContributeFuncDataStr=Meta3d.Main.getContributeFuncDataStr->Obj.magic,
              (),
            ),
            (list{customInput1.contents}, list{}),
            list{localInput1.contents, localInput2.contents},
          )
      },
    )

    then(
      "selectedContributes should remove all local inputs",
      () => {
        result.contents->Meta3dCommonlib.Tuple2.getFirst->expect == list{}
      },
    )

    \"and"(
      "should add converted local input1 to custom inputs",
      () => {
        // (result.contents->Meta3dCommonlib.Tuple2.getLast -> Meta3dCommonlib.ListSt.nth(1)->Meta3dCommonlib.OptionSt.getExn).fileStr ->Meta3dCommonlib.Log.printStringForDebug-> ignore

        result.contents
        ->Meta3dCommonlib.Tuple2.getLast
        ->Meta3dCommonlib.Tuple2.getFirst
        // ->Meta3dCommonlib.Log.printStringForDebug
        ->CustomTool.formatCustomInputs
        ->expect ==
          list{
            customInput1.contents,
            CustomTool.buildCustomInput(
              ~name=localInput1Name,
              ~fileStr={
                j`window.Contribute = {
          getContribute: (api) => {
      
          return {
              inputName: "localInput1",
              func: (meta3dState) => {
                  return Promise.resolve(null)
              }
          }
      }}`
              },
              (),
            ),
          }->CustomTool.formatCustomInputs
      },
    )
  })
})
