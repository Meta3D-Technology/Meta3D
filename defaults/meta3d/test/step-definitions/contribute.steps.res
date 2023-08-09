open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/contribute.feature")

let _buildAction = actionName =>
  {
    "actionName": actionName,
    "handler": Obj.magic(1),
  }

defineFeature(feature, test => {
  test(."get all contributes by type", ({given, \"when", \"and", then}) => {
    let state = ref(Obj.magic(1))

    given(
      "register action, component, element, ui control, skin, gameObject, pipeline contributes",
      () => {
        state := StateTool.create()

        state :=
          Main.registerContribute(
            state.contents,
            "a1-protocol",
            ContributeTool.buildGetContributeFunc(_buildAction("a1"))->Obj.magic,
          )
        state :=
          Main.registerContribute(
            state.contents,
            "a1-protocol",
            ContributeTool.buildGetContributeFunc(_buildAction("a2"))->Obj.magic,
          )
        state :=
          Main.registerContribute(
            state.contents,
            "c1",
            ContributeTool.buildGetContributeFunc({
              "componentName": "c1",
              "createComponentFunc": Obj.magic(1),
            })->Obj.magic,
          )
        state :=
          Main.registerContribute(
            state.contents,
            "e1",
            ContributeTool.buildGetContributeFunc({
              "elementName": "e1",
              "execOrder": 0,
            })->Obj.magic,
          )
        state :=
          Main.registerContribute(
            state.contents,
            "g1",
            ContributeTool.buildGetContributeFunc({
              "createGameObjectFunc": Obj.magic(1),
              "getAllGameObjectsFunc": Obj.magic(1),
            })->Obj.magic,
          )
        state :=
          Main.registerContribute(
            state.contents,
            "u1",
            ContributeTool.buildGetContributeFunc({
              "uiControlName": "u1",
              "func": Obj.magic(1),
            })->Obj.magic,
          )
        state :=
          Main.registerContribute(
            state.contents,
            "s1",
            ContributeTool.buildGetContributeFunc({
              "skinName": "s1",
              "skin": Obj.magic(1),
            })->Obj.magic,
          )
        state :=
          Main.registerContribute(
            state.contents,
            "w1",
            ContributeTool.buildGetContributeFunc({
              "pipelineName": "w1",
              "allPipelineData": Obj.magic(1),
            })->Obj.magic,
          )
      },
    )

    \"when"(
      "get all contributes by each type by api",
      () => {
        ()
      },
    )

    then(
      "get them",
      () => {
        (
          APITool.buildAPI().getAllContributesByType(.
            state.contents,
            Meta3dType.ContributeType.Action,
          )
          ->Obj.magic
          ->Js.Json.stringify,
          APITool.buildAPI().getAllContributesByType(.
            state.contents,
            Meta3dType.ContributeType.Component,
          )
          ->Obj.magic
          ->Js.Json.stringify,
          APITool.buildAPI().getAllContributesByType(.
            state.contents,
            Meta3dType.ContributeType.Element,
          )
          ->Obj.magic
          ->Js.Json.stringify,
          APITool.buildAPI().getAllContributesByType(.
            state.contents,
            Meta3dType.ContributeType.GameObject,
          )
          ->Obj.magic
          ->Js.Json.stringify,
          APITool.buildAPI().getAllContributesByType(.
            state.contents,
            Meta3dType.ContributeType.UIControl,
          )
          ->Obj.magic
          ->Js.Json.stringify,
          APITool.buildAPI().getAllContributesByType(.
            state.contents,
            Meta3dType.ContributeType.Skin,
          )
          ->Obj.magic
          ->Js.Json.stringify,
          APITool.buildAPI().getAllContributesByType(.
            state.contents,
            Meta3dType.ContributeType.Pipeline,
          )
          ->Obj.magic
          ->Js.Json.stringify,
        )->expect ==
          (
            "[{\"actionName\":\"a1\",\"handler\":1},{\"actionName\":\"a2\",\"handler\":1}]",
            "[{\"componentName\":\"c1\",\"createComponentFunc\":1}]",
            "[{\"elementName\":\"e1\",\"execOrder\":0}]",
            "[{\"createGameObjectFunc\":1,\"getAllGameObjectsFunc\":1}]",
            "[{\"uiControlName\":\"u1\",\"func\":1}]",
            "[{\"skinName\":\"s1\",\"skin\":1}]",
            "[{\"pipelineName\":\"w1\",\"allPipelineData\":1}]",
          )
      },
    )
  })

  test(."register contribute with unknown type", ({given, \"when", \"and", then}) => {
    let state = ref(Obj.magic(1))

    \"when"(
      "register unknown type contribute",
      () => {
        state := StateTool.create()

        state :=
          Main.registerContribute(
            state.contents,
            "a1",
            ContributeTool.buildGetContributeFunc({
              "a1": "a1",
            })->Obj.magic,
          )
      },
    )

    \"and"(
      "get all contributes by action type by api",
      () => {
        ()
      },
    )

    then(
      "get empty",
      () => {
        APITool.buildAPI().getAllContributesByType(.
          state.contents,
          Meta3dType.ContributeType.Action,
        )
        ->Obj.magic
        ->Js.Json.stringify
        ->expect == "[]"
      },
    )
  })

  test(."register contribute which is not action and already registered before", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let state = ref(Obj.magic(1))
    let protocolName = "p1"

    given(
      "register contribute of protocol name p1",
      () => {
        state := StateTool.create()

        state :=
          Main.registerContribute(
            state.contents,
            protocolName,
            ContributeTool.buildGetContributeFunc(1)->Obj.magic,
          )
      },
    )

    \"when"(
      "register contribute of protocol name p1",
      () => {
        ()
      },
    )

    then(
      "error",
      () => {
        expect(
          () => {
            state :=
              Main.registerContribute(
                state.contents,
                protocolName,
                ContributeTool.buildGetContributeFunc(1)->Obj.magic,
              )
          },
        )->toThrowMessage({
          j`already register extension or contribute of protocol: ${protocolName}`
        })
      },
    )
  })

  test(."register contribute which is action and already registered before", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let state = ref(Obj.magic(1))
    let protocolName = "p1"

    given(
      "register action a1 of protocol name p1",
      () => {
        state := StateTool.create()

        state :=
          Main.registerContribute(
            state.contents,
            protocolName,
            ContributeTool.buildGetContributeFunc(_buildAction("a1"))->Obj.magic,
          )
      },
    )

    \"when"(
      "register action a2 of protocol name p1",
      () => {
        ()
      },
    )

    then(
      "not error",
      () => {
        expect(
          () => {
            state :=
              Main.registerContribute(
                state.contents,
                protocolName,
                ContributeTool.buildGetContributeFunc(_buildAction("a2"))->Obj.magic,
              )
          },
        )->toNotThrow
      },
    )
  })
})
