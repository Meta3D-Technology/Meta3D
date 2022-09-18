open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/dispatch.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))
  let state: ref<Meta3dUiProtocol.StateType.state> = ref(Obj.magic(1))

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

    \"and"(
      %re("/^register element(\d+) whose elementState(\d+) has data(\d+) = (\d+)$/")->Obj.magic,
      () => {
        let arguments =
          %external(arguments)->Meta3dCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

        elementState1 :=
          {
            "data1": arguments[3],
          }

        state :=
          MainTool.registerElement(
            ~sandbox,
            ~state=state.contents,
            ~elementName=elementName1,
            ~elementFunc=Obj.magic(1),
            ~elementState=elementState1.contents->Obj.magic,
            (),
          )
      },
    )

    \"and"("combine reducer1", () => {
      state :=
        MainTool.combineReducer(
          state.contents,
          (
            elementName1,
            (elementState, action) => {
              let elementState = elementState->Obj.magic
              let action = action->Obj.magic

              switch action["type"] {
              | "Set" =>
                elementState
                ->Meta3dCommonlib.ImmutableHashMap.set("data1", action["value"])
                ->Obj.magic
              | _ => elementState
              }
            },
          ),
        )
    })

    \"when"(%re("/^dispatch action to set data(\d+) to (\d+)$/")->Obj.magic, () => {
      let arguments =
        %external(arguments)->Meta3dCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      state :=
        MainTool.dispatch(
          state.contents,
          {
            "type": "Set",
            "value": arguments[1],
          }->Obj.magic,
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
    let originData1 = ref(Obj.magic(1))

    _prepare(given, \"and")

    \"and"(
      %re("/^register element(\d+) whose elementState(\d+) has data(\d+) = (\d+)$/")->Obj.magic,
      () => {
        let arguments =
          %external(arguments)->Meta3dCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

        originData1 := arguments[3]

        elementState1 :=
          {
            "data1": arguments[3],
          }

        state :=
          MainTool.registerElement(
            ~sandbox,
            ~state=state.contents,
            ~elementName=elementName1,
            ~elementFunc=Obj.magic(1),
            ~elementState=elementState1.contents->Obj.magic,
            (),
          )
      },
    )

    \"and"("combine reducer1", () => {
      state :=
        MainTool.combineReducer(
          state.contents,
          (
            elementName1,
            (elementState, action) => {
              let elementState = elementState->Obj.magic
              let action = action->Obj.magic

              switch action["type"] {
              | "Set" =>
                elementState
                ->Meta3dCommonlib.ImmutableHashMap.set("data1", action["value"])
                ->Obj.magic
              | _ => elementState
              }
            },
          ),
        )
    })

    \"when"(%re("/^dispatch action to set data(\d+) to (\d+)$/")->Obj.magic, () => {
      let arguments =
        %external(arguments)->Meta3dCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      state :=
        MainTool.dispatch(
          state.contents,
          {
            "type": "Set",
            "value": arguments[1],
          }->Obj.magic,
        )
    })

    then("mark state not change", () => {
      MainTool.isStateChange(state.contents, elementName1)->expect == false
    })

    \"and"("data1 should not change", () => {
      (MainTool.getElementState(state.contents, elementName1)->Obj.magic)["data1"]->expect ==
        originData1.contents
    })
  })
})
