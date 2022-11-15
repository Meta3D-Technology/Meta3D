open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/dispatch.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))
  let state: ref<Meta3dUi2Protocol.StateType.state> = ref(Obj.magic(1))

  let _prepare = (given, \"and") => {
    given("prepare sandbox", () => {
      sandbox := createSandbox()
    })

    \"and"("create state", () => {
      state := MainTool.createState()
    })
  }

  test(."if element state change, update data", ({given, \"and", \"when", then}) => {
    let elementName1 = "e1"
    let elementState1 = ref(Obj.magic(1))

    _prepare(given, \"and")

    given("register element1 with reducer1 and elementState1 whose data1 = 1", () => {
      elementState1 :=
        {
          "data1": 1,
        }

      state :=
        MainTool.registerElement(
          ~sandbox,
          ~state=state.contents,
          ~elementName=elementName1,
          ~elementFunc=Obj.magic(1),
          ~elementState=elementState1.contents->Obj.magic,
          ~reducers=ReducerTool.buildReducers(
            ~role="role1",
            ~handlers=[
              {
                actionName: "action1",
                updatedElementStateFieldName: "data1",
              },
            ],
            (),
          )->Meta3dCommonlib.NullableSt.return,
          (),
        )
    })

    \"when"(%re("/^dispatch action to set data(\d+) to (\d+)$/")->Obj.magic, () => {
      let arguments =
        %external(arguments)->Meta3dCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      state :=
        MainTool.dispatch(
          state.contents,
          // {
          //   "type": "Set",
          //   "value": arguments[1],
          // }->Obj.magic,
          "action1",
          "role1",
          v => 10,
        )
    })

    then("mark state change", () => {
      MainTool.isStateChange(state.contents, elementName1)->expect == true
    })

    \"and"(%re("/^data(\d+) should be (\d+)$/")->Obj.magic, () => {
      let arguments =
        %external(arguments)->Meta3dCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      (MainTool.getElementState(state.contents, elementName1)->Obj.magic)["data1"]->expect ==
        arguments[1]
    })
  })

  test(."else, not update data", ({given, \"and", \"when", then}) => {
    let elementName1 = "e1"
    let elementState1 = ref(Obj.magic(1))

    _prepare(given, \"and")

    given("register element1 with reducer1 and elementState1 whose data1 = 10", () => {
      elementState1 :=
        {
          "data1": 10,
        }

      state :=
        MainTool.registerElement(
          ~sandbox,
          ~state=state.contents,
          ~elementName=elementName1,
          ~elementFunc=Obj.magic(1),
          ~elementState=elementState1.contents->Obj.magic,
          ~reducers=ReducerTool.buildReducers(
            ~role="role1",
            ~handlers=[
              {
                actionName: "action1",
                updatedElementStateFieldName: "data1",
              },
            ],
            (),
          )->Meta3dCommonlib.NullableSt.return,
          (),
        )
    })

    \"when"(%re("/^dispatch action to set data(\d+) to (\d+)$/")->Obj.magic, () => {
      let arguments =
        %external(arguments)->Meta3dCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      state := MainTool.dispatch(state.contents, "action1", "role1", v => 10)
    })

    then("mark state not change", () => {
      MainTool.isStateChange(state.contents, elementName1)->expect == false
    })

    \"and"("data1 should not change", () => {
      (MainTool.getElementState(state.contents, elementName1)->Obj.magic)["data1"]->expect == 10
    })
  })
})
