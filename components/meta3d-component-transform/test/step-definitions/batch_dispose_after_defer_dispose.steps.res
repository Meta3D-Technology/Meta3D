open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/batch_dispose_after_defer_dispose.feature")

defineFeature(feature, test => {
  let contribute: ref<
    Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
      Meta3dComponentTransform.StateType.state,
      Meta3dComponentTransform.StateType.config,
      Meta3dComponentTransformProtocol.Index.dataNameType,
      Meta3dComponentTransform.StateType.transform,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))
  let transform1 = ref(Obj.magic(1))
  let transform2 = ref(Obj.magic(2))

  let _getContributeAndCreateAState = ((\"when", \"and")) => {
    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
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

    _getContributeAndCreateAState((\"when", \"and"))

    given(%re("/^create two transforms as transform(\d+), transform(\d+)$/")->Obj.magic, () => {
      let (s, t1) = contribute.contents.createComponentFunc(. state.contents)
      let (s, t2) = contribute.contents.createComponentFunc(. s)

      state := s
      transform1 := t1
      transform2 := t2
    })

    \"and"(%re("/^set transform(\d+)'s local position to pos(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          transform1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
          pos1->Obj.magic,
        )
    })

    \"and"(%re("/^set transform(\d+)'s local position to pos(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          transform2.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
          pos2->Obj.magic,
        )
    })

    \"and"(%re("/^defer dispose transform(\d+)$/")->Obj.magic, () => {
      state := contribute.contents.deferDisposeComponentFunc(. state.contents, transform1.contents)
    })

    \"when"(%re("/^dispose transform(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.batchDisposeComponentsFunc(. state.contents, [transform1.contents])
    })

    then(%re("/^get transform(\d+)'s local position should return pos(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        transform2.contents,
        Meta3dComponentTransformProtocol.Index.dataName.localPosition,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == pos2
    })
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

    _getContributeAndCreateAState((\"when", \"and"))

    _prepareTransform((given, \"and"))

    \"and"(%re("/^defer dispose transform(\d+)$/")->Obj.magic, () => {
      state := contribute.contents.deferDisposeComponentFunc(. state.contents, transform2.contents)
    })

    \"when"(%re("/^dispose transform(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.batchDisposeComponentsFunc(. state.contents, [transform2.contents])
    })

    then(%re("/^get transform(\d+)'s children should return \[\]$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        transform1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.children,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == []
    })
  })

  test(."shouldn\'t affect parent if disposed one has no parent", ({
    \"when",
    \"and",
    given,
    then,
  }) => {
    let pos1 = [1., 2., 3.]
    let pos2 = [5., 10., 30.]

    _getContributeAndCreateAState((\"when", \"and"))

    _prepareTransform((given, \"and"))

    given(%re("/^set transform(\d+)'s local position to pos(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          transform1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
          pos1->Obj.magic,
        )
    })

    \"and"(%re("/^set transform(\d+)'s local position to pos(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          transform2.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
          pos2->Obj.magic,
        )
    })

    \"and"(%re("/^defer dispose transform(\d+)$/")->Obj.magic, () => {
      state := contribute.contents.deferDisposeComponentFunc(. state.contents, transform1.contents)
    })

    \"when"(%re("/^dispose transform(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.batchDisposeComponentsFunc(. state.contents, [transform1.contents])
    })

    then(%re("/^get transform(\d+)'s position should return pos(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        transform2.contents,
        Meta3dComponentTransformProtocol.Index.dataName.position,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == pos2
    })
  })

  test(."shouldn\'t affect parent if disposed one has parent", ({\"when", \"and", given, then}) => {
    let transform3 = ref(Obj.magic(3))
    let pos1 = [1., 2., 3.]
    let pos2 = [5., 10., 30.]
    let pos3 = [2., 4., 6.]

    _getContributeAndCreateAState((\"when", \"and"))

    _prepareTransform((given, \"and"))

    given(%re("/^create a transform as transform(\d+)$/")->Obj.magic, () => {
      let (s, t) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      transform3 := t
    })

    \"and"(%re("/^set transform(\d+)'s parent to transform(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          transform1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.parent,
          transform3.contents->Js.Nullable.return->Obj.magic,
        )
    })

    \"and"(%re("/^set transform(\d+)'s local position to pos(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          transform1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
          pos1->Obj.magic,
        )
    })

    \"and"(%re("/^set transform(\d+)'s local position to pos(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          transform2.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
          pos2->Obj.magic,
        )
    })

    \"and"(%re("/^set transform(\d+)'s local position to pos(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          transform3.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
          pos3->Obj.magic,
        )
    })

    \"and"(%re("/^defer dispose transform(\d+)$/")->Obj.magic, () => {
      state := contribute.contents.deferDisposeComponentFunc(. state.contents, transform2.contents)
    })

    \"when"(%re("/^dispose transform(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.batchDisposeComponentsFunc(. state.contents, [transform2.contents])
    })

    then(%re("/^get transform1's position should return pos1 \+ pos3$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        transform1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.position,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == PositionTool.addPosition(pos1, pos3)
    })

    \"and"(%re("/^get transform3's position should return pos3$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        transform3.contents,
        Meta3dComponentTransformProtocol.Index.dataName.position,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == pos3
    })
  })

  test(."should remove it from parentMap", ({\"when", \"and", given, then}) => {
    let pos1 = [1., 2., 3.]

    _getContributeAndCreateAState((\"when", \"and"))

    _prepareTransform((given, \"and"))

    given(%re("/^set transform(\d+)'s local position to pos(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          transform1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
          pos1->Obj.magic,
        )
    })

    \"and"(%re("/^defer dispose transform(\d+)$/")->Obj.magic, () => {
      state := contribute.contents.deferDisposeComponentFunc(. state.contents, transform1.contents)
    })

    \"when"(%re("/^dispose transform(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.batchDisposeComponentsFunc(. state.contents, [transform1.contents])
    })

    then(%re("/^get transform(\d+)'s parent should return empty$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        transform2.contents,
        Meta3dComponentTransformProtocol.Index.dataName.parent,
      )->expect == Js.Nullable.undefined
    })
  })

  test(."should affect children", ({\"when", \"and", given, then}) => {
    let transform3 = ref(Obj.magic(3))
    let pos1 = [1., 2., 3.]
    let pos2 = [5., 10., 30.]
    let pos3 = [2., 4., 6.]

    _getContributeAndCreateAState((\"when", \"and"))

    _prepareTransform((given, \"and"))

    given(%re("/^create a transform as transform(\d+)$/")->Obj.magic, () => {
      let (s, t) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      transform3 := t
    })

    \"and"(%re("/^set transform(\d+)'s parent to transform(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          transform1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.parent,
          transform3.contents->Js.Nullable.return->Obj.magic,
        )
    })

    \"and"(%re("/^set transform(\d+)'s local position to pos(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          transform1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
          pos1->Obj.magic,
        )
    })

    \"and"(%re("/^set transform(\d+)'s local position to pos(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          transform2.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
          pos2->Obj.magic,
        )
    })

    \"and"(%re("/^set transform(\d+)'s local position to pos(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          transform3.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
          pos3->Obj.magic,
        )
    })

    \"and"(%re("/^defer dispose transform(\d+)$/")->Obj.magic, () => {
      state := contribute.contents.deferDisposeComponentFunc(. state.contents, transform3.contents)
    })

    \"when"(%re("/^dispose transform(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.batchDisposeComponentsFunc(. state.contents, [transform3.contents])
    })

    then(%re("/^get transform1's position should return pos1$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        transform1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.position,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == pos1
    })

    \"and"(%re("/^get transform2's position should return pos1 \+ pos2$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        transform2.contents,
        Meta3dComponentTransformProtocol.Index.dataName.position,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == PositionTool.addPosition(pos1, pos2)
    })
  })
})
