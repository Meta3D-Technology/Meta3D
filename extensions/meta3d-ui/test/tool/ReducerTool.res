let buildReducers = (~role="", ~handlers=[], ()): Meta3dUiProtocol.ElementContributeType.reducers => {
  role: role,
  handlers: handlers,
}
