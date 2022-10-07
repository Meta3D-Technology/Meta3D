let buildReducers = (~role=None, ~handlers=list{}, ()): FrontendUtils.UIViewStoreType.reducers => {
  role: role,
  handlers: handlers,
}
