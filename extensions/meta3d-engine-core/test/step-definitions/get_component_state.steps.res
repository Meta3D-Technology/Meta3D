open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/get_component_state.feature")

type state = {maxIndex: int}

defineFeature(feature, test => {
  let contribute = ref(Obj.magic(1))

  let _buildComponentContribute = (
    ~componentName="componentA",
    ~createStateFunc=(. config) => Obj.magic(1),
    ~getGameObjectsFunc=(. state, _) => Obj.magic(1),
    ~createComponentFunc=(. state) => (state, Obj.magic(1)),
    ~addComponentFunc=(. state, _, _) => state,
    ~hasComponentFunc=(. state, _) => false,
    ~getComponentFunc=(. state, _) => Obj.magic(1),
    ~getAllComponentsFunc=(. state) => Obj.magic(1),
    ~getComponentDataFunc=(. state, _, _) => Obj.magic(1),
    ~setComponentDataFunc=(. state, _, _, _) => state,
    (),
  ): Meta3dEngineCoreProtocol.RegisterComponentType.componentContribute => {
    componentName: componentName,
    createStateFunc: createStateFunc,
    getGameObjectsFunc: getGameObjectsFunc,
    createComponentFunc: createComponentFunc,
    addComponentFunc: addComponentFunc,
    hasComponentFunc: hasComponentFunc,
    getComponentFunc: getComponentFunc,
    getAllComponentsFunc: getAllComponentsFunc,
    getComponentDataFunc: getComponentDataFunc,
    setComponentDataFunc: setComponentDataFunc,
  }

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
        _buildComponentContribute(
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
