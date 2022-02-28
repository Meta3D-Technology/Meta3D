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
    IElement.elementName,
    IElement.elementFunc,
  >,
  execStateMap: Meta3dCommonlibType.ImmutableHashMapType.t<IElement.elementName, elementState>,
  isShowMap: Meta3dCommonlibType.ImmutableHashMapType.t<IElement.elementName, bool>,
  isStateChangeMap: Meta3dCommonlibType.ImmutableHashMapType.t<IElement.elementName, bool>,
  skinContributeMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    ISkin.skinName,
    ISkin.skinContribute<buttonStyle>,
  >,
  customControlContributeMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    ICustomControl.customControlName,
    ICustomControl.customControlContribute<inputData, outputData>,
  >,
  ioData: option<ioData>,
  reducers: array<IElement.reducerData<elementState, action>>,
}
