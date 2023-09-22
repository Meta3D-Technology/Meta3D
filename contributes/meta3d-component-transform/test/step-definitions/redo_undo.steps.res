open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/redo_undo.feature")

defineFeature(feature, test => {
  let contribute: ref<
    Meta3dEngineCoreSceneviewProtocol.ComponentContributeType.componentContribute<
      StateType.state,
      Meta3dComponentTransformProtocol.Index.config,
      Meta3dComponentTransformProtocol.Index.needDisposedComponents,
      Meta3dComponentTransformProtocol.Index.batchDisposeData,
      Meta3dComponentTransformProtocol.Index.cloneConfig,
      Meta3dComponentTransformProtocol.Index.transform,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))

  let _getContributeAndCreateAState = ((given, \"and")) => {
    given("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      state := StateTool.createState(~contribute=contribute.contents, ())
    })
  }
  test(."deep copy transform state", ({given, \"when", \"and", then}) => {
    let copiedState = ref(Obj.magic(1))
    let t1 = ref(Obj.magic(1))
    let t2 = ref(Obj.magic(1))
    let t3 = ref(Obj.magic(1))
    let t4 = ref(Obj.magic(1))
    let g1 = 10

    _getContributeAndCreateAState((given, \"and"))

    given(
      "create three transforms as t1, t2, t3",
      () => {
        let (s, t1_) = contribute.contents.createComponentFunc(. state.contents)
        let (s, t2_) = contribute.contents.createComponentFunc(. s)
        let (s, t3_) = contribute.contents.createComponentFunc(. s)

        state := s
        t1 := t1_
        t2 := t2_
        t3 := t3_
      },
    )

    \"and"(
      "create a gameObject as g1",
      () => {
        ()
      },
    )

    \"and"(
      "add t3 to g1",
      () => {
        state := contribute.contents.addComponentFunc(. state.contents, g1, t3.contents)
      },
    )

    \"and"(
      "set t2's parent to t1",
      () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            t2.contents,
            Meta3dComponentTransformProtocol.Index.dataName.parent,
            t1.contents->Js.Nullable.return->Obj.magic,
          )
      },
    )

    \"when"(
      "deep copy transform state as s2",
      () => {
        copiedState := contribute.contents.deepCopy(. state.contents)
      },
    )

    \"and"(
      "create transform with s2 as t4",
      () => {
        let (s, t4_) = contribute.contents.createComponentFunc(. copiedState.contents)

        copiedState := s
        t4 := t4_
      },
    )

    \"and"(
      "set t4's parent to t1 with s2",
      () => {
        copiedState :=
          contribute.contents.setComponentDataFunc(.
            copiedState.contents,
            t2.contents,
            Meta3dComponentTransformProtocol.Index.dataName.parent,
            t1.contents->Js.Nullable.return->Obj.magic,
          )
      },
    )

    \"and"(
      "defer dispose t3 from g1 with s2",
      () => {
        copiedState := contribute.contents.deferDisposeComponentFunc(. copiedState.contents, (t3.contents, g1))
      },
    )

    then("get t1's children with state should return [t2]", () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          t1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.children,
        )
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == [t2.contents]
    })

    \"and"("getNeedDisposedComponents with state should return []", () => {
        contribute.contents.getNeedDisposedComponentsFunc(.
          state.contents
        )
        ->expect == []
    })
  })


  test(."restore transform state", ({given, \"when", \"and", then}) => {
    let copiedState = ref(Obj.magic(1))
    let targetState = ref(Obj.magic(1))
    let t1 = ref(Obj.magic(1))
    let t2 = ref(Obj.magic(1))
    let oldPos = [1., 2., 3.]
    let newPos = [3., 2., 3.]

    _getContributeAndCreateAState((given, \"and"))

    given(
      "create three transforms as t1",
      () => {
        let (s, t1_) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        t1 := t1_
      },
    )

    \"and"(
      "set t1's position as old value",
      () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            t1.contents,
            Meta3dComponentTransformProtocol.Index.dataName.localPosition,
            oldPos -> Obj.magic
          )
      },
    )

    \"and"(
      "deep copy transform state as s2",
      () => {
        copiedState := contribute.contents.deepCopy(. state.contents)
      },
    )

    \"and"(
      "create transform with s2 as t2",
      () => {
        let (s, t2_) = contribute.contents.createComponentFunc(. copiedState.contents)

        copiedState := s
        t2:=t2_
      },
    )

    \"and"(
      "set t2's local position with s2",
      () => {
        copiedState :=
          contribute.contents.setComponentDataFunc(.
            copiedState.contents,
            t2.contents,
            Meta3dComponentTransformProtocol.Index.dataName.localPosition,
            [10.,11.,12.] -> Obj.magic
          )
      },
    )

    \"and"(
      "set t1's local position with s2 as new value",
      () => {
        copiedState :=
          contribute.contents.setComponentDataFunc(.
            copiedState.contents,
            t1.contents,
            Meta3dComponentTransformProtocol.Index.dataName.localPosition,
            newPos -> Obj.magic
          )
      },
    )

    \"when"(
      "restore current state(s2) to target state(state)",
      () => {
        targetState := contribute.contents.restore(. copiedState.contents, state.contents)
      },
    )

    then("get t1's local position with target state should return old value", () => {
        contribute.contents.getComponentDataFunc(.
          targetState.contents,
          t1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
        )
        ->expect == oldPos
    })
  })
})
