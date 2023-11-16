type elementState

type dependentExtensionProtocolNameMap

type data

type inputFunc

type specificData

type outputData

type uiControlState

type skin

type textureID = string

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
  // elementUIControlStatesMap: Meta3dCommonlibType.ImmutableHashMapType.t<
  //   ElementContributeType.elementName,
  //   ElementContributeType.uiControlStates,
  // >,
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
    UIControlContributeType.uiControlContribute<inputFunc, specificData, outputData>
  >,
  uiControlStateMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    UIControlContributeType.uiControlName,
    uiControlState,
  >,
  inputContributeMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    InputContributeType.inputName,
    InputContributeType.inputContribute<data>,
  >,
  // reducers: array<ElementContributeType.reducerData>,
  currentElementName: option<ElementContributeType.elementName>,
  fboTextureMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    textureID,
    Meta3dImguiRendererProtocol.ServiceType.texture,
  >,
}
