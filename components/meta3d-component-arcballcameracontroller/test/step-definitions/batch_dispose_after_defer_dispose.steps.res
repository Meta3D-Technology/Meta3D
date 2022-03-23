open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/batch_dispose_after_defer_dispose.feature")

defineFeature(feature, test => {
  let contribute: ref<
    Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
      StateType.state,
      Meta3dComponentArcballcameracontrollerProtocol.Index.config,
      
      Meta3dComponentArcballcameracontrollerProtocol.Index.needDisposedComponents,
      Meta3dComponentArcballcameracontrollerProtocol.Index.batchDisposeData,
      Meta3dComponentArcballcameracontrollerProtocol.Index.cloneConfig,
      Meta3dComponentArcballcameracontrollerProtocol.Index.arcballCameraController,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))
  let arcballCameraController1 = ref(Obj.magic(1))
  let arcballCameraController2 = ref(Obj.magic(2))

  let _getContributeAndCreateAState = ((given, \"and")) => {
    given("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := StateTool.createState(~contribute=contribute.contents, ())
    })
  }

  test(.
    "remove from distanceMap, minDistanceMap, phiMap, thetaMap, thetaMarginMap, targetMap, moveSpeedXMap, moveSpeedYMap, rotateSpeedMap, wheelSpeedMap, dirtyMap",
    ({given, \"and", \"when", then}) => {
      let arcballCameraController3 = ref(Obj.magic(3))
      // let pos1 = [1., 2., 3.]
      // let pos2 = [5., 10., 30.]
      // let pos3 = [2., 4., 6.]

      _getContributeAndCreateAState((given, \"and"))

      \"and"(
        %re(
          "/^create three arcballCameraControllers as arcballCameraController(\d+), arcballCameraController(\d+), arcballCameraController(\d+)$/"
        )->Obj.magic,
        () => {
          let (s, t1) = contribute.contents.createComponentFunc(. state.contents)
          let (s, t2) = contribute.contents.createComponentFunc(. s)
          let (s, t3) = contribute.contents.createComponentFunc(. s)

          state := s
          arcballCameraController1 := t1
          arcballCameraController2 := t2
          arcballCameraController3 := t3
        },
      )

      \"and"(%re("/^defer dispose arcballCameraController(\d+)$/")->Obj.magic, () => {
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            arcballCameraController1.contents->Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData,
          )
      })

      \"when"("dispose the need disposed arcballCameraControllers", () => {
        state :=
          contribute.contents.disposeComponentsFunc(.
            state.contents,
            [arcballCameraController1.contents],
          )
      })

      then(
        "should remove arcballCameraController1 from distanceMap, minDistanceMap, phiMap, thetaMap, thetaMarginMap, targetMap, moveSpeedXMap, moveSpeedYMap, rotateSpeedMap, wheelSpeedMap, dirtyMap",
        () => {
          let {
            distanceMap,
            minDistanceMap,
            phiMap,
            thetaMap,
            thetaMarginMap,
            targetMap,
            moveSpeedXMap,
            moveSpeedYMap,
            rotateSpeedMap,
            wheelSpeedMap,
            dirtyMap,
          } = state.contents

          (
            distanceMap->Meta3dCommonlib.MutableSparseMap.has(arcballCameraController1.contents),
            minDistanceMap->Meta3dCommonlib.MutableSparseMap.has(arcballCameraController1.contents),
            phiMap->Meta3dCommonlib.MutableSparseMap.has(arcballCameraController1.contents),
            thetaMap->Meta3dCommonlib.MutableSparseMap.has(arcballCameraController1.contents),
            thetaMarginMap->Meta3dCommonlib.MutableSparseMap.has(arcballCameraController1.contents),
            targetMap->Meta3dCommonlib.MutableSparseMap.has(arcballCameraController1.contents),
            moveSpeedXMap->Meta3dCommonlib.MutableSparseMap.has(arcballCameraController1.contents),
            moveSpeedYMap->Meta3dCommonlib.MutableSparseMap.has(arcballCameraController1.contents),
            rotateSpeedMap->Meta3dCommonlib.MutableSparseMap.has(arcballCameraController1.contents),
            wheelSpeedMap->Meta3dCommonlib.MutableSparseMap.has(arcballCameraController1.contents),
            dirtyMap->Meta3dCommonlib.MutableSparseMap.has(arcballCameraController1.contents),
          )->expect == (false, false, false, false, false, false, false, false, false, false, false)
        },
      )
    },
  )

  test(."remove from gameObjectMap, gameObjectArcballCameraControllerMap", ({
    given,
    \"and",
    \"when",
    then,
  }) => {
    let gameObject1 = 10
    let arcballCameraController1 = ref(Obj.magic(1))
    let d1 = [0.5, 1.0, 1.0]

    _getContributeAndCreateAState((given, \"and"))

    given("create a gameObject", () => {
      ()
    })

    \"and"("create a arcballCameraController", () => {
      let (s, m) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      arcballCameraController1 := m
    })

    \"and"("add the arcballCameraController to the gameObject", () => {
      state :=
        contribute.contents.addComponentFunc(.
          state.contents,
          gameObject1,
          arcballCameraController1.contents,
        )
    })

    \"and"("defer dispose the arcballCameraController from the gameObject", () => {
      state :=
        contribute.contents.deferDisposeComponentFunc(.
          state.contents,
          (arcballCameraController1.contents, gameObject1),
        )
    })

    \"when"("dispose the need disposed arcballCameraControllers", () => {
      state :=
        contribute.contents.disposeComponentsFunc(.
          state.contents,
          contribute.contents.getNeedDisposedComponentsFunc(. state.contents),
        )
    })

    then("get the arcballCameraController's gameObjects should return []", () => {
      contribute.contents.getGameObjectsFunc(.
        state.contents,
        arcballCameraController1.contents,
      )->expect == []
    })

    \"and"("get the gameObject's arcballCameraController should return empty", () => {
      contribute.contents.getComponentFunc(. state.contents, gameObject1)->expect ==
        Js.Nullable.undefined
    })
  })

  test(."if has disposed one, use disposed index as new index", ({
    given,
    \"and",
    \"when",
    then,
  }) => {
    let arcballCameraController3 = ref(Obj.magic(1))
    let arcballCameraController4 = ref(Obj.magic(2))

    _getContributeAndCreateAState((given, \"and"))

    given(
      %re(
        "/^create two arcballCameraControllers as arcballCameraController(\d+), arcballCameraController(\d+)$/"
      )->Obj.magic,
      () => {
        let (s, t1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, t2) = contribute.contents.createComponentFunc(. s)

        state := s
        arcballCameraController1 := t1
        arcballCameraController2 := t2
      },
    )

    \"and"(
      %re(
        "/^defer dispose arcballCameraController(\d+), arcballCameraController(\d+)$/"
      )->Obj.magic,
      () => {
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            arcballCameraController1.contents->Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData,
          )
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            arcballCameraController2.contents->Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData,
          )
      },
    )

    \"and"(
      %re("/^dispose arcballCameraController(\d+), arcballCameraController(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.disposeComponentsFunc(.
            state.contents,
            [arcballCameraController1.contents, arcballCameraController2.contents],
          )
      },
    )

    \"when"(
      %re(
        "/^create two arcballCameraControllers as arcballCameraController(\d+), arcballCameraController(\d+)$/"
      )->Obj.magic,
      () => {
        let (s, t1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, t2) = contribute.contents.createComponentFunc(. s)

        state := s
        arcballCameraController3 := t1
        arcballCameraController4 := t2
      },
    )

    then(
      %re(
        "/^arcballCameraController(\d+) should equal to arcballCameraController(\d+)$/"
      )->Obj.magic,
      () => {
        arcballCameraController3->expect == arcballCameraController2
      },
    )

    \"and"(
      %re(
        "/^arcballCameraController(\d+) should equal to arcballCameraController(\d+)$/"
      )->Obj.magic,
      () => {
        arcballCameraController4->expect == arcballCameraController1
      },
    )
  })
})
