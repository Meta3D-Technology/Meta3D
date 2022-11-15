let buildReducers = (~role="", ~handlers=[], ()): Meta3dUi2Protocol.ElementContributeType.reducers => {
  role: role,
  handlers: handlers,
}
