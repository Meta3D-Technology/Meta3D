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

type state = {
  execFuncMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    ElementContributeType.elementName,
    ElementContributeType.elementFunc,
  >,
  execStateMap: Meta3dCommonlibType.ImmutableHashMapType.t<ElementContributeType.elementName, elementState>,
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
}
