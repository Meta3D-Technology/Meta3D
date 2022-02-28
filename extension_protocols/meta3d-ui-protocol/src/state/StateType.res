type ioData = {
  isPointDown: bool,
  pointPosition: (int, int),
}

type state = {
  execFuncMap: Meta3dCommonlibType.ImmutableHashMapType.t<IElement.elementName, IElement.elementFunc>,
  execStateMap: Meta3dCommonlibType.ImmutableHashMapType.t<IElement.elementName, IElement.elementState>,
  isShowMap: Meta3dCommonlibType.ImmutableHashMapType.t<IElement.elementName, bool>,
  isStateChangeMap: Meta3dCommonlibType.ImmutableHashMapType.t<IElement.elementName, bool>,
  skinContributeMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    ISkin.skinName,
    ISkin.skinContribute<ISkin.buttonStyle>,
  >,
  customControlContributeMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    ICustomControl.customControlName,
    ICustomControl.customControlContribute<ICustomControl.inputData, ICustomControl.outputData>,
  >,
  ioData: option<ioData>,
  reducers: array<IElement.reducerData<IElement.elementState, IElement.action>>,
}
