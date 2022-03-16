open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/clone.feature")

defineFeature(feature, test => {
  let contribute: ref<
    Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
      StateType.state,
      Meta3dComponentPbrmaterialProtocol.Index.config,
      Meta3dComponentPbrmaterialProtocol.Index.dataNameType,
      Meta3dComponentPbrmaterialProtocol.Index.needDisposedComponents,
      Meta3dComponentPbrmaterialProtocol.Index.batchDisposeData,
      Meta3dComponentPbrmaterialProtocol.Index.cloneConfig,
      Meta3dComponentPbrmaterialProtocol.Index.pbrMaterial,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))
  let clonedPBRMaterials = ref([])

  let _buildCloneConfig = (
    ~isShare=false,
    (),
  ): Meta3dComponentPbrmaterialProtocol.Index.cloneConfig => {
    isShare: isShare,
  }

  let _getContributeAndCreateAState = ((\"when", \"and")) => {
    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := StateTool.createState(~contribute=contribute.contents, ())
    })
  }

  test(."cloned one is source one", ({given, \"when", \"and", then}) => {
    let pbrMaterial = ref(Obj.magic(1))

    _getContributeAndCreateAState((\"when", \"and"))

    given("create a pbrMaterial", () => {
      let (s, t) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      pbrMaterial := t
    })

    \"when"("clone 2 shared pbrMaterials", () => {
      let (s, c) = contribute.contents.cloneComponentFunc(.
        state.contents,
        Meta3dCommonlib.CloneTool.buildCountRange(2),
        _buildCloneConfig(~isShare=true, ()),
        pbrMaterial.contents,
      )

      state := s
      clonedPBRMaterials := c
    })

    then("get 2 cloned pbrMaterials should be source one", () => {
      clonedPBRMaterials.contents->expect == [pbrMaterial.contents, pbrMaterial.contents]
    })
  })

  test(."cloned one is new created one", ({given, \"when", \"and", then}) => {
    let pbrMaterial = ref(Obj.magic(1))

    _getContributeAndCreateAState((\"when", \"and"))

    given("create a pbrMaterial", () => {
      let (s, t) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      pbrMaterial := t
    })

    \"when"("clone 2 not shared pbrMaterials", () => {
      let (s, c) = contribute.contents.cloneComponentFunc(.
        state.contents,
        Meta3dCommonlib.CloneTool.buildCountRange(2),
        _buildCloneConfig(~isShare=false, ()),
        pbrMaterial.contents,
      )

      state := s
      clonedPBRMaterials := c
    })

    then("get 2 cloned pbrMaterials should return created ones", () => {
      clonedPBRMaterials.contents->expect == [pbrMaterial.contents + 1, pbrMaterial.contents + 2]
    })
  })

  test(."set cloned pbrMaterial's diffuse color by source pbrMaterial's diffuse color", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let pbrMaterial = ref(Obj.magic(1))
    let d1 = [1., 2., 3.]

    _getContributeAndCreateAState((\"when", \"and"))

    given("create a pbrMaterial", () => {
      let (s, t) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      pbrMaterial := t
    })

    \"and"("set the pbrMaterial's diffuse color to d1", () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          pbrMaterial.contents,
          Meta3dComponentPbrmaterialProtocol.Index.dataName.diffuseColor,
          d1->Obj.magic,
        )
    })

    \"when"("clone 2 not shared pbrMaterials", () => {
      let (s, c) = contribute.contents.cloneComponentFunc(.
        state.contents,
        Meta3dCommonlib.CloneTool.buildCountRange(2),
        _buildCloneConfig(),
        pbrMaterial.contents,
      )

      state := s
      clonedPBRMaterials := c
    })

    then("get 2 cloned pbrMaterials' diffuse color should return d1, d1", () => {
      (
        contribute.contents.getComponentDataFunc(.
          state.contents,
          clonedPBRMaterials.contents[0],
          Meta3dComponentPbrmaterialProtocol.Index.dataName.diffuseColor,
        )->Meta3dCommonlib.NullableTool.getExn,
        contribute.contents.getComponentDataFunc(.
          state.contents,
          clonedPBRMaterials.contents[1],
          Meta3dComponentPbrmaterialProtocol.Index.dataName.diffuseColor,
        )->Meta3dCommonlib.NullableTool.getExn,
      )->expect == (d1, d1)
    })
  })

  test(."set cloned pbrMaterial's specular by source pbrMaterial's specular", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let pbrMaterial = ref(Obj.magic(1))
    let s1 = 2.

    _getContributeAndCreateAState((\"when", \"and"))

    given("create a pbrMaterial", () => {
      let (s, t) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      pbrMaterial := t
    })

    \"and"("set the pbrMaterial's specular to s1", () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          pbrMaterial.contents,
          Meta3dComponentPbrmaterialProtocol.Index.dataName.specular,
          s1->Obj.magic,
        )
    })

    \"when"("clone 2 not shared pbrMaterials", () => {
      let (s, c) = contribute.contents.cloneComponentFunc(.
        state.contents,
        Meta3dCommonlib.CloneTool.buildCountRange(2),
        _buildCloneConfig(),
        pbrMaterial.contents,
      )

      state := s
      clonedPBRMaterials := c
    })

    then("get 2 cloned pbrMaterials' specular should return s1, s1", () => {
      (
        contribute.contents.getComponentDataFunc(.
          state.contents,
          clonedPBRMaterials.contents[0],
          Meta3dComponentPbrmaterialProtocol.Index.dataName.specular,
        )->Meta3dCommonlib.NullableTool.getExn,
        contribute.contents.getComponentDataFunc(.
          state.contents,
          clonedPBRMaterials.contents[1],
          Meta3dComponentPbrmaterialProtocol.Index.dataName.specular,
        )->Meta3dCommonlib.NullableTool.getExn,
      )->expect == (s1, s1)
    })
  })
})
