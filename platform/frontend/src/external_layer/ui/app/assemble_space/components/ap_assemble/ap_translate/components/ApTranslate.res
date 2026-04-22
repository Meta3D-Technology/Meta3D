open Antd
%%raw("import 'antd/dist/reset.css'")
open AssembleSpaceType

module Method = {
  let translate = (
    dispatch,
    selectedUIControlInspectorData: ElementAssembleStoreType.selectedUIControlInspectorData,
  ) => {
    // let labels =
    //   selectedUIControlInspectorData
    //   ->Meta3dCommonlib.ListSt.filter(d => {
    //     d.specific
    //     ->Meta3dCommonlib.ArraySt.find(s => {
    //       s.name == "label"
    //     })
    //     ->Meta3dCommonlib.OptionSt.isSome
    //   })
    //   ->Meta3dCommonlib.ListSt.map(d => {
    //     let s =
    //       d.specific
    //       ->Meta3dCommonlib.ArraySt.find(s => {
    //         s.name == "label"
    //       })
    //       ->Meta3dCommonlib.OptionSt.getExn

    //     (s.value->SpecificUtils.getSpecificDataValue->Obj.magic->Js.String.split("##", _))[0]
    //   })

    let labels = HierachyUtils.reduceAllSelectedUIControlData(
      [],
      (result, data: ElementAssembleStoreType.uiControlInspectorData) => {
        switch data.specific->Meta3dCommonlib.ArraySt.find(s => {
          s.name == "label"
        }) {
        | Some(s) =>
          result->Meta3dCommonlib.ArraySt.push(
            (s.value->SpecificUtils.getSpecificDataValue->Obj.magic->Js.String.split("##", _))[0],
          )
        | None => result
        }
      },
      (data: ElementAssembleStoreType.uiControlInspectorData) => data.children,
      selectedUIControlInspectorData,
    )

    let items = HierachyUtils.reduceAllSelectedUIControlData(
      [],
      (result, data: ElementAssembleStoreType.uiControlInspectorData) => {
        switch data.specific->Meta3dCommonlib.ArraySt.find(s => {
          s.name == "items"
        }) {
        | Some(s) =>
          result->Meta3dCommonlib.ArraySt.push(
            s.value->SpecificUtils.getSpecificDataValue->Obj.magic,
          )
        | None => result
        }
      },
      (data: ElementAssembleStoreType.uiControlInspectorData) => data.children,
      selectedUIControlInspectorData,
    )

    let inputParams = HierachyUtils.reduceAllSelectedUIControlData(
      [],
      (result, data: ElementAssembleStoreType.uiControlInspectorData) => {
        switch data.input {
        | Some(i) => result->Meta3dCommonlib.ArraySt.push(i.inputParams)
        | None => result
        }
      },
      (data: ElementAssembleStoreType.uiControlInspectorData) => data.children,
      selectedUIControlInspectorData,
    )

    // let inputParams =
    //   selectedUIControlInspectorData
    //   ->Meta3dCommonlib.ListSt.filter(d => {
    //     d.input
    //     ->Meta3dCommonlib.ArraySt.find(s => {
    //       s.name == "label"
    //     })
    //     ->Meta3dCommonlib.OptionSt.isSome
    //   })
    //   ->Meta3dCommonlib.ListSt.map(d => {
    //     let s =
    //       d.specific
    //       ->Meta3dCommonlib.ArraySt.find(s => {
    //         s.name == "label"
    //       })
    //       ->Meta3dCommonlib.OptionSt.getExn

    //     (s.value->Obj.magic->Js.String.split("##", _))[0]
    //   })

    Meta3dCommonlib.Log.log(labels)
    Meta3dCommonlib.Log.log(items)

    Meta3dCommonlib.Log.log(inputParams)

    let translatedLabels = [
      "Menu Bar",
      "Window",
      "Tab",
      "Window",
      "Select Type",
      "Select Model",
      "Image",
      "Set Unit Properties",
      "Model",
      "Close",
      "Grid",
      "Unit Properties",
      "Close",
      "Excitement",
      "Defense",
      "Armor Coverage",
      "Armor Strength",
      "Attack Power",
      "Attack Speed Factor",
      "Critical Factor",
      "Health",
      "Move Speed",
      "Accuracy",
      "Height",
      "Window",
      "Add Skill",
      "For Small Units",
      "Select Action",
      "Image",
      "Action",
      "Close",
      "Grid",
      "Set Action Properties",
      "Action Properties",
      "Close",
      "Attack Rate",
      "Volume",
      "Select Damage Type",
      "Select Damage Effect",
      "Damage Effect",
      "Close",
      "List",
      "Clear Damage Effect",
      "Dynamic Damage Effect",
      "Set Damage Properties",
      "Damage Properties",
      "Close",
      "Power",
      "Armor Penetration",
      "Critical Rate",
      "Select Hit Effect",
      "Hit Effect",
      "Close",
      "Grid",
      "Clear Hit Effect",
      "Dynamic Multi-Text",
      "Window",
      "Select Ammo Type",
      "Select Particle Type",
      "Particle Type",
      "Close",
      "Grid",
      "Image",
      "Select Instance Type",
      "Instance",
      "Close",
      "Grid",
      "Image",
      "Set Ammo Properties",
      "Ammo Properties",
      "Close",
      "Speed",
      "Range",
      "Display Size",
      "Collision Size",
      "Explosion Radius",
      "Clear Emission Effect",
      "Select Emission Effect",
      "Emission Effect",
      "Close",
      "Grid",
      "Dynamic Multi-Text",
      "For Large Units",
      "Select Action",
      "Image",
      "Action",
      "Close",
      "Grid",
      "Set Action Properties",
      "Action Properties",
      "Close",
      "Attack Rate",
      "Volume",
      "Select Damage Type",
      "Select Damage Effect",
      "Damage Effect",
      "Close",
      "List",
      "Clear Damage Effect",
      "Dynamic Damage Effect",
      "Set Damage Properties",
      "Damage Properties",
      "Close",
      "Power",
      "Armor Penetration",
      "Critical Rate",
      "Select Hit Effect",
      "Hit Effect",
      "Close",
      "Grid",
      "Clear Hit Effect",
      "Dynamic Multi-Text",
      "Window",
      "Select Ammo Type",
      "Select Particle Type",
      "Particle Type",
      "Close",
      "Grid",
      "Image",
      "Select Instance Type",
      "Instance",
      "Close",
      "Grid",
      "Image",
      "Set Ammo Properties",
      "Ammo Properties",
      "Close",
      "Speed",
      "Range",
      "Display Size",
      "Collision Size",
      "Explosion Radius",
      "Clear Emission Effect",
      "Select Emission Effect",
      "Emission Effect",
      "Close",
      "Grid",
      "Dynamic Multi-Text",
      "Window",
      "Behaviour Mode",
      "Behaviour Mode Data",
      "Idle Mode",
      "Idle Mode Data",
      "Approach Attack Target Mode",
      "Approach Attack Target Mode Data",
      "Attack Mode",
      "Ranged Attack Mode",
      "Window",
      "Clear Trait",
      "Select Trait",
      "Trait",
      "Close",
      "List",
      "Dynamic Unit Traits",
      "Window",
      "Gem",
      "Coin",
      "Experience",
      "Select Item",
      "Clear Item",
      "Item",
      "Close",
      "List",
      "Dynamic Reward Items",
      "Window",
      "Set Spawn Data",
      "Attack City Level",
      "Clear Spawn Data",
      "Add Spawn Data",
      "Dynamic Scene Data",
      "Clear Spawn Data",
      "Add Spawn Data",
      "Dynamic Scene Data",
      "Defend City Level",
      "Clear Spawn Data",
      "Add Spawn Data",
      "Dynamic Scene Data",
      "Clear Spawn Data",
      "Add Spawn Data",
      "Dynamic Scene Data",
      "Boss Level",
      "Clear Spawn Data",
      "Add Spawn Data",
      "Dynamic Scene Data",
      "Clear Spawn Data",
      "Add Spawn Data",
      "Dynamic Scene Data",
      "Publish Modal",
      "Info Modal",
    ]
    let translatedItems = Js.Json.parseExn(`[

  [

    ["Publish", { "Publish to Game": "UnitModShowPublishModal" }],

    ["Test", { "Quick Test": "UnitModQuickTest", "Enter Game (Debug Mode)": "ModJumpToGameDebug", "Enter Game": "ModJumpToGame" }]

  ],

  [

    ["Model", "Model"],

    ["Skill", "Skill"],

    ["Behaviour", "Behaviour"],

    ["Feature", "Feature"],

    ["Reward", "Reward"],

    ["Generate", "Generate"]

  ]

]`)
    let translatedInputParams = Js.Json.parseExn(`[
  ["UnitModInit", "currentTabKey", "Model"],
  null,
  [],
  [],
  ["UnitModInit", "isShowModelModal"],
  null,
  ["UnitModInit", "isShowUnitValueModal"],
  ["UnitModInit", "excitement"],
  ["UnitModInit", "defenseFactor"],
  ["UnitModInit", "armorRatio"],
  ["UnitModInit", "armorStrength"],
  ["UnitModInit", "attackFactor"],
  ["UnitModInit", "emitSpeedFactor", "2.6"],
  ["UnitModInit", "critRatioFactor"],
  ["UnitModInit", "hp"],
  ["UnitModInit", "moveSpeed"],
  ["UnitModInit", "emitPrecision", "0.2"],
  ["UnitModInit", "scale"],
  ["UnitModInit", "currentTabKey", "Skill"],
  [],
  ["UnitModInit", "hasSmallSkillObject"],
  ["Action"],
  ["selectedSmallSkillObjectActionIndex"],
  ["selectedSmallSkillObjectActionIndex"],
  ["UnitModInit", "isShowSmallSkillModal"],
  ["isShowSmallSkillModal"],
  [],
  ["UnitModInit", "isShowSmallSkillObjectActionValueModal"],
  ["UnitModInit", "s_emitSpeed", "560"],
  ["UnitModInit", "s_volume"],
  ["Damage"],
  [],
  ["UnitModInit", "isShowSmallSkillObjectDamageEffectModal"],
  ["s_damageEffects", "selectedSmallSkillObjectActionIndex"],
  ["s_damageEffects"],
  ["UnitModInit", "isShowSmallSkillObjectDamageValueModal"],
  ["UnitModInit", "s_force"],
  ["UnitModInit", "s_armorPiercingForceRatio"],
  ["UnitModInit", "s_critRatio"],
  ["UnitModInit", "isShowSmallSkillObjectSubEffectModal"],
  ["selectedSmallSkillObjectActionIndex", "s_hit_subEffects"],
  ["s_hit_subEffects"],
  ["selectedSmallSkillObjectActionIndex"],
  [],
  ["s_emitterType"],
  ["UnitModInit", "isShowSmallSkillObjectEmitterParticleImageModal"],
  ["allEmitterParticleImages", "false"],
  ["allEmitterParticleImages", "selectedSmallSkillObjectEmitterParticleImageIndex"],
  ["allEmitterParticleImages", "selectedSmallSkillObjectEmitterParticleImageIndex", "false"],
  ["s_emitterType"],
  ["UnitModInit", "isShowSmallSkillObjectEmitterInstanceModal"],
  ["allEmitterInstances", "true"],
  ["allEmitterInstances", "selectedSmallSkillObjectEmitterInstanceIndex"],
  ["allEmitterInstances", "selectedSmallSkillObjectEmitterInstanceIndex", "true"],
  ["UnitModInit", "isShowSmallSkillObjectEmitterValueModal"],
  ["UnitModInit", "s_emitterSpeed"],
  ["UnitModInit", "s_emitterLife"],
  ["UnitModInit", "s_emitterSize"],
  ["UnitModInit", "s_emitterCollisionSize"],
  ["UnitModInit", "s_explodeRange"],
  ["UnitModInit", "isShowSmallSkillObjectEmitterSubEffectModal"],
  ["selectedSmallSkillObjectActionIndex", "s_emitter_subEffects"],
  ["s_emitter_subEffects"],
  ["UnitModInit", "hasBigSkillObject"],
  ["Action"],
  ["selectedBigSkillObjectActionIndex"],
  ["selectedBigSkillObjectActionIndex"],
  ["UnitModInit", "isShowBigSkillModal"],
  ["isShowBigSkillModal"],
  [],
  ["UnitModInit", "isShowBigSkillObjectActionValueModal"],
  ["UnitModInit", "b_emitSpeed", "560"],
  ["UnitModInit", "b_volume"],
  ["Damage"],
  [],
  ["UnitModInit", "isShowBigSkillObjectDamageEffectModal"],
  ["b_damageEffects", "selectedBigSkillObjectActionIndex"],
  ["b_damageEffects"],
  ["UnitModInit", "isShowBigSkillObjectDamageValueModal"],
  ["UnitModInit", "b_force"],
  ["UnitModInit", "b_armorPiercingForceRatio"],
  ["UnitModInit", "b_critRatio"],
  ["UnitModInit", "isShowBigSkillObjectSubEffectModal"],
  ["selectedBigSkillObjectActionIndex", "b_hit_subEffects"],
  ["b_hit_subEffects"],
  ["selectedBigSkillObjectActionIndex"],
  [],
  ["b_emitterType"],
  ["UnitModInit", "isShowBigSkillObjectEmitterParticleImageModal"],
  ["allEmitterParticleImages", "false"],
  ["allEmitterParticleImages", "selectedBigSkillObjectEmitterParticleImageIndex"],
  ["allEmitterParticleImages", "selectedBigSkillObjectEmitterParticleImageIndex", "false"],
  ["b_emitterType"],
  ["UnitModInit", "isShowBigSkillObjectEmitterInstanceModal"],
  ["allEmitterInstances", "true"],
  ["allEmitterInstances", "selectedBigSkillObjectEmitterInstanceIndex"],
  ["allEmitterInstances", "selectedBigSkillObjectEmitterInstanceIndex", "true"],
  ["UnitModInit", "isShowBigSkillObjectEmitterValueModal"],
  ["UnitModInit", "b_emitterSpeed"],
  ["UnitModInit", "b_emitterLife"],
  ["UnitModInit", "b_emitterSize"],
  ["UnitModInit", "b_emitterCollisionSize"],
  ["UnitModInit", "b_explodeRange"],
  ["UnitModInit", "isShowBigSkillObjectEmitterSubEffectModal"],
  ["selectedBigSkillObjectActionIndex", "b_emitter_subEffects"],
  ["b_emitter_subEffects"],
  ["UnitModInit", "currentTabKey", "Behaviour"],
  ["behaviourMode"],
  ["behaviourMode"],
  ["idleMode"],
  ["idleMode"],
  ["nearAttackTargetMode"],
  ["nearAttackTargetMode"],
  ["attackMode"],
  ["remoteAttackMode"],
  ["UnitModInit", "currentTabKey", "Feature"],
  ["UnitModInit", "isShowFeatureModal"],
  [],
  [],
  ["UnitModInit", "currentTabKey", "Reward"],
  ["UnitModInit", "gem"],
  ["UnitModInit", "coin"],
  ["UnitModInit", "experienceValue"],
  ["UnitModInit", "isShowPropModal"],
  [],
  [],
  ["UnitModInit", "currentTabKey", "Generate"],
  [],
  ["UnitModInit", "hasAttackCitySceneChapterGenerateData"],
  ["For Small Units"],
  ["ac_l_sceneData"],
  ["For Giantess Units"],
  ["ac_g_sceneData"],
  ["UnitModInit", "hasProtectCitySceneChapterGenerateData"],
  ["For Small Units"],
  ["pc_l_sceneData"],
  ["For Giantess Units"],
  ["pc_g_sceneData"],
  ["UnitModInit", "hasBossSceneChapterGenerateData"],
  ["For Small Units"],
  ["bo_l_sceneData"],
  ["For Giantess Units"],
  ["bo_g_sceneData"],
  [],
  []
]`)

    let index = ref(0)

    let selectedUIControlInspectorData = HierachyUtils.mapAllSelectedUIControlData(
      (data: ElementAssembleStoreType.uiControlInspectorData) => {
        {
          ...data,
          specific: data.specific->Meta3dCommonlib.ArraySt.map(s => {
            s.name == "label"
              ? {
                  let newS = {
                    ...s,
                    value: SpecificUtils.convertStringToValue(
                      translatedLabels[index.contents] ++
                      "##" ++
                      (
                        s.value
                        ->SpecificUtils.getSpecificDataValue
                        ->Obj.magic
                        ->Js.String.split("##", _)
                      )[1],
                      #string,
                    )->CommonType.SpecicFieldDataValue,
                  }

                  index := index.contents + 1

                  newS
                }
              : s
          }),
        }
      },
      (
        (data: ElementAssembleStoreType.uiControlInspectorData) => data.children,
        (data: ElementAssembleStoreType.uiControlInspectorData, children) => {
          ...data,
          children,
        },
      ),
      selectedUIControlInspectorData,
    )

    let index = ref(0)

    let selectedUIControlInspectorData = HierachyUtils.mapAllSelectedUIControlData(
      (data: ElementAssembleStoreType.uiControlInspectorData) => {
        {
          ...data,
          specific: data.specific->Meta3dCommonlib.ArraySt.map(s => {
            s.name == "items"
              ? {
                  let newS = {
                    ...s,
                    value: SpecificUtils.convertStringToValue(
                      (translatedItems->Obj.magic)[index.contents],
                      #string,
                    )->CommonType.SpecicFieldDataValue,
                  }

                  index := index.contents + 1

                  newS
                }
              : s
          }),
        }
      },
      (
        (data: ElementAssembleStoreType.uiControlInspectorData) => data.children,
        (data: ElementAssembleStoreType.uiControlInspectorData, children) => {
          ...data,
          children,
        },
      ),
      selectedUIControlInspectorData,
    )

    let index = ref(0)

    let selectedUIControlInspectorData = HierachyUtils.mapAllSelectedUIControlData(
      (data: ElementAssembleStoreType.uiControlInspectorData) => {
        {
          ...data,
          input: data.input->Meta3dCommonlib.OptionSt.map(i => {
            let newInput = {
              ...i,
              inputParams: (translatedInputParams->Obj.magic)[index.contents],
            }

            index := index.contents + 1

            newInput
          }),
        }
      },
      (
        (data: ElementAssembleStoreType.uiControlInspectorData) => data.children,
        (data: ElementAssembleStoreType.uiControlInspectorData, children) => {
          ...data,
          children,
        },
      ),
      selectedUIControlInspectorData,
    )

    dispatch(
      ElementAssembleStoreType.UpdateSelectedUIControlInspectorData(selectedUIControlInspectorData),
    )
  }

  let useSelector = ({userCenterState, assembleSpaceState, eventEmitter}: AppStoreType.state) => {
    // let {currentAppName} = userCenterState

    let {elementAssembleState}: AssembleSpaceStoreType.state = assembleSpaceState

    // let {
    //   selectedPackages,
    //   selectedContributes,
    //   apInspectorData,
    //   isPassDependencyGraphCheck,
    //   storedPackageIdsInApp,
    //   isChangeSelectedPackagesByDebug,
    // } = apAssembleState
    let {selectedUIControlInspectorData} = elementAssembleState

    selectedUIControlInspectorData
  }
}

@react.component
let make = (~service: service) => {
  //   ~selectedPackagesFromMarket: selectedPackagesFromMarket,
  //   // ~selectedExtensionsFromMarket: selectedExtensionsFromMarket,
  //   ~selectedContributesFromMarket: selectedContributesFromMarket,

  //   let dispatch = ReduxUtils.ApAssemble.useDispatch(service.react.useDispatch)
  let dispatchForElementAssembleStore = ReduxUtils.ElementAssemble.useDispatch(
    ReactUtils.useDispatchForAssembleSpaceStore,
  )

  let selectedUIControlInspectorData = service.react.useAllSelector(. Method.useSelector)

  <>
    <Button
      onClick={_ => {
        Method.translate(dispatchForElementAssembleStore, selectedUIControlInspectorData)
      }}>
      {React.string(`翻译`)}
    </Button>
  </>
}
