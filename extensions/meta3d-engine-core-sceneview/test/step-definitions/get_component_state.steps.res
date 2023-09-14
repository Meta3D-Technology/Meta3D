open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/get_component_state.feature")

type state = {maxIndex: int}

defineFeature(feature, test => {
  let contribute = ref(Obj.magic(1))

  test(."get registerd component's state", ({given, \"when", \"and", then}) => {
    let componentName = "a1"
    let state = {
      maxIndex: 0,
    }->Obj.magic

    given("prepare register", () => {
      CreateState.createState()->StateContainer.setState
    })

    \"when"("register component contribute", () => {
      contribute :=
        ComponentTool.buildComponentContribute(
          ~componentName,
          ~createStateFunc=(. _) => state,
          ~createComponentFunc=(. state) => {
            let component = JsObjTool.getObjValue(state, "maxIndex")

            (
              {
                maxIndex: JsObjTool.getObjValue(state, "maxIndex")->succ,
              }->Obj.magic,
              component,
            )
          },
          (),
        )

      MainTool.registerComponent(contribute.contents)
    })

    \"and"("create and set component state", () => {
      MainTool.createAndSetComponentState(componentName, Obj.magic(1))
    })

    then("get registerd component's state should return the component state", () => {
      MainTool.getComponentState(componentName)->expect ==
        {
          "maxIndex": 0,
        }
    })
  })
})
