type state = {
  execFuncMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    UIType.id,
    UIType.execFunc<UIType.renderData>,
  >,
  execStateMap: Meta3dCommonlibType.ImmutableHashMapType.t<UIType.id, UIType.execState>,
  isRenderMap: Meta3dCommonlibType.ImmutableHashMapType.t<UIType.id, bool>,
}
