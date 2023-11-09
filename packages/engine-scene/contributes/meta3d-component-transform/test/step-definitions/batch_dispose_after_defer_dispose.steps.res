open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/batch_dispose_after_defer_dispose.feature")

defineFeature(feature, test => {
  let contribute: ref<
    Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
      StateType.state,
      Meta3dComponentTransformProtocol.Index.config,
      Meta3dComponentTransformProtocol.Index.needDisposedComponents,
      Meta3dComponentTransformProtocol.Index.batchDisposeData,
      Meta3dComponentTransformProtocol.Index.cloneConfig,
      Meta3dComponentTransformProtocol.Index.transform,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))
  let transform1 = ref(Obj.magic(1))
  let transform2 = ref(Obj.magic(2))

  let _getContributeAndCreateAState = ((given, \"and")) => {
    given("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      state := StateTool.createState(~contribute=contribute.contents, ())
    })
  }

  test(."disposed transform shouldn\'t affect other alive ones\' data", ({
    given,
    \"and",
    \"when",
    then,
  }) => {
    let pos1 = [1., 2., 3.]
    let pos2 = [5., 10., 30.]

    _getContributeAndCreateAState((given, \"and"))

    given(
      %re("/^create two transforms as transform(\d+), transform(\d+)$/")->Obj.magic,
      () => {
        let (s, t1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, t2) = contribute.contents.createComponentFunc(. s)

        state := s
        transform1 := t1
        transform2 := t2
      },
    )

    \"and"(
      %re("/^set transform(\d+)'s local position to pos(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            transform1.contents,
            Meta3dComponentTransformProtocol.Index.dataName.localPosition,
            pos1->Obj.magic,
          )
      },
    )

    \"and"(
      %re("/^set transform(\d+)'s local position to pos(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            transform2.contents,
            Meta3dComponentTransformProtocol.Index.dataName.localPosition,
            pos2->Obj.magic,
          )
      },
    )

    \"and"(
      %re("/^defer dispose transform(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            transform1.contents->Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData,
          )
      },
    )

    \"when"(
      %re("/^dispose transform(\d+)$/")->Obj.magic,
      () => {
        let (state_, _) = contribute.contents.disposeComponentsFunc(.
          state.contents,
          [transform1.contents],
        )
        state := state_
      },
    )

    then(
      %re("/^get transform(\d+)'s local position should return pos(\d+)$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          transform2.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
        )
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == pos2
      },
    )
  })

  test(."get all transforms should exclude defer disposed and disposed transforms", ({
    given,
    \"and",
    \"when",
    then,
  }) => {
    _getContributeAndCreateAState((given, \"and"))

    given(
      %re("/^create two transforms as transform(\d+), transform(\d+)$/")->Obj.magic,
      () => {
        let (s, t1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, t2) = contribute.contents.createComponentFunc(. s)

        state := s
        transform1 := t1
        transform2 := t2
      },
    )

    \"and"(
      %re("/^defer dispose transform(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            transform1.contents->Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData,
          )
      },
    )

    \"and"(
      %re("/^defer dispose transform(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            transform2.contents->Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData,
          )
      },
    )

    \"when"(
      %re("/^dispose transform(\d+)$/")->Obj.magic,
      () => {
        let (state_, _) = contribute.contents.disposeComponentsFunc(.
          state.contents,
          [transform1.contents],
        )
        state := state_
      },
    )

    then(
      "get all transforms should return []",
      () => {
        contribute.contents.getAllComponentsFunc(. state.contents)->expect == []
      },
    )
  })

  let _prepareTransform = ((given, \"and")) => {
    given("create two transforms as transform1, transform2", () => {
      let (s, t1) = contribute.contents.createComponentFunc(. state.contents)
      let (s, t2) = contribute.contents.createComponentFunc(. s)

      state := s
      transform1 := t1
      transform2 := t2
    })

    \"and"("set transform2's parent to transform1", () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          transform2.contents,
          Meta3dComponentTransformProtocol.Index.dataName.parent,
          transform1.contents->Js.Nullable.return->Obj.magic,
        )
    })
  }

  test(."should remove it from childrenMap", ({\"when", \"and", given, then}) => {
    let pos1 = [1., 2., 3.]
    let pos2 = [5., 10., 30.]

    _getContributeAndCreateAState((given, \"and"))

    _prepareTransform((given, \"and"))

    \"and"(
      %re("/^defer dispose transform(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            transform2.contents->Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData,
          )
      },
    )

    \"when"(
      %re("/^dispose transform(\d+)$/")->Obj.magic,
      () => {
        let (state_, _) = contribute.contents.disposeComponentsFunc(.
          state.contents,
          [transform2.contents],
        )
        state := state_
      },
    )

    then(
      %re("/^get transform(\d+)'s children should return \[\]$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          transform1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.children,
        )
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == []
      },
    )
  })

  test(."shouldn\'t affect parent if disposed one has no parent", ({
    \"when",
    \"and",
    given,
    then,
  }) => {
    let pos1 = [1., 2., 3.]
    let pos2 = [5., 10., 30.]

    _getContributeAndCreateAState((given, \"and"))

    _prepareTransform((given, \"and"))

    given(
      %re("/^set transform(\d+)'s local position to pos(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            transform1.contents,
            Meta3dComponentTransformProtocol.Index.dataName.localPosition,
            pos1->Obj.magic,
          )
      },
    )

    \"and"(
      %re("/^set transform(\d+)'s local position to pos(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            transform2.contents,
            Meta3dComponentTransformProtocol.Index.dataName.localPosition,
            pos2->Obj.magic,
          )
      },
    )

    \"and"(
      %re("/^defer dispose transform(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            transform1.contents->Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData,
          )
      },
    )

    \"when"(
      %re("/^dispose transform(\d+)$/")->Obj.magic,
      () => {
        let (state_, _) = contribute.contents.disposeComponentsFunc(.
          state.contents,
          [transform1.contents],
        )
        state := state_
      },
    )

    then(
      %re("/^get transform(\d+)'s position should return pos(\d+)$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          transform2.contents,
          Meta3dComponentTransformProtocol.Index.dataName.position,
        )
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == pos2
      },
    )
  })

  test(."shouldn\'t affect parent if disposed one has parent", ({\"when", \"and", given, then}) => {
    let transform3 = ref(Obj.magic(3))
    let pos1 = [1., 2., 3.]
    let pos2 = [5., 10., 30.]
    let pos3 = [2., 4., 6.]

    _getContributeAndCreateAState((given, \"and"))

    _prepareTransform((given, \"and"))

    given(
      %re("/^create a transform as transform(\d+)$/")->Obj.magic,
      () => {
        let (s, t) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        transform3 := t
      },
    )

    \"and"(
      %re("/^set transform(\d+)'s parent to transform(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            transform1.contents,
            Meta3dComponentTransformProtocol.Index.dataName.parent,
            transform3.contents->Js.Nullable.return->Obj.magic,
          )
      },
    )

    \"and"(
      %re("/^set transform(\d+)'s local position to pos(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            transform1.contents,
            Meta3dComponentTransformProtocol.Index.dataName.localPosition,
            pos1->Obj.magic,
          )
      },
    )

    \"and"(
      %re("/^set transform(\d+)'s local position to pos(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            transform2.contents,
            Meta3dComponentTransformProtocol.Index.dataName.localPosition,
            pos2->Obj.magic,
          )
      },
    )

    \"and"(
      %re("/^set transform(\d+)'s local position to pos(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            transform3.contents,
            Meta3dComponentTransformProtocol.Index.dataName.localPosition,
            pos3->Obj.magic,
          )
      },
    )

    \"and"(
      %re("/^defer dispose transform(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            transform2.contents->Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData,
          )
      },
    )

    \"when"(
      %re("/^dispose transform(\d+)$/")->Obj.magic,
      () => {
        let (state_, _) = contribute.contents.disposeComponentsFunc(.
          state.contents,
          [transform2.contents],
        )
        state := state_
      },
    )

    then(
      %re("/^get transform1's position should return pos1 \+ pos3$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          transform1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.position,
        )
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == PositionTool.addPosition(pos1, pos3)
      },
    )

    \"and"(
      %re("/^get transform3's position should return pos3$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          transform3.contents,
          Meta3dComponentTransformProtocol.Index.dataName.position,
        )
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == pos3
      },
    )
  })

  test(."should remove it from parentMap", ({\"when", \"and", given, then}) => {
    let pos1 = [1., 2., 3.]

    _getContributeAndCreateAState((given, \"and"))

    _prepareTransform((given, \"and"))

    given(
      %re("/^set transform(\d+)'s local position to pos(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            transform1.contents,
            Meta3dComponentTransformProtocol.Index.dataName.localPosition,
            pos1->Obj.magic,
          )
      },
    )

    \"and"(
      %re("/^defer dispose transform(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            transform1.contents->Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData,
          )
      },
    )

    \"when"(
      %re("/^dispose transform(\d+)$/")->Obj.magic,
      () => {
        let (state_, _) = contribute.contents.disposeComponentsFunc(.
          state.contents,
          [transform1.contents],
        )
        state := state_
      },
    )

    then(
      %re("/^get transform(\d+)'s parent should return empty$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          transform2.contents,
          Meta3dComponentTransformProtocol.Index.dataName.parent,
        )->expect == Js.Nullable.null
      },
    )
  })

  test(."should affect children", ({\"when", \"and", given, then}) => {
    let transform3 = ref(Obj.magic(3))
    let pos1 = [1., 2., 3.]
    let pos2 = [5., 10., 30.]
    let pos3 = [2., 4., 6.]

    _getContributeAndCreateAState((given, \"and"))

    _prepareTransform((given, \"and"))

    given(
      %re("/^create a transform as transform(\d+)$/")->Obj.magic,
      () => {
        let (s, t) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        transform3 := t
      },
    )

    \"and"(
      %re("/^set transform(\d+)'s parent to transform(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            transform1.contents,
            Meta3dComponentTransformProtocol.Index.dataName.parent,
            transform3.contents->Js.Nullable.return->Obj.magic,
          )
      },
    )

    \"and"(
      %re("/^set transform(\d+)'s local position to pos(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            transform1.contents,
            Meta3dComponentTransformProtocol.Index.dataName.localPosition,
            pos1->Obj.magic,
          )
      },
    )

    \"and"(
      %re("/^set transform(\d+)'s local position to pos(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            transform2.contents,
            Meta3dComponentTransformProtocol.Index.dataName.localPosition,
            pos2->Obj.magic,
          )
      },
    )

    \"and"(
      %re("/^set transform(\d+)'s local position to pos(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            transform3.contents,
            Meta3dComponentTransformProtocol.Index.dataName.localPosition,
            pos3->Obj.magic,
          )
      },
    )

    \"and"(
      %re("/^defer dispose transform(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            transform3.contents->Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData,
          )
      },
    )

    \"when"(
      %re("/^dispose transform(\d+)$/")->Obj.magic,
      () => {
        let (state_, _) = contribute.contents.disposeComponentsFunc(.
          state.contents,
          [transform3.contents],
        )
        state := state_
      },
    )

    then(
      %re("/^get transform1's position should return pos1$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          transform1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.position,
        )
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == pos1
      },
    )

    \"and"(
      %re("/^get transform2's position should return pos1 \+ pos2$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          transform2.contents,
          Meta3dComponentTransformProtocol.Index.dataName.position,
        )
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == PositionTool.addPosition(pos1, pos2)
      },
    )
  })

  test(."remove from parentMap, childMap, dirtyMap", ({given, \"and", \"when", then}) => {
    let transform3 = ref(Obj.magic(3))
    let pos1 = [1., 2., 3.]
    let pos2 = [5., 10., 30.]
    let pos3 = [2., 4., 6.]

    _getContributeAndCreateAState((given, \"and"))

    \"and"(
      %re(
        "/^create three transforms as transform(\d+), transform(\d+), transform(\d+)$/"
      )->Obj.magic,
      () => {
        let (s, t1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, t2) = contribute.contents.createComponentFunc(. s)
        let (s, t3) = contribute.contents.createComponentFunc(. s)

        state := s
        transform1 := t1
        transform2 := t2
        transform3 := t3
      },
    )

    \"and"(
      %re("/^set transform(\d+)'s parent to transform(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            transform1.contents,
            Meta3dComponentTransformProtocol.Index.dataName.parent,
            transform2.contents->Js.Nullable.return->Obj.magic,
          )
      },
    )

    \"and"(
      %re("/^set transform(\d+)'s parent to transform(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            transform3.contents,
            Meta3dComponentTransformProtocol.Index.dataName.parent,
            transform1.contents->Js.Nullable.return->Obj.magic,
          )
      },
    )

    \"and"(
      %re("/^defer dispose transform(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            transform1.contents->Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData,
          )
      },
    )

    \"when"(
      %re("/^dispose transform(\d+)$/")->Obj.magic,
      () => {
        let (state_, _) = contribute.contents.disposeComponentsFunc(.
          state.contents,
          [transform1.contents],
        )
        state := state_
      },
    )

    then(
      "should remove transform1 from parentMap, childrenMap, dirtyMap",
      () => {
        let {parentMap, childrenMap, dirtyMap} = state.contents

        (
          parentMap->Meta3dCommonlib.MutableSparseMap.has(transform1.contents),
          childrenMap->Meta3dCommonlib.MutableSparseMap.has(transform1.contents),
          dirtyMap->Meta3dCommonlib.MutableSparseMap.has(transform1.contents),
        )->expect == (false, false, false)
      },
    )
  })

  test(."remove from gameObjectMap, gameObjectTransformMap", ({given, \"and", \"when", then}) => {
    let gameObject1 = 10
    let transform1 = ref(Obj.magic(1))
    let d1 = [0.5, 1.0, 1.0]

    _getContributeAndCreateAState((given, \"and"))

    given(
      "create a gameObject",
      () => {
        ()
      },
    )

    \"and"(
      "create a transform",
      () => {
        let (s, m) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        transform1 := m
      },
    )

    \"and"(
      "add the transform to the gameObject",
      () => {
        state :=
          contribute.contents.addComponentFunc(. state.contents, gameObject1, transform1.contents)
      },
    )

    \"and"(
      "defer dispose the transform from the gameObject",
      () => {
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            (transform1.contents, gameObject1),
          )
      },
    )

    \"when"(
      "dispose the transform",
      () => {
        let (state_, _) = contribute.contents.disposeComponentsFunc(.
          state.contents,
          [transform1.contents],
        )
        state := state_
      },
    )

    then(
      "get the transform's gameObjects should return []",
      () => {
        contribute.contents.getGameObjectsFunc(. state.contents, transform1.contents)->expect == []
      },
    )

    \"and"(
      "get the gameObject's transform should return empty",
      () => {
        contribute.contents.getComponentFunc(. state.contents, gameObject1)->expect ==
          Js.Nullable.null
      },
    )
  })

  test(."reset removed one\'s value in localToWorldMatrices", ({given, \"and", \"when", then}) => {
    let mat1 = [2., 0., 0., 0., 0., 1., 0., 0., 0., 0., 1., 0., 0., 0., 0., 1.]
    let mat2 = [20., 0., 0., 0., 0., 1., 0., 0., 0., 0., 1., 0., 0., 0., 0., 1.]

    _getContributeAndCreateAState((given, \"and"))

    given(
      %re("/^create two transforms as transform(\d+), transform(\d+)$/")->Obj.magic,
      () => {
        let (s, t1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, t2) = contribute.contents.createComponentFunc(. s)

        state := s
        transform1 := t1
        transform2 := t2
      },
    )

    \"and"(
      %re("/^set transform(\d+)'s localToWorld matrix to mat(\d+)$/")->Obj.magic,
      () => {
        state :=
          TypeArrayTool.setLocalToWorldMatrix(state.contents, transform1.contents, mat1->Obj.magic)
      },
    )

    \"and"(
      %re("/^set transform(\d+)'s localToWorld matrix to mat(\d+)$/")->Obj.magic,
      () => {
        state :=
          TypeArrayTool.setLocalToWorldMatrix(state.contents, transform2.contents, mat2->Obj.magic)
      },
    )

    \"and"(
      %re("/^defer dispose transform(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            transform1.contents->Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData,
          )
      },
    )

    \"when"(
      %re("/^dispose transform(\d+)$/")->Obj.magic,
      () => {
        let (state_, _) = contribute.contents.disposeComponentsFunc(.
          state.contents,
          [transform1.contents],
        )
        state := state_
      },
    )

    then(
      %re("/^get transform(\d+)'s localToWorld matrix should return default data$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          transform1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localToWorldMatrix,
        )
        ->Meta3dCommonlib.NullableTool.getExn
        ->Obj.magic
        ->TypeArrayTool.changeTypeArrayToTuple
        ->expect == TypeArrayTool.getDefaultLocalToWorldMatrix(state.contents)
      },
    )

    \"and"(
      %re("/^get transform(\d+)'s localToWorld matrix should return mat(\d+)$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          transform2.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localToWorldMatrix,
        )
        ->Meta3dCommonlib.NullableTool.getExn
        ->Obj.magic
        ->TypeArrayTool.changeTypeArrayToTuple
        ->expect == mat2
      },
    )
  })

  test(."reset removed one\'s value in localPositions", ({given, \"and", \"when", then}) => {
    let pos1 = [1., 2., 3.]
    let pos2 = [5., 10., 30.]

    _getContributeAndCreateAState((given, \"and"))

    given(
      %re("/^create two transforms as transform(\d+), transform(\d+)$/")->Obj.magic,
      () => {
        let (s, t1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, t2) = contribute.contents.createComponentFunc(. s)

        state := s
        transform1 := t1
        transform2 := t2
      },
    )

    \"and"(
      %re("/^set transform(\d+)'s local position to pos(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            transform1.contents,
            Meta3dComponentTransformProtocol.Index.dataName.localPosition,
            pos1->Obj.magic,
          )
      },
    )

    \"and"(
      %re("/^set transform(\d+)'s local position to pos(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            transform2.contents,
            Meta3dComponentTransformProtocol.Index.dataName.localPosition,
            pos2->Obj.magic,
          )
      },
    )

    \"and"(
      %re("/^defer dispose transform(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            transform1.contents->Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData,
          )
      },
    )

    \"when"(
      %re("/^dispose transform(\d+)$/")->Obj.magic,
      () => {
        let (state_, _) = contribute.contents.disposeComponentsFunc(.
          state.contents,
          [transform1.contents],
        )
        state := state_
      },
    )

    then(
      %re("/^get transform(\d+)'s local position should return default data$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          transform1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
        )
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == TypeArrayTool.getDefaultPosition()
      },
    )

    \"and"(
      %re("/^get transform(\d+)'s local position should return pos(\d+)$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          transform2.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
        )
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == pos2
      },
    )
  })

  test(."reset removed one\'s value in localRotations", ({given, \"and", \"when", then}) => {
    let rotation1 = [1., 2., 3., 1.]
    let rotation2 = [5.5, 10., 30., 2.]

    _getContributeAndCreateAState((given, \"and"))

    given(
      %re("/^create two transforms as transform(\d+), transform(\d+)$/")->Obj.magic,
      () => {
        let (s, t1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, t2) = contribute.contents.createComponentFunc(. s)

        state := s
        transform1 := t1
        transform2 := t2
      },
    )

    \"and"(
      %re("/^set transform(\d+)'s local rotation to rotation(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            transform1.contents,
            Meta3dComponentTransformProtocol.Index.dataName.localRotation,
            rotation1->Obj.magic,
          )
      },
    )

    \"and"(
      %re("/^set transform(\d+)'s local rotation to rotation(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            transform2.contents,
            Meta3dComponentTransformProtocol.Index.dataName.localRotation,
            rotation2->Obj.magic,
          )
      },
    )

    \"and"(
      %re("/^defer dispose transform(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            transform1.contents->Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData,
          )
      },
    )

    \"when"(
      %re("/^dispose transform(\d+)$/")->Obj.magic,
      () => {
        let (state_, _) = contribute.contents.disposeComponentsFunc(.
          state.contents,
          [transform1.contents],
        )
        state := state_
      },
    )

    then(
      %re("/^get transform(\d+)'s local rotation should return default data$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          transform1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localRotation,
        )
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == TypeArrayTool.getDefaultRotation()
      },
    )

    \"and"(
      %re("/^get transform(\d+)'s local rotation should return rotation(\d+)$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          transform2.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localRotation,
        )
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == rotation2
      },
    )
  })

  test(."reset removed one\'s value in localScales", ({given, \"and", \"when", then}) => {
    let scale1 = [1., 2., 3.]
    let scale2 = [5., 10., 30.]

    _getContributeAndCreateAState((given, \"and"))

    given(
      %re("/^create two transforms as transform(\d+), transform(\d+)$/")->Obj.magic,
      () => {
        let (s, t1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, t2) = contribute.contents.createComponentFunc(. s)

        state := s
        transform1 := t1
        transform2 := t2
      },
    )

    \"and"(
      %re("/^set transform(\d+)'s local scale to scale(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            transform1.contents,
            Meta3dComponentTransformProtocol.Index.dataName.localScale,
            scale1->Obj.magic,
          )
      },
    )

    \"and"(
      %re("/^set transform(\d+)'s local scale to scale(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            transform2.contents,
            Meta3dComponentTransformProtocol.Index.dataName.localScale,
            scale2->Obj.magic,
          )
      },
    )

    \"and"(
      %re("/^defer dispose transform(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            transform1.contents->Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData,
          )
      },
    )

    \"when"(
      %re("/^dispose transform(\d+)$/")->Obj.magic,
      () => {
        let (state_, _) = contribute.contents.disposeComponentsFunc(.
          state.contents,
          [transform1.contents],
        )
        state := state_
      },
    )

    then(
      %re("/^get transform(\d+)'s local scale should return default data$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          transform1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localScale,
        )
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == TypeArrayTool.getDefaultScale()
      },
    )

    \"and"(
      %re("/^get transform(\d+)'s local scale should return scale(\d+)$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          transform2.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localScale,
        )
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == scale2
      },
    )
  })

  test(."if has disposed one, use disposed index as new index", ({
    given,
    \"and",
    \"when",
    then,
  }) => {
    let transform3 = ref(Obj.magic(1))
    let transform4 = ref(Obj.magic(2))

    _getContributeAndCreateAState((given, \"and"))

    given(
      %re("/^create two transforms as transform(\d+), transform(\d+)$/")->Obj.magic,
      () => {
        let (s, t1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, t2) = contribute.contents.createComponentFunc(. s)

        state := s
        transform1 := t1
        transform2 := t2
      },
    )

    \"and"(
      %re("/^defer dispose transform(\d+), transform(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            transform1.contents->Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData,
          )
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            transform2.contents->Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData,
          )
      },
    )

    \"and"(
      %re("/^dispose transform(\d+), transform(\d+)$/")->Obj.magic,
      () => {
        let (state_, _) = contribute.contents.disposeComponentsFunc(.
          state.contents,
          [transform1.contents, transform2.contents],
        )
        state := state_
      },
    )

    \"when"(
      %re("/^create two transforms as transform(\d+), transform(\d+)$/")->Obj.magic,
      () => {
        let (s, t1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, t2) = contribute.contents.createComponentFunc(. s)

        state := s
        transform3 := t1
        transform4 := t2
      },
    )

    then(
      %re("/^transform(\d+) should equal to transform(\d+)$/")->Obj.magic,
      () => {
        transform3->expect == transform2
      },
    )

    \"and"(
      %re("/^transform(\d+) should equal to transform(\d+)$/")->Obj.magic,
      () => {
        transform4->expect == transform1
      },
    )
  })

  test(."if has disposed one, new one can get default localPosition", ({
    given,
    \"and",
    \"when",
    then,
  }) => {
    let pos1 = [1., 2., 3.]

    _getContributeAndCreateAState((given, \"and"))

    given(
      %re("/^create a transform as transform(\d+)$/")->Obj.magic,
      () => {
        let (s, t1) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        transform1 := t1
      },
    )

    \"and"(
      %re("/^set transform(\d+)'s local position to pos(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            transform1.contents,
            Meta3dComponentTransformProtocol.Index.dataName.localPosition,
            pos1->Obj.magic,
          )
      },
    )

    \"and"(
      %re("/^defer dispose transform(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            transform1.contents->Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData,
          )
      },
    )

    \"and"(
      %re("/^dispose transform(\d+)$/")->Obj.magic,
      () => {
        let (state_, _) = contribute.contents.disposeComponentsFunc(.
          state.contents,
          [transform1.contents],
        )
        state := state_
      },
    )

    \"when"(
      %re("/^create a transform as transform(\d+)$/")->Obj.magic,
      () => {
        let (s, t) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        transform2 := t
      },
    )

    then(
      %re("/^get transform(\d+)'s local position should return default data$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          transform1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
        )
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == TypeArrayTool.getDefaultPosition()
      },
    )
    ()
  })

  test(."else, increase state.index", ({given, \"and", \"when", then}) => {
    let transform3 = ref(Obj.magic(1))

    _getContributeAndCreateAState((given, \"and"))

    given(
      %re("/^create two transforms as transform(\d+), transform(\d+)$/")->Obj.magic,
      () => {
        let (s, t1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, t2) = contribute.contents.createComponentFunc(. s)

        state := s
        transform1 := t1
        transform2 := t2
      },
    )

    \"when"(
      %re("/^create a transform as transform(\d+)$/")->Obj.magic,
      () => {
        let (s, t) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        transform3 := t
      },
    )

    then(
      %re("/^transform(\d+) should equal to transform(\d+) \+ (\d+)$/")->Obj.magic,
      () => {
        transform3.contents->expect == transform2.contents + 1
      },
    )
  })

  test(."new one should has default position", ({given, \"and", then, \"when"}) => {
    let transform3 = ref(Obj.magic(1))
    let pos1 = [1., 2., 3.]

    _getContributeAndCreateAState((given, \"and"))

    given(
      %re("/^create two transforms as transform(\d+), transform(\d+)$/")->Obj.magic,
      () => {
        let (s, t1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, t2) = contribute.contents.createComponentFunc(. s)

        state := s
        transform1 := t1
        transform2 := t2
      },
    )

    \"and"(
      %re("/^set transform(\d+)'s local position to pos(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            transform1.contents,
            Meta3dComponentTransformProtocol.Index.dataName.localPosition,
            pos1->Obj.magic,
          )
      },
    )

    then(
      %re("/^get transform(\d+)'s position$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          transform1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.position,
        )->ignore
      },
    )

    \"and"(
      %re("/^defer dispose transform(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            transform1.contents->Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData,
          )
      },
    )

    \"and"(
      %re("/^dispose transform(\d+)$/")->Obj.magic,
      () => {
        let (state_, _) = contribute.contents.disposeComponentsFunc(.
          state.contents,
          [transform1.contents],
        )
        state := state_
      },
    )

    \"when"(
      %re("/^create a transform as transform(\d+)$/")->Obj.magic,
      () => {
        let (s, t) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        transform3 := t
      },
    )

    then(
      %re("/^get transform(\d+)'s local position should return default data$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          transform3.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
        )
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == TypeArrayTool.getDefaultPosition()
      },
    )

    \"and"(
      %re("/^get transform(\d+)'s position should return default data$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          transform3.contents,
          Meta3dComponentTransformProtocol.Index.dataName.position,
        )
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == TypeArrayTool.getDefaultPosition()
      },
    )
  })

  test(."should remove disposed transforms from needDisposedTransforms", ({
    given,
    \"and",
    then,
    \"when",
  }) => {
    _getContributeAndCreateAState((given, \"and"))

    given(
      %re("/^create two transforms as transform(\d+), transform(\d+)$/")->Obj.magic,
      () => {
        let (s, t1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, t2) = contribute.contents.createComponentFunc(. s)

        state := s
        transform1 := t1
        transform2 := t2
      },
    )

    \"and"(
      %re("/^defer dispose transform(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            transform1.contents->Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData,
          )
      },
    )

    \"and"(
      %re("/^defer dispose transform(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            transform2.contents->Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData,
          )
      },
    )

    \"when"(
      %re("/^dispose transform(\d+)$/")->Obj.magic,
      () => {
        let (state_, _) = contribute.contents.disposeComponentsFunc(.
          state.contents,
          [transform1.contents],
        )
        state := state_
      },
    )

    then(
      "get need disposed transforms should return [transform2]",
      () => {
        contribute.contents.getNeedDisposedComponentsFunc(. state.contents)->expect == [
            transform2.contents,
          ]
      },
    )
  })
})
