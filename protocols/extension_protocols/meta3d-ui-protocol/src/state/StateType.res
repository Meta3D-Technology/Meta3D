type elementState

type dependentExtensionNameMap

type inputData

type outputData

type skin

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
  reducers: array<ElementContributeType.reducerData>,
}
