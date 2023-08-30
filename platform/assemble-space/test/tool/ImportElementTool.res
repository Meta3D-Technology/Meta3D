let getAndSetElementAssembleData = ElementVisual.Method.getAndSetElementAssembleData

let buildNo = () => ElementVisual.No

let buildLoaded = assembleData => ElementVisual.Loaded(assembleData)

let buildUIControl = (
  ~displayName="u1",
  ~rect=UIControlInspectorTool.buildRect(),
  ~isDraw=true->FrontendUtils.ElementAssembleStoreType.BoolForIsDraw,
  ~event=[],
  ~specific=[],
  ~children=[],
  (),
): FrontendUtils.BackendCloudbaseType.uiControl => {
  displayName,
  rect,
  isDraw,
  event,
  specific,
  children,
}

let buildElementAssembleData = (
  ~elementName="e1",
  ~elementVersion="0.0.1",
  ~uiControls=[],
  (),
): FrontendUtils.BackendCloudbaseType.elementAssembleData => {
  elementName,
  elementVersion,
  inspectorData: {
    uiControls,
  },
}

let importElement = ElementVisual.Method.importElement
