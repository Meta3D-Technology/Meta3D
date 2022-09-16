type elementState

type dependentExtensionNameMap

type action

type inputData

type outputData

type buttonStyle

type ioData = {
  isPointDown: bool,
  pointPosition: (int, int),
}

type imguiData = IMGUIDataType.imguiData

type state = {
  elementFuncMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    ElementContributeType.elementName,
    ElementContributeType.elementFunc,
  >,
  elementStateMap: Meta3dCommonlibType.ImmutableHashMapType.t<ElementContributeType.elementName, elementState>,
  elementExecOrderMap: Meta3dCommonlibType.ImmutableHashMapType.t<ElementContributeType.elementName, ElementContributeType.execOrder>,
  isShowMap: Meta3dCommonlibType.ImmutableHashMapType.t<ElementContributeType.elementName, bool>,
  isStateChangeMap: Meta3dCommonlibType.ImmutableHashMapType.t<ElementContributeType.elementName, bool>,
  skinContributeMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    SkinContributeType.skinName,
    SkinContributeType.skinContribute<buttonStyle>,
  >,
  customControlContributeMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    CustomControlContributeType.customControlName,
    CustomControlContributeType.customControlContribute<inputData, outputData>,
  >,
  ioData: option<ioData>,
  reducers: array<ElementContributeType.reducerData<elementState, action>>,
  imguiData: imguiData
}
