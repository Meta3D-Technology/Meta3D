type ioData = {
  isPointDown: bool,
  pointPosition: (int, int),
}

type state = {
  execFuncMap: Meta3dCommonlibType.ImmutableHashMapType.t<UIType.id, UIType.registeredExecFunc>,
  execStateMap: Meta3dCommonlibType.ImmutableHashMapType.t<UIType.id, UIType.execState>,
  isShowMap: Meta3dCommonlibType.ImmutableHashMapType.t<UIType.id, bool>,
  isStateChangeMap: Meta3dCommonlibType.ImmutableHashMapType.t<UIType.id, bool>,
  ioData: option<ioData>,
  reducers: array<UIType.reducerData<UIType.execState, UIType.action>>,
}
