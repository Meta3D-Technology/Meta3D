open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/batch_dispose_after_defer_dispose.feature")

defineFeature(feature, test => {
  let contribute: ref<
    Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
      StateType.state,
      Meta3dComponentPerspectivecameraprojectionProtocol.Index.config,
      
      Meta3dComponentPerspectivecameraprojectionProtocol.Index.needDisposedComponents,
      Meta3dComponentPerspectivecameraprojectionProtocol.Index.batchDisposeData,
      Meta3dComponentPerspectivecameraprojectionProtocol.Index.cloneConfig,
      Meta3dComponentPerspectivecameraprojectionProtocol.Index.perspectiveCameraProjection,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))
  let perspectiveCameraProjection1 = ref(Obj.magic(1))
  let perspectiveCameraProjection2 = ref(Obj.magic(2))

  let _getContributeAndCreateAState = ((given, \"and")) => {
    given("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      state := StateTool.createState(~contribute=contribute.contents, ())
    })
  }

  test(."remove from nearMap, farMap, fovyMap, aspectMap, pMatrixMap, dirtyMap", ({
    given,
    \"and",
    \"when",
    then,
  }) => {
    let perspectiveCameraProjection3 = ref(Obj.magic(3))

    _getContributeAndCreateAState((given, \"and"))

    \"and"(
      %re(
        "/^create three perspectiveCameraProjections as perspectiveCameraProjection(\d+), perspectiveCameraProjection(\d+), perspectiveCameraProjection(\d+)$/"
      )->Obj.magic,
      () => {
        let (s, t1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, t2) = contribute.contents.createComponentFunc(. s)
        let (s, t3) = contribute.contents.createComponentFunc(. s)

        state := s
        perspectiveCameraProjection1 := t1
        perspectiveCameraProjection2 := t2
        perspectiveCameraProjection3 := t3
      },
    )

    \"and"("set perspectiveCameraProjection1's near, far, fovy, aspect, pMatrix", () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          perspectiveCameraProjection1.contents,
          Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.near,
          0.1->Obj.magic,
        )
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          perspectiveCameraProjection1.contents,
          Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.far,
          0.1->Obj.magic,
        )
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          perspectiveCameraProjection1.contents,
          Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.fovy,
          0.1->Obj.magic,
        )
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          perspectiveCameraProjection1.contents,
          Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.aspect,
          0.1->Obj.magic,
        )
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          perspectiveCameraProjection1.contents,
          Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.pMatrix,
          Js.Typed_array.Float32Array.make([0.1])->Obj.magic,
        )
    })

    \"and"(%re("/^defer dispose perspectiveCameraProjection(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.deferDisposeComponentFunc(.
          state.contents,
          perspectiveCameraProjection1.contents->Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData,
        )
    })

    \"when"("dispose the need disposed perspectiveCameraProjections", () => {
        let (state_, _) = contribute.contents.disposeComponentsFunc(.
          state.contents,
          [perspectiveCameraProjection1.contents],
        )
        state := state_

    })

    then(
      "should remove perspectiveCameraProjection1 from nearMap, farMap, fovyMap, aspectMap, pMatrixMap, dirtyMap",
      () => {
        let {nearMap, farMap, fovyMap, aspectMap, pMatrixMap, dirtyMap} = state.contents

        (
          nearMap->Meta3dCommonlib.MutableSparseMap.has(perspectiveCameraProjection1.contents),
          farMap->Meta3dCommonlib.MutableSparseMap.has(perspectiveCameraProjection1.contents),
          fovyMap->Meta3dCommonlib.MutableSparseMap.has(perspectiveCameraProjection1.contents),
          aspectMap->Meta3dCommonlib.MutableSparseMap.has(perspectiveCameraProjection1.contents),
          pMatrixMap->Meta3dCommonlib.MutableSparseMap.has(perspectiveCameraProjection1.contents),
          dirtyMap->Meta3dCommonlib.MutableSparseMap.has(perspectiveCameraProjection1.contents),
        )->expect == (false, false, false, false, false, false)
      },
    )
  })

  test(."remove from gameObjectMap, gameObjectPerspectiveCameraProjectionMap", ({
    given,
    \"and",
    \"when",
    then,
  }) => {
    let gameObject1 = 10
    let perspectiveCameraProjection1 = ref(Obj.magic(1))
    let d1 = [0.5, 1.0, 1.0]

    _getContributeAndCreateAState((given, \"and"))

    given("create a gameObject", () => {
      ()
    })

    \"and"("create a perspectiveCameraProjection", () => {
      let (s, m) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      perspectiveCameraProjection1 := m
    })

    \"and"("add the perspectiveCameraProjection to the gameObject", () => {
      state :=
        contribute.contents.addComponentFunc(.
          state.contents,
          gameObject1,
          perspectiveCameraProjection1.contents,
        )
    })

    \"and"("defer dispose the perspectiveCameraProjection from the gameObject", () => {
      state :=
        contribute.contents.deferDisposeComponentFunc(.
          state.contents,
          (perspectiveCameraProjection1.contents, gameObject1),
        )
    })

    \"when"("dispose the need disposed perspectiveCameraProjections", () => {
        let (state_, _) = contribute.contents.disposeComponentsFunc(.
          state.contents,
          contribute.contents.getNeedDisposedComponentsFunc(. state.contents),
        )
        state := state_

    })

    then("get the perspectiveCameraProjection's gameObjects should return []", () => {
      contribute.contents.getGameObjectsFunc(.
        state.contents,
        perspectiveCameraProjection1.contents,
      )->expect == []
    })

    \"and"("get the gameObject's perspectiveCameraProjection should return empty", () => {
      contribute.contents.getComponentFunc(. state.contents, gameObject1)->expect ==
        Js.Nullable.null
    })
  })

  test(."if has disposed one, use disposed index as new index", ({
    given,
    \"and",
    \"when",
    then,
  }) => {
    let perspectiveCameraProjection3 = ref(Obj.magic(1))
    let perspectiveCameraProjection4 = ref(Obj.magic(2))

    _getContributeAndCreateAState((given, \"and"))

    given(
      %re(
        "/^create two perspectiveCameraProjections as perspectiveCameraProjection(\d+), perspectiveCameraProjection(\d+)$/"
      )->Obj.magic,
      () => {
        let (s, t1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, t2) = contribute.contents.createComponentFunc(. s)

        state := s
        perspectiveCameraProjection1 := t1
        perspectiveCameraProjection2 := t2
      },
    )

    \"and"(
      %re(
        "/^defer dispose perspectiveCameraProjection(\d+), perspectiveCameraProjection(\d+)$/"
      )->Obj.magic,
      () => {
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            perspectiveCameraProjection1.contents->Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData,
          )
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            perspectiveCameraProjection2.contents->Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData,
          )
      },
    )

    \"and"(
      %re(
        "/^dispose perspectiveCameraProjection(\d+), perspectiveCameraProjection(\d+)$/"
      )->Obj.magic,
      () => {
        let (state_, _) = contribute.contents.disposeComponentsFunc(.
          state.contents,
            [perspectiveCameraProjection1.contents, perspectiveCameraProjection2.contents],
        )
        state := state_

      },
    )

    \"when"(
      %re(
        "/^create two perspectiveCameraProjections as perspectiveCameraProjection(\d+), perspectiveCameraProjection(\d+)$/"
      )->Obj.magic,
      () => {
        let (s, t1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, t2) = contribute.contents.createComponentFunc(. s)

        state := s
        perspectiveCameraProjection3 := t1
        perspectiveCameraProjection4 := t2
      },
    )

    then(
      %re(
        "/^perspectiveCameraProjection(\d+) should equal to perspectiveCameraProjection(\d+)$/"
      )->Obj.magic,
      () => {
        perspectiveCameraProjection3->expect == perspectiveCameraProjection2
      },
    )

    \"and"(
      %re(
        "/^perspectiveCameraProjection(\d+) should equal to perspectiveCameraProjection(\d+)$/"
      )->Obj.magic,
      () => {
        perspectiveCameraProjection4->expect == perspectiveCameraProjection1
      },
    )
  })
})
