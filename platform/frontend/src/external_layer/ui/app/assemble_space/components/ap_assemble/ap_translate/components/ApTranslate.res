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
                      "##"
                      ++
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
