let buildReducers = (~role=None, ~handlers=list{}, ()): FrontendUtils.UIViewStoreType.reducers => {
  role: role,
  handlers: handlers,
}

let buildHandler = (
  actionName,
  updatedElementStateFieldName,
): FrontendUtils.UIViewStoreType.reducerHandler => {
  {
    actionName: actionName,
    updatedElementStateFieldName: updatedElementStateFieldName,
  }
}
