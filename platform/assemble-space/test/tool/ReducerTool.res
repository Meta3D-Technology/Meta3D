let buildReducers = (~role=None, ~handlers=list{}, ()): FrontendUtils.ElementAssembleStoreType.reducers => {
  role: role,
  handlers: handlers,
}

let buildHandler = (
  actionName,
  updatedElementStateFieldName,
): FrontendUtils.ElementAssembleStoreType.reducerHandler => {
  {
    actionName: actionName,
    updatedElementStateFieldName: updatedElementStateFieldName,
  }
}
