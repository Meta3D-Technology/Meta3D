type elementState

type dependentExtensionNameMap

// type action

type inputData

type outputData

type skin

// type ioData = {
//   isPointDown: bool,
//   pointPosition: (int, int),
// }

// type imguiData = IMGUIDataType.imguiData

type point<'a> = ('a, 'a)

type ioData = {
  pointUp: bool,
  pointDown: bool,
  pointTap: bool,
  pointPosition: point<int>,
  pointMovementDelta: point<int>,
}

// type drawData = {
//   noTextureDrawData: DrawDataType.noTextureDrawData,
// //   customTextureDrawData: DrawDataType.customTextureDrawData,
// //   fontTextureDrawData: DrawDataType.fontTextureDrawData,
// //   customTextureDrawDataMap: WonderCommonlib.MutableHashMapService.t<
// //     DrawDataType.customTextureDrawData,
// //   >,
// }

type state = {
  elementFuncMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    ElementContributeType.elementName,
    ElementContributeType.elementFunc<elementState>,
  >,
  elementStateMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    ElementContributeType.elementName,
    elementState,
  >,
  elementExecOrderMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    ElementContributeType.elementName,
    ElementContributeType.execOrder,
  >,
  isShowMap: Meta3dCommonlibType.ImmutableHashMapType.t<ElementContributeType.elementName, bool>,
  isStateChangeMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    ElementContributeType.elementName,
    bool,
  >,
  skinContributeMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    SkinContributeType.skinName,
    SkinContributeType.skinContribute<skin>,
  >,
  uiControlContributeMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    UIControlContributeType.uiControlName,
    UIControlContributeType.uiControlContribute<inputData, outputData>,
  >,
  // reducers: array<ElementContributeType.reducerData<elementState, action>>,
  // reducers: array<ElementContributeType.reducerData<elementState, action>>,
  reducers: array<ElementContributeType.reducerData>,
  // drawData: drawData,
  ioData: ioData,
}