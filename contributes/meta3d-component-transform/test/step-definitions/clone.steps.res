open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/clone.feature")

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
  let cloneConfig = ()
  let clonedTransforms = ref([])

  let _getContributeAndCreateAState = ((\"when", \"and")) => {
    \"when"("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      state := StateTool.createState(~contribute=contribute.contents, ())
    })
  }

  test(."clone specific count of transforms", ({given, \"when", \"and", then}) => {
    let transform = ref(Obj.magic(1))

    _getContributeAndCreateAState((\"when", \"and"))

    given("create a transform", () => {
      let (s, t) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      transform := t
    })

    \"when"("clone 2 transforms", () => {
      let (s, c) = contribute.contents.cloneComponentFunc(.
        state.contents,
        Meta3dCommonlib.CloneTool.buildCountRange(2),
        cloneConfig,
        transform.contents,
      )

      state := s
      clonedTransforms := c
    })

    then("get 2 cloned transforms", () => {
      clonedTransforms.contents->Js.Array.length->expect == 2
    })
  })

  test(."set cloned transform's localPosition by source transform's localPosition", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let transform = ref(Obj.magic(1))
    let pos1 = [1., 2., 3.]

    _getContributeAndCreateAState((\"when", \"and"))

    given("create a transform", () => {
      let (s, t) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      transform := t
    })

    \"and"("set the transform's local position to pos1", () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          transform.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
          pos1->Obj.magic,
        )
    })

    \"when"("clone 2 transforms", () => {
      let (s, c) = contribute.contents.cloneComponentFunc(.
        state.contents,
        Meta3dCommonlib.CloneTool.buildCountRange(2),
        cloneConfig,
        transform.contents,
      )

      state := s
      clonedTransforms := c
    })

    then("get 2 cloned transforms' local position should return pos1, pos1", () => {
      (
        contribute.contents.getComponentDataFunc(.
          state.contents,
          clonedTransforms.contents[0],
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
        )->Meta3dCommonlib.NullableTool.getExn,
        contribute.contents.getComponentDataFunc(.
          state.contents,
          clonedTransforms.contents[1],
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
        )->Meta3dCommonlib.NullableTool.getExn,
      )->expect == (pos1, pos1)
    })
  })

  test(."set cloned transform's localRotation by source transform's localRotation", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let transform = ref(Obj.magic(1))
    let rotation1 = [1., 2., 3., 2.5]

    _getContributeAndCreateAState((\"when", \"and"))

    given("create a transform", () => {
      let (s, t) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      transform := t
    })

    \"and"("set the transform's local rotation to rotation1", () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          transform.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localRotation,
          rotation1->Obj.magic,
        )
    })

    \"when"("clone 2 transforms", () => {
      let (s, c) = contribute.contents.cloneComponentFunc(.
        state.contents,
        Meta3dCommonlib.CloneTool.buildCountRange(2),
        cloneConfig,
        transform.contents,
      )

      state := s
      clonedTransforms := c
    })

    then("get 2 cloned transforms' local rotation should return rotation1, rotation1", () => {
      (
        contribute.contents.getComponentDataFunc(.
          state.contents,
          clonedTransforms.contents[0],
          Meta3dComponentTransformProtocol.Index.dataName.localRotation,
        )->Meta3dCommonlib.NullableTool.getExn,
        contribute.contents.getComponentDataFunc(.
          state.contents,
          clonedTransforms.contents[1],
          Meta3dComponentTransformProtocol.Index.dataName.localRotation,
        )->Meta3dCommonlib.NullableTool.getExn,
      )->expect == (rotation1, rotation1)
    })
  })

  test(."set cloned transform's localScale by source transform's localScale", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let transform = ref(Obj.magic(1))
    let scale1 = [1., 2., 3.]

    _getContributeAndCreateAState((\"when", \"and"))

    given("create a transform", () => {
      let (s, t) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      transform := t
    })

    \"and"("set the transform's local scale to scale1", () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          transform.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localScale,
          scale1->Obj.magic,
        )
    })

    \"when"("clone 2 transforms", () => {
      let (s, c) = contribute.contents.cloneComponentFunc(.
        state.contents,
        Meta3dCommonlib.CloneTool.buildCountRange(2),
        cloneConfig,
        transform.contents,
      )

      state := s
      clonedTransforms := c
    })

    then("get 2 cloned transforms' local scale should return scale1, scale1", () => {
      (
        contribute.contents.getComponentDataFunc(.
          state.contents,
          clonedTransforms.contents[0],
          Meta3dComponentTransformProtocol.Index.dataName.localScale,
        )->Meta3dCommonlib.NullableTool.getExn,
        contribute.contents.getComponentDataFunc(.
          state.contents,
          clonedTransforms.contents[1],
          Meta3dComponentTransformProtocol.Index.dataName.localScale,
        )->Meta3dCommonlib.NullableTool.getExn,
      )->expect == (scale1, scale1)
    })
  })

  test(."mark cloned transform dirty", ({given, \"when", \"and", then}) => {
    let transform = ref(Obj.magic(1))

    _getContributeAndCreateAState((\"when", \"and"))

    given("create a transform", () => {
      let (s, t) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      transform := t
    })

    \"when"("clone 2 transforms", () => {
      let (s, c) = contribute.contents.cloneComponentFunc(.
        state.contents,
        Meta3dCommonlib.CloneTool.buildCountRange(2),
        cloneConfig,
        transform.contents,
      )

      state := s
      clonedTransforms := c
    })

    then("get 2 cloned transforms' isDirty should return true, true", () => {
      (
        contribute.contents.getComponentDataFunc(.
          state.contents,
          clonedTransforms.contents[0],
          Meta3dComponentTransformProtocol.Index.dataName.dirty,
        )->Meta3dCommonlib.NullableTool.getExn,
        contribute.contents.getComponentDataFunc(.
          state.contents,
          clonedTransforms.contents[1],
          Meta3dComponentTransformProtocol.Index.dataName.dirty,
        )->Meta3dCommonlib.NullableTool.getExn,
      )->expect == (true, true)
    })
  })

  test(."source transform and cloned transforms shouldn't affect each other", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let transform = ref(Obj.magic(1))
    let pos1 = [1., 2., 3.]
    let pos2 = [3., 1., 4.]

    _getContributeAndCreateAState((\"when", \"and"))

    given("create a transform as t1", () => {
      let (s, t) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      transform := t
    })

    \"and"("set t1's local position to pos1", () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          transform.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
          pos1->Obj.magic,
        )
    })

    \"when"("clone 2 transforms as c1, c2", () => {
      let (s, c) = contribute.contents.cloneComponentFunc(.
        state.contents,
        Meta3dCommonlib.CloneTool.buildCountRange(2),
        cloneConfig,
        transform.contents,
      )

      state := s
      clonedTransforms := c
    })

    \"and"("set c2's local position to pos2", () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          clonedTransforms.contents[1],
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
          pos2->Obj.magic,
        )
    })

    then("get t1's local position should return pos1", () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        transform.contents,
        Meta3dComponentTransformProtocol.Index.dataName.localPosition,
      )->expect == pos1
    })

    \"and"("get c1's local position should return pos1", () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        clonedTransforms.contents[0],
        Meta3dComponentTransformProtocol.Index.dataName.localPosition,
      )->expect == pos1
    })

    \"and"("get c2's local position should return pos2", () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        clonedTransforms.contents[1],
        Meta3dComponentTransformProtocol.Index.dataName.localPosition,
      )->expect == pos2
    })
  })
})
