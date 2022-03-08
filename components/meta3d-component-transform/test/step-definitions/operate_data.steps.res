open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/operate_data.feature")

defineFeature(feature, test => {
  let contribute: ref<
    Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
      Meta3dComponentTransformProtocol.Index.state,
      Meta3dComponentTransformProtocol.Index.config,
      Meta3dComponentTransformProtocol.Index.dataNameType,
      Meta3dComponentTransformProtocol.Index.transform,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))

  let _getDefaultPosition = () => [0., 0., 0.]

  let _addPosition = (pos1, pos2) => {
    [pos1[0] +. pos2[0], pos1[1] +. pos2[1], pos1[2] +. pos2[2]]
  }

  let _minusPosition = (pos1, pos2) => {
    [pos1[0] -. pos2[0], pos1[1] -. pos2[1], pos1[2] -. pos2[2]]
  }

  let _getContributeAndCreateAState = ((\"when", \"and")) => {
    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := StateTool.createState(~contribute=contribute.contents, ())
    })
  }
  test(."change parent\'s localPosition should affect children", ({\"when", \"and", then}) => {
    let parent1 = ref(Obj.magic(1))
    let child1 = ref(Obj.magic(2))
    let pos1 = [1., 2., 3.]
    let pos2 = [5., 10., 30.]

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
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
          pos2->Obj.magic,
        )
    })

    \"and"(%re("/^set parent(\d+)'s local position to pos(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          parent1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
          pos2->Obj.magic,
        )
    })

    then(%re("/^get parent(\d+)'s local position should return pos(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        parent1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.localPosition,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == pos2
    })

    \"and"(%re("/^get parent(\d+)'s position should return pos(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        parent1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.position,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == pos2
    })

    \"and"(%re("/^get child(\d+)'s local position should return pos(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        child1.contents,
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
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.position,
        )
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == _addPosition(pos2, pos2)
      },
    )
  })

  test(."change child\'s localPosition should not affect parent", ({\"when", \"and", then}) => {
    let parent1 = ref(Obj.magic(1))
    let child1 = ref(Obj.magic(2))
    let pos1 = [1., 2., 3.]
    let pos2 = [5., 10., 30.]

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
          child1.contents,
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
          pos1->Obj.magic,
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

    \"and"(%re("/^get child(\d+)'s local position should return pos(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        child1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.localPosition,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == pos1
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
        ->expect == _addPosition(pos1, pos1)
      },
    )
  })

  test(."get the position in world coordinate system", ({\"when", \"and", then}) => {
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

    then(%re("/^get child(\d+)'s position should return pos(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        child1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.position,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == pos1
    })
  })

  test(."change parent\'s position should affect children", ({\"when", \"and", then}) => {
    let parent1 = ref(Obj.magic(1))
    let child1 = ref(Obj.magic(2))
    let pos1 = [1., 2., 3.]
    let pos2 = [5., 10., 30.]

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
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
          pos2->Obj.magic,
        )
    })

    \"and"(%re("/^set parent(\d+)'s position to pos(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          parent1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.position,
          pos2->Obj.magic,
        )
    })

    then(%re("/^get parent(\d+)'s local position should return pos(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        parent1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.localPosition,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == pos2
    })

    \"and"(%re("/^get parent(\d+)'s position should return pos(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        parent1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.position,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == pos2
    })

    \"and"(%re("/^get child(\d+)'s local position should return pos(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        child1.contents,
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
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.position,
        )
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == _addPosition(pos2, pos2)
      },
    )
  })

  test(."change child\'s position should not affect parent", ({\"when", \"and", then}) => {
    let parent1 = ref(Obj.magic(1))
    let child1 = ref(Obj.magic(2))
    let pos1 = [1., 2., 3.]
    let pos2 = [5., 10., 30.]
    let pos3 = [2., 3., 4.]

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
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
          pos2->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s position to pos(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.position,
          pos3->Obj.magic,
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
      %re("/^get child(\d+)'s local position should return pos(\d+) - pos(\d+)$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
        )
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == _minusPosition(pos3, pos1)
      },
    )

    \"and"(%re("/^get child(\d+)'s position should return pos(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        child1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.position,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == pos3
    })
  })

  test(."get the rotation in world coordinate system", ({\"when", \"and", then}) => {
    let parent1 = ref(Obj.magic(1))
    let child1 = ref(Obj.magic(2))
    let rotation1 = [1., 2., 3., 2.5]

    _getContributeAndCreateAState((\"when", \"and"))

    \"when"(%re("/^create two transforms as parent(\d+), child(\d+)$/")->Obj.magic, () => {
      let (s, p) = contribute.contents.createComponentFunc(. state.contents)
      let (s, c) = contribute.contents.createComponentFunc(. s)

      state := s
      parent1 := p
      child1 := c
    })

    \"and"(%re("/^set parent(\d+)'s local rotation to rotation(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          parent1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localRotation,
          rotation1->Obj.magic,
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

    then(%re("/^get child(\d+)'s rotation should return rotation(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        child1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.rotation,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == rotation1
    })
  })

  test(."change parent\'s rotation should affect children", ({\"when", \"and", then}) => {
    let parent1 = ref(Obj.magic(1))
    let child1 = ref(Obj.magic(2))
    let rotation1 = [1., 2., 3., 2.5]
    let rotation2 = [5., 10.5, 30., 1.]

    _getContributeAndCreateAState((\"when", \"and"))

    \"when"(%re("/^create two transforms as parent(\d+), child(\d+)$/")->Obj.magic, () => {
      let (s, p) = contribute.contents.createComponentFunc(. state.contents)
      let (s, c) = contribute.contents.createComponentFunc(. s)

      state := s
      parent1 := p
      child1 := c
    })

    \"and"(%re("/^set parent(\d+)'s local rotation to rotation(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          parent1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localRotation,
          rotation1->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s local rotation to rotation(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localRotation,
          rotation2->Obj.magic,
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

    \"and"(%re("/^set parent(\d+)'s rotation to rotation(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          parent1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.rotation,
          rotation2->Obj.magic,
        )
    })

    then(%re("/^get parent(\d+)'s local rotation should return rotation(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        parent1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.localRotation,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == rotation2
    })

    \"and"(%re("/^get parent(\d+)'s rotation should return rotation(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        parent1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.rotation,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == rotation2
    })

    \"and"(
      %re("/^get child(\d+)'s local rotation should return rotation(\d+)$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localRotation,
        )
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == rotation2
      },
    )

    \"and"(%re("/^get child(\d+)'s rotation should return rotation(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        child1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.rotation,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == [-14.148975834432052, -29.71284925230731, -84.89385500659232, 1462.650035039141]
    })
  })

  test(."change child\'s rotation should not affect parent", ({\"when", \"and", then}) => {
    let parent1 = ref(Obj.magic(1))
    let child1 = ref(Obj.magic(2))
    let rotation1 = [1., 2., 3., 1.]
    let rotation2 = [5.5, 10., 30., 2.]
    let rotation3 = [2.5, 3.5, 4.5, 1.]

    _getContributeAndCreateAState((\"when", \"and"))

    \"when"(%re("/^create two transforms as parent(\d+), child(\d+)$/")->Obj.magic, () => {
      let (s, p) = contribute.contents.createComponentFunc(. state.contents)
      let (s, c) = contribute.contents.createComponentFunc(. s)

      state := s
      parent1 := p
      child1 := c
    })

    \"and"(%re("/^set parent(\d+)'s local rotation to rotation(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          parent1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localRotation,
          rotation1->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s local rotation to rotation(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localRotation,
          rotation2->Obj.magic,
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

    \"and"(%re("/^set child(\d+)'s rotation to rotation(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.rotation,
          rotation3->Obj.magic,
        )
    })

    then(%re("/^get parent(\d+)'s local rotation should return rotation(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        parent1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.localRotation,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == rotation1
    })

    \"and"(%re("/^get parent(\d+)'s rotation should return rotation(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        parent1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.rotation,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == rotation1
    })

    \"and"(
      %re("/^get child(\d+)'s local rotation should return rotation(\d+)$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localRotation,
        )
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == [0.7745966911315918, -0.3872983455657959, 0.7745966911315918, 6.196773529052734]
      },
    )

    \"and"(%re("/^get child(\d+)'s rotation should return rotation(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        child1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.rotation,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == [6.826419538772125, 8.489076950779234, 6.460195134263704, -10.027219687210458]
    })
  })

  test(."get the euler angles in world coordinate system", ({\"when", \"and", then}) => {
    let parent1 = ref(Obj.magic(1))
    let child1 = ref(Obj.magic(2))
    let eulerAngles = [45., 45., 90.]

    _getContributeAndCreateAState((\"when", \"and"))

    \"when"(%re("/^create two transforms as parent(\d+), child(\d+)$/")->Obj.magic, () => {
      let (s, p) = contribute.contents.createComponentFunc(. state.contents)
      let (s, c) = contribute.contents.createComponentFunc(. s)

      state := s
      parent1 := p
      child1 := c
    })

    \"and"(%re("/^set parent(\d+)'s local euler angles to euler angles(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          parent1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localEulerAngles,
          eulerAngles->Obj.magic,
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

    then(
      %re("/^get child(\d+)'s euler angles should return euler angles(\d+)$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.eulerAngles,
        )
        ->Obj.magic
        ->Meta3dCommonlib.NullableTool.map(Meta3dCommonlib.Vector3Tool.truncate)
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == eulerAngles
      },
    )
  })

  test(."change parent\'s euler angles should affect children", ({\"when", \"and", then}) => {
    let parent1 = ref(Obj.magic(1))
    let child1 = ref(Obj.magic(2))
    let eulerAngles1 = [1., 2., 3.5]
    let eulerAngles2 = [5., 10.5, 30.]

    _getContributeAndCreateAState((\"when", \"and"))

    \"when"(%re("/^create two transforms as parent(\d+), child(\d+)$/")->Obj.magic, () => {
      let (s, p) = contribute.contents.createComponentFunc(. state.contents)
      let (s, c) = contribute.contents.createComponentFunc(. s)

      state := s
      parent1 := p
      child1 := c
    })

    \"and"(%re("/^set parent(\d+)'s local euler angles to euler angles(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          parent1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localEulerAngles,
          eulerAngles1->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s local euler angles to euler angles(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localEulerAngles,
          eulerAngles2->Obj.magic,
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

    \"and"(%re("/^set parent(\d+)'s euler angles to euler angles(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          parent1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.eulerAngles,
          eulerAngles2->Obj.magic,
        )
    })

    then(
      %re("/^get parent(\d+)'s local euler angles should return euler angles(\d+)$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          parent1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localEulerAngles,
        )
        ->Obj.magic
        ->Meta3dCommonlib.NullableTool.map(Meta3dCommonlib.Vector3Tool.truncate)
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == eulerAngles2
      },
    )

    \"and"(
      %re("/^get parent(\d+)'s euler angles should return euler angles(\d+)$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          parent1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.eulerAngles,
        )
        ->Obj.magic
        ->Meta3dCommonlib.NullableTool.map(Meta3dCommonlib.Vector3Tool.truncate)
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == eulerAngles2
      },
    )

    \"and"(
      %re("/^get child(\d+)'s local euler angles should return euler angles(\d+)$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localEulerAngles,
        )
        ->Obj.magic
        ->Meta3dCommonlib.NullableTool.map(Meta3dCommonlib.Vector3Tool.truncate)
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == eulerAngles2
      },
    )

    \"and"(
      %re("/^get child(\d+)'s euler angles should return euler angles(\d+)$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.eulerAngles,
        )
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == [14.953095317535913, 16.95073623912726, 61.91119956447435]
      },
    )
  })

  test(."change child\'s euler angles should not affect parent", ({\"when", \"and", then}) => {
    let parent1 = ref(Obj.magic(1))
    let child1 = ref(Obj.magic(2))
    let eulerAngles1 = [1., 2., 3.]
    let eulerAngles2 = [5.5, 10., 30.]
    let eulerAngles3 = [2.5, 3.5, 4.5]

    _getContributeAndCreateAState((\"when", \"and"))

    \"when"(%re("/^create two transforms as parent(\d+), child(\d+)$/")->Obj.magic, () => {
      let (s, p) = contribute.contents.createComponentFunc(. state.contents)
      let (s, c) = contribute.contents.createComponentFunc(. s)

      state := s
      parent1 := p
      child1 := c
    })

    \"and"(%re("/^set parent(\d+)'s local euler angles to euler angles(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          parent1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localEulerAngles,
          eulerAngles1->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s local euler angles to euler angles(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localEulerAngles,
          eulerAngles2->Obj.magic,
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

    \"and"(%re("/^set child(\d+)'s euler angles to euler angles(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.eulerAngles,
          eulerAngles3->Obj.magic,
        )
    })

    then(
      %re("/^get parent(\d+)'s local euler angles should return euler angles(\d+)$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          parent1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localEulerAngles,
        )
        ->Obj.magic
        ->Meta3dCommonlib.NullableTool.map(Meta3dCommonlib.Vector3Tool.truncate)
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == eulerAngles1
      },
    )

    \"and"(
      %re("/^get parent(\d+)'s euler angles should return euler angles(\d+)$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          parent1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.eulerAngles,
        )
        ->Obj.magic
        ->Meta3dCommonlib.NullableTool.map(Meta3dCommonlib.Vector3Tool.truncate)
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == eulerAngles1
      },
    )

    \"and"(
      %re("/^get child(\d+)'s local euler angles should return euler angles(\d+)$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localEulerAngles,
        )
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == [1.447625368958481, 1.5265914288412556, 1.471299291762878]
      },
    )

    \"and"(
      %re("/^get child(\d+)'s euler angles should return euler angles(\d+)$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.eulerAngles,
        )
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == [2.4999999977068192, 3.4999998866913646, 4.500000058177029]
      },
    )
  })

  test(."get the scale in world coordinate system", ({\"when", \"and", then}) => {
    let parent1 = ref(Obj.magic(1))
    let child1 = ref(Obj.magic(2))
    let scale1 = [1., 2., 3.]

    _getContributeAndCreateAState((\"when", \"and"))

    \"when"(%re("/^create two transforms as parent(\d+), child(\d+)$/")->Obj.magic, () => {
      let (s, p) = contribute.contents.createComponentFunc(. state.contents)
      let (s, c) = contribute.contents.createComponentFunc(. s)

      state := s
      parent1 := p
      child1 := c
    })

    \"and"(%re("/^set parent(\d+)'s local scale to scale(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          parent1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localScale,
          scale1->Obj.magic,
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

    then(%re("/^get child(\d+)'s scale should return scale(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        child1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.scale,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == scale1
    })
  })

  test(."change parent\'s scale should affect children", ({\"when", \"and", then}) => {
    let parent1 = ref(Obj.magic(1))
    let child1 = ref(Obj.magic(2))
    let scale1 = [1., 2., 3.]
    let scale2 = [5., 10., 30.]

    let _multiply = (scale1, scale2) => {
      [scale1[0] *. scale2[0], scale1[1] *. scale2[1], scale1[2] *. scale2[2]]
    }

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

    \"and"(%re("/^set parent(\d+)'s local scale to scale(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          parent1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localScale,
          scale1->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s local scale to scale(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localScale,
          scale2->Obj.magic,
        )
    })

    \"and"(%re("/^set parent(\d+)'s scale to scale(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          parent1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.scale,
          scale2->Obj.magic,
        )
    })

    then(%re("/^get parent(\d+)'s local scale should return scale(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        parent1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.localScale,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == scale2
    })

    \"and"(%re("/^get parent(\d+)'s scale should return scale(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        parent1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.scale,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == scale2
    })

    \"and"(%re("/^get child(\d+)'s local scale should return scale(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        child1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.localScale,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == scale2
    })

    \"and"(
      %re("/^get child(\d+)'s scale should return scale(\d+) \* scale(\d+)$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.scale,
        )
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == _multiply(scale2, scale2)
      },
    )
  })

  test(."change child\'s scale should not affect parent", ({\"when", \"and", then}) => {
    let parent1 = ref(Obj.magic(1))
    let child1 = ref(Obj.magic(2))
    let scale1 = [1., 2., 3.]
    let scale2 = [5., 10., 30.]
    let scale3 = [2., 3., 4.]

    let _divid = (scale1, scale2) => {
      [scale1[0] /. scale2[0], scale1[1] /. scale2[1], scale1[2] /. scale2[2]]
    }

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

    \"and"(%re("/^set parent(\d+)'s local scale to scale(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          parent1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localScale,
          scale1->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s local scale to scale(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localScale,
          scale2->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s scale to scale(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.scale,
          scale3->Obj.magic,
        )
    })

    then(%re("/^get parent(\d+)'s local scale should return scale(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        parent1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.localScale,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == scale1
    })

    \"and"(%re("/^get parent(\d+)'s scale should return scale(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        parent1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.scale,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == scale1
    })

    \"and"(
      %re("/^get child(\d+)'s local scale should return scale(\d+) \/ scale(\d+)$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localScale,
        )
        ->Obj.magic
        ->Meta3dCommonlib.NullableTool.map(Meta3dCommonlib.Vector3Tool.truncate)
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == _divid(scale3, scale1)->Meta3dCommonlib.ArrayTool.truncate
      },
    )

    \"and"(%re("/^get child(\d+)'s scale should return scale(\d+)$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        child1.contents,
        Meta3dComponentTransformProtocol.Index.dataName.scale,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == scale3
    })
  })

  test(.
    "the second transform\'s default localToWorldMatrix should be identity matrix4 when create two transforms",
    ({\"when", \"and", then}) => {
      let transform1 = ref(Obj.magic(1))
      let transform2 = ref(Obj.magic(2))

      _getContributeAndCreateAState((\"when", \"and"))

      \"when"(%re("/^create two transforms as transform(\d+), transform(\d+)$/")->Obj.magic, () => {
        let (s, t1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, t2) = contribute.contents.createComponentFunc(. s)

        state := s
        transform1 := t1
        transform2 := t2
      })

      then(
        %re(
          "/^get transform(\d+)'s localToWorldMatrix should return identity matrix(\d+)$/"
        )->Obj.magic,
        () => {
          contribute.contents.getComponentDataFunc(.
            state.contents,
            transform2.contents,
            Meta3dComponentTransformProtocol.Index.dataName.localToWorldMatrix,
          )
          ->Meta3dCommonlib.NullableTool.getExn
          ->expect == Meta3dCommonlib.Matrix4.createIdentityMatrix4()
        },
      )
    },
  )

  test(."get the data from Float32Array may not equal to the value which is setted", ({
    \"when",
    \"and",
    then,
  }) => {
    let transform = ref(Obj.magic(1))

    _getContributeAndCreateAState((\"when", \"and"))

    \"when"("create a transform", () => {
      let (s, t) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      transform := t
    })

    \"and"(%re("/^set the transform's local position to (.*), (.*), (.*)$/")->Obj.magic, () => {
      let arguments =
        %external(arguments)->Meta3dCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          transform.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition,
          arguments->Js.Array.slice(~start=0, ~end_=3, _)->Obj.magic,
        )
    })

    then(%re("/^get the transform's local position to (.*), (.*), (.*)$/")->Obj.magic, () => {
      let arguments =
        %external(arguments)->Meta3dCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      contribute.contents.getComponentDataFunc(.
        state.contents,
        transform.contents,
        Meta3dComponentTransformProtocol.Index.dataName.localPosition,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == arguments->Js.Array.slice(~start=0, ~end_=3, _)
    })
  })

  test(."get normal matrix", ({\"when", \"and", then}) => {
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

    \"and"(%re("/^set parent(\d+)'s local rotation to (.*), (.*), (.*), (.*)$/")->Obj.magic, () => {
      let arguments =
        %external(arguments)->Meta3dCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          parent1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localRotation,
          arguments->Js.Array.slice(~start=1, ~end_=5, _)->Obj.magic,
        )
    })

    \"and"(%re("/^set child(\d+)'s local rotation to (.*), (.*), (.*), (.*)$/")->Obj.magic, () => {
      let arguments =
        %external(arguments)->Meta3dCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localRotation,
          arguments->Js.Array.slice(~start=1, ~end_=5, _)->Obj.magic,
        )
    })

    \"and"(%re("/^update child(\d+)$/")->Obj.magic, () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.update,
          Js.Nullable.null->Obj.magic,
        )
    })

    then(
      %re(
        "/^get child(\d+)'s normal matrix should (.*), (.*),(.*),(.*),(.*),(.*),(.*),(.*),(.*)$/"
      )->Obj.magic,
      () => {
        let arguments =
          %external(arguments)->Meta3dCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

        contribute.contents.getComponentDataFunc(.
          state.contents,
          child1.contents,
          Meta3dComponentTransformProtocol.Index.dataName.normalMatrix,
        )
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect ==
          Js.Typed_array.Float32Array.make(arguments->Js.Array.slice(~start=1, ~end_=10, _))
      },
    )
  })
})
