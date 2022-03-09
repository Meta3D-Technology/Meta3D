open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/hierachy.feature")

defineFeature(feature, test => {
  let contribute: ref<
    Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
      StateType.state,
      Meta3dComponentTransformProtocol.Index.config,
      Meta3dComponentTransformProtocol.Index.dataNameType,
      Meta3dComponentTransformProtocol.Index.transform,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))

  let _getDefaultPosition = () => [0., 0., 0.]

  let _getContributeAndCreateAState = ((\"when", \"and")) => {
    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := StateTool.createState(~contribute=contribute.contents, ())
    })
  }

  test(."test one(parent)-one(child)", ({\"when", \"and", then}) => {
    let parent1 = ref(Obj.magic(1))
    let child1 = ref(Obj.magic(2))
    let pos1 = [1., 2., 3.]

    _getContributeAndCreateAState((\"when", \"and"))

    \"when"(%re("/^create two transforms as parent(\d+), child(\d+)$/")->Obj.magic, () => {
      let (s, p) = contribute.contents.createComponentFunc(. state.contents)
      let (s, c) = contribute.contents.createComponentFunc(. s)

      state := s
      parent1 := p
      child1 := c
    })

    \"and"(%re("/^set parent(\d+)'s local position to pos(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          parent1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
          pos1->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s parent to parent(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.parent,
          parent1.contents->Js.Nullable.return->Obj.magic,
        )
    })

    then(%re("/^get parent(\d+)'s local position should return pos(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        parent1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.localPosition,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == pos1
    })

    \"and"(%re("/^get parent(\d+)'s position should return pos(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        parent1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.position,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == pos1
    })

    \"and"(
      %re("/^get child(\d+)'s local position should return default data$/")->Obj.magic,
      arg0 => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
        )
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == _getDefaultPosition()
      },
    )

    \"and"(%re("/^get child(\d+)'s position should return pos(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        child1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.position,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == pos1
    })
  })

  test(."test one(parent)-two(child)", ({\"when", \"and", then}) => {
    let parent1 = ref(Obj.magic(1))
    let child1 = ref(Obj.magic(2))
    let child2 = ref(Obj.magic(3))
    let pos1 = [1., 2., 3.]
    let pos2 = [10., 20., 30.]

    _getContributeAndCreateAState((\"when", \"and"))

    \"when"(
      %re("/^create three transforms as parent(\d+), child(\d+), child(\d+)$/")->Obj.magic,
      () => {
        let (s, p) = contribute.contents.createComponentFunc(. state.contents)
        let (s, c1) = contribute.contents.createComponentFunc(. s)
        let (s, c2) = contribute.contents.createComponentFunc(. s)

        state := s
        parent1 := p
        child1 := c1
        child2 := c2
      },
    )

    \"and"(%re("/^set parent(\d+)'s local position to pos(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          parent1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
          pos1->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s local position to pos(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          child2.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
          pos2->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s parent to parent(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.parent,
          parent1.contents->Js.Nullable.return->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s parent to parent(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          child2.contents,
          Meta3dComponentTransformProtocol.Index.dataName.parent,
          parent1.contents->Js.Nullable.return->Obj.magic,
        )
    })

    then(%re("/^get parent(\d+)'s local position should return pos(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        parent1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.localPosition,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == pos1
    })

    \"and"(%re("/^get parent(\d+)'s position should return pos(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        parent1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.position,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == pos1
    })

    \"and"(
      %re("/^get child(\d+)'s local position should return default data$/")->Obj.magic,
      arg0 => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
        )
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == _getDefaultPosition()
      },
    )

    \"and"(%re("/^get child(\d+)'s position should return pos(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        child1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.position,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == pos1
    })

    \"and"(%re("/^get child(\d+)'s local position should return pos(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        child2.contents,
        Meta3dComponentTransformProtocol.Index.dataName.localPosition,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == pos2
    })

    \"and"(
      %re("/^get child(\d+)'s position should return pos(\d+) \+ pos(\d+)$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          child2.contents,
          Meta3dComponentTransformProtocol.Index.dataName.position,
        )
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == PositionTool.addPosition(pos1, pos2)
      },
    )
  })

  test(."can set the same parent", ({\"when", \"and", then}) => {
    let parent1 = ref(Obj.magic(1))
    let child1 = ref(Obj.magic(2))
    let pos1 = [1., 2., 3.]

    _getContributeAndCreateAState((\"when", \"and"))

    \"when"(%re("/^create two transforms as parent(\d+), child(\d+)$/")->Obj.magic, () => {
      let (s, p) = contribute.contents.createComponentFunc(. state.contents)
      let (s, c) = contribute.contents.createComponentFunc(. s)

      state := s
      parent1 := p
      child1 := c
    })

    \"and"(%re("/^set child(\d+)'s parent to parent(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.parent,
          parent1.contents->Js.Nullable.return->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s parent to parent(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.parent,
          parent1.contents->Js.Nullable.return->Obj.magic,
        )
    })

    then(%re("/^get child(\d+)'s parent should return parent(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        child1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.parent,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == parent1.contents
    })
  })

  test(."can set a different parent", ({\"when", \"and", then}) => {
    let parent1 = ref(Obj.magic(1))
    let parent2 = ref(Obj.magic(2))
    let child1 = ref(Obj.magic(3))
    let pos1 = [1., 2., 3.]

    _getContributeAndCreateAState((\"when", \"and"))

    \"when"(
      %re("/^create three transforms as parent(\d+), parent(\d+), child(\d+)$/")->Obj.magic,
      () => {
        let (s, p1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, p2) = contribute.contents.createComponentFunc(. s)
        let (s, c) = contribute.contents.createComponentFunc(. s)

        state := s
        parent1 := p1
        parent2 := p2
        child1 := c
      },
    )

    \"and"(%re("/^set child(\d+)'s parent to parent(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.parent,
          parent1.contents->Js.Nullable.return->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s parent to parent(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.parent,
          parent2.contents->Js.Nullable.return->Obj.magic,
        )
    })

    then(%re("/^get child(\d+)'s parent should return parent(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        child1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.parent,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == parent2.contents
    })
  })

  test(."set different parents should change its current parent\'s children order", ({
    \"when",
    \"and",
    then,
  }) => {
    let parent1 = ref(Obj.magic(1))
    let child1 = ref(Obj.magic(2))
    let child2 = ref(Obj.magic(3))
    let child3 = ref(Obj.magic(4))
    let pos1 = [1., 2., 3.]

    _getContributeAndCreateAState((\"when", \"and"))

    \"when"(
      %re(
        "/^create four transforms as parent(\d+), child(\d+), child(\d+), child(\d+)$/"
      )->Obj.magic,
      () => {
        let (s, p) = contribute.contents.createComponentFunc(. state.contents)
        let (s, c1) = contribute.contents.createComponentFunc(. s)
        let (s, c2) = contribute.contents.createComponentFunc(. s)
        let (s, c3) = contribute.contents.createComponentFunc(. s)

        state := s
        parent1 := p
        child1 := c1
        child2 := c2
        child3 := c3
      },
    )

    \"and"(%re("/^set child(\d+)'s parent to parent(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.parent,
          parent1.contents->Js.Nullable.return->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s parent to parent(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          child2.contents,
          Meta3dComponentTransformProtocol.Index.dataName.parent,
          parent1.contents->Js.Nullable.return->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s parent to parent(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          child3.contents,
          Meta3dComponentTransformProtocol.Index.dataName.parent,
          parent1.contents->Js.Nullable.return->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s parent to child(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.parent,
          child3.contents->Js.Nullable.return->Obj.magic,
        )
    })

    then(
      %re("/^get parent(\d+)'s children should return \[child(\d+), child(\d+)\]$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          parent1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.children,
        )
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == [child3.contents, child2.contents]
      },
    )
  })

  test(."test two(parent)-two(child)", ({\"when", \"and", then}) => {
    let parent1 = ref(Obj.magic(1))
    let parent2 = ref(Obj.magic(2))
    let child1 = ref(Obj.magic(3))
    let child2 = ref(Obj.magic(4))
    let pos1 = [1., 2., 3.]
    let pos2 = [2., 3., 4.]
    let pos3 = [4., 3., 4.]
    let pos4 = [7., 3., 4.]

    _getContributeAndCreateAState((\"when", \"and"))

    \"when"(
      %re(
        "/^create four transforms as parent(\d+), parent(\d+), child(\d+), child(\d+)$/"
      )->Obj.magic,
      () => {
        let (s, p1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, p2) = contribute.contents.createComponentFunc(. s)
        let (s, c1) = contribute.contents.createComponentFunc(. s)
        let (s, c2) = contribute.contents.createComponentFunc(. s)

        state := s
        parent1 := p1
        parent2 := p2
        child1 := c1
        child2 := c2
      },
    )

    \"and"(%re("/^set child(\d+)'s parent to parent(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.parent,
          parent1.contents->Js.Nullable.return->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s parent to parent(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          child2.contents,
          Meta3dComponentTransformProtocol.Index.dataName.parent,
          parent2.contents->Js.Nullable.return->Obj.magic,
        )
    })

    \"and"(%re("/^set parent(\d+)'s local position to pos(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          parent1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
          pos1->Obj.magic,
        )
    })

    \"and"(%re("/^set parent(\d+)'s local position to pos(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          parent2.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
          pos2->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s local position to pos(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
          pos3->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s local position to pos(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          child2.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
          pos4->Obj.magic,
        )
    })

    then(%re("/^get parent(\d+)'s position should return pos(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        parent1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.position,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == pos1
    })

    \"and"(%re("/^get parent(\d+)'s position should return pos(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        parent2.contents,
        Meta3dComponentTransformProtocol.Index.dataName.position,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == pos2
    })

    \"and"(
      %re("/^get child(\d+)'s position should return pos(\d+) \+ pos(\d+)$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.position,
        )
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == PositionTool.addPosition(pos3, pos1)
      },
    )

    \"and"(
      %re("/^get child(\d+)'s position should return pos(\d+) \+ pos(\d+)$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          child2.contents,
          Meta3dComponentTransformProtocol.Index.dataName.position,
        )
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == PositionTool.addPosition(pos4, pos2)
      },
    )
  })

  test(."test one(parent)-one(child) for remove parent", ({\"when", \"and", then}) => {
    let parent1 = ref(Obj.magic(1))
    let child1 = ref(Obj.magic(2))
    let pos1 = [1., 2., 3.]

    _getContributeAndCreateAState((\"when", \"and"))

    \"when"(%re("/^create two transforms as parent(\d+), child(\d+)$/")->Obj.magic, () => {
      let (s, p) = contribute.contents.createComponentFunc(. state.contents)
      let (s, c) = contribute.contents.createComponentFunc(. s)

      state := s
      parent1 := p
      child1 := c
    })

    \"and"(%re("/^set parent(\d+)'s local position to pos(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          parent1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
          pos1->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s parent to parent(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.parent,
          parent1.contents->Obj.magic,
        )
    })

    \"and"(%re("/^remove child(\d+)'s parent$/")->Obj.magic, arg0 => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.parent,
          Js.Nullable.null->Obj.magic,
        )
    })

    then(%re("/^child(\d+) should not have parent$/")->Obj.magic, arg0 => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        child1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.parent,
      )->expect == Js.Nullable.undefined
    })

    \"and"(%re("/^get parent(\d+)'s local position should return pos(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        parent1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.localPosition,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == pos1
    })

    \"and"(%re("/^get parent(\d+)'s position should return pos(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        parent1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.position,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == pos1
    })

    \"and"(
      %re("/^get child(\d+)'s local position should return default data$/")->Obj.magic,
      arg0 => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
        )
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == _getDefaultPosition()
      },
    )

    \"and"(%re("/^get child(\d+)'s position should return default data$/")->Obj.magic, arg0 => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        child1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.position,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == _getDefaultPosition()
    })
  })

  test(."test one(parent)-two(child) for remove parent", ({\"when", \"and", then}) => {
    let parent1 = ref(Obj.magic(1))
    let child1 = ref(Obj.magic(2))
    let child2 = ref(Obj.magic(3))
    let pos1 = [1., 2., 3.]
    let pos2 = [2., 3., 4.]

    _getContributeAndCreateAState((\"when", \"and"))

    \"when"(
      %re("/^create three transforms as parent(\d+), child(\d+), child(\d+)$/")->Obj.magic,
      () => {
        let (s, p) = contribute.contents.createComponentFunc(. state.contents)
        let (s, c1) = contribute.contents.createComponentFunc(. s)
        let (s, c2) = contribute.contents.createComponentFunc(. s)

        state := s
        parent1 := p
        child1 := c1
        child2 := c2
      },
    )

    \"and"(%re("/^set parent(\d+)'s local position to pos(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          parent1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
          pos1->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s parent to parent(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.parent,
          parent1.contents->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s local position to pos(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          child2.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
          pos2->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s parent to parent(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          child2.contents,
          Meta3dComponentTransformProtocol.Index.dataName.parent,
          parent1.contents->Obj.magic,
        )
    })

    \"and"(%re("/^remove child(\d+)'s parent$/")->Obj.magic, arg0 => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          child2.contents,
          Meta3dComponentTransformProtocol.Index.dataName.parent,
          Js.Nullable.null->Obj.magic,
        )
    })

    \"and"(%re("/^get parent(\d+)'s local position should return pos(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        parent1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.localPosition,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == pos1
    })

    \"and"(%re("/^get parent(\d+)'s position should return pos(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        parent1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.position,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == pos1
    })

    \"and"(
      %re("/^get child(\d+)'s local position should return default data$/")->Obj.magic,
      arg0 => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
        )
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == _getDefaultPosition()
      },
    )

    \"and"(%re("/^get child(\d+)'s position should return pos(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        child1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.position,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == pos1
    })

    \"and"(%re("/^get child(\d+)'s local position should return pos(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        child2.contents,
        Meta3dComponentTransformProtocol.Index.dataName.localPosition,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == pos2
    })

    \"and"(%re("/^get child(\d+)'s position should return pos(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        child2.contents,
        Meta3dComponentTransformProtocol.Index.dataName.position,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == pos2
    })
  })

  test(."has no parent", ({\"when", \"and", then}) => {
    let transform = ref(Obj.magic(1))

    _getContributeAndCreateAState((\"when", \"and"))

    \"when"(%re("/^create a transform as transform(\d+)$/")->Obj.magic, arg0 => {
      let (s, t) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      transform := t
    })

    then(%re("/^transform(\d+) should not have parent$/")->Obj.magic, arg0 => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        transform.contents,
        Meta3dComponentTransformProtocol.Index.dataName.parent,
      )->expect == Js.Nullable.undefined
    })
  })

  test(."has parent", ({\"when", \"and", then}) => {
    let parent1 = ref(Obj.magic(1))
    let child1 = ref(Obj.magic(2))

    _getContributeAndCreateAState((\"when", \"and"))

    \"when"(%re("/^create two transforms as parent(\d+), child(\d+)$/")->Obj.magic, () => {
      let (s, p) = contribute.contents.createComponentFunc(. state.contents)
      let (s, c) = contribute.contents.createComponentFunc(. s)

      state := s
      parent1 := p
      child1 := c
    })

    \"and"(%re("/^set child(\d+)'s parent to parent(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.parent,
          parent1.contents->Js.Nullable.return->Obj.magic,
        )
    })

    then(%re("/^child(\d+) should have parent$/")->Obj.magic, arg0 => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        child1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.parent,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == parent1.contents
    })
  })

  test(."get parent\'s all children", ({\"when", \"and", then}) => {
    let parent1 = ref(Obj.magic(1))
    let child1 = ref(Obj.magic(2))
    let child2 = ref(Obj.magic(3))

    _getContributeAndCreateAState((\"when", \"and"))

    \"when"(
      %re("/^create three transforms as parent(\d+), child(\d+), child(\d+)$/")->Obj.magic,
      () => {
        let (s, p) = contribute.contents.createComponentFunc(. state.contents)
        let (s, c1) = contribute.contents.createComponentFunc(. s)
        let (s, c2) = contribute.contents.createComponentFunc(. s)

        state := s
        parent1 := p
        child1 := c1
        child2 := c2
      },
    )

    \"and"(%re("/^set child(\d+)'s parent to parent(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.parent,
          parent1.contents->Js.Nullable.return->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s parent to parent(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          child2.contents,
          Meta3dComponentTransformProtocol.Index.dataName.parent,
          parent1.contents->Js.Nullable.return->Obj.magic,
        )
    })

    then(
      %re("/^get parent1's children should return \[child(\d+), child(\d+)\]$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          parent1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.children,
        )
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == [child1.contents, child2.contents]
      },
    )
  })
})
