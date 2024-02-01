open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/clone.feature")

defineFeature(feature, test => {
  let contribute: ref<
    Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
      StateType.state,
      Meta3dComponentScriptProtocol.Index.config,
      Meta3dComponentScriptProtocol.Index.needDisposedComponents,
      Meta3dComponentScriptProtocol.Index.batchDisposeData,
      Meta3dComponentScriptProtocol.Index.cloneConfig,
      Meta3dComponentScriptProtocol.Index.script,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))
  let cloneConfig = ()
  let clonedScripts = ref([])
  let script = ref(Obj.magic(1))

  let _getContributeAndCreateAState = ((\"when", \"and")) => {
    \"when"("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      state := StateTool.createState(~contribute=contribute.contents, ())
    })
  }

  let _setDefaultData = \"and" => {
    \"and"("set the script's default data", () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          script.contents,
          Meta3dComponentScriptProtocol.Index.dataName.attribute,
          0.1->Obj.magic,
        )
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          script.contents,
          Meta3dComponentScriptProtocol.Index.dataName.eventFileStr,
          {j`{}`}->Obj.magic,
        )
    })
  }

  test(."clone specific count of scripts", ({given, \"when", \"and", then}) => {
    _getContributeAndCreateAState((\"when", \"and"))

    given(
      "create a script",
      () => {
        let (s, t) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        script := t
      },
    )

    _setDefaultData(\"and")

    \"when"(
      "clone 2 scripts",
      () => {
        let (s, c) = contribute.contents.cloneComponentFunc(.
          state.contents,
          Meta3dCommonlib.CloneTool.buildCountRange(2),
          cloneConfig,
          script.contents,
        )

        state := s
        clonedScripts := c
      },
    )

    then(
      "get 2 cloned scripts",
      () => {
        clonedScripts.contents->Js.Array.length->expect == 2
      },
    )
  })

  test(."set cloned script's attribute by source script's attribute", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let n1 = 0.1

    _getContributeAndCreateAState((\"when", \"and"))

    given(
      "create a script",
      () => {
        let (s, t) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        script := t
      },
    )

    _setDefaultData(\"and")

    \"and"(
      "set the script's attribute to n1",
      () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            script.contents,
            Meta3dComponentScriptProtocol.Index.dataName.attribute,
            n1->Obj.magic,
          )
      },
    )

    \"when"(
      "clone 2 scripts",
      () => {
        let (s, c) = contribute.contents.cloneComponentFunc(.
          state.contents,
          Meta3dCommonlib.CloneTool.buildCountRange(2),
          cloneConfig,
          script.contents,
        )

        state := s
        clonedScripts := c
      },
    )

    then(
      "get 2 cloned scripts' attribute should return n1, n1",
      () => {
        (
          contribute.contents.getComponentDataFunc(.
            state.contents,
            clonedScripts.contents[0],
            Meta3dComponentScriptProtocol.Index.dataName.attribute,
          )->Meta3dCommonlib.NullableTool.getExn,
          contribute.contents.getComponentDataFunc(.
            state.contents,
            clonedScripts.contents[1],
            Meta3dComponentScriptProtocol.Index.dataName.attribute,
          )->Meta3dCommonlib.NullableTool.getExn,
        )->expect == (n1, n1)
      },
    )
  })
})
