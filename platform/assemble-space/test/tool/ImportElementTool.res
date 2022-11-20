let getAndSetElementAssembleData = ElementVisual.Method.getAndSetElementAssembleData

let buildNo = () => ElementVisual.No

let buildLoaded = assembleData => ElementVisual.Loaded(assembleData)

let buildUIControl = (
  ~name="u1",
  ~rect=UIControlInspectorTool.buildRect(),
  ~isDraw=true->FrontendUtils.ElementAssembleStoreType.BoolForIsDraw,
  ~skin=UIControlInspectorTool.buildSkin("skin1"),
  ~event=[],
  ~specific=[],
  ~children=[],
  (),
): FrontendUtils.BackendCloudbaseType.uiControl => {
  name: name,
  rect: rect,
  isDraw: isDraw,
  skin: skin,
  event: event,
  specific: specific,
  children: children,
}

let buildElementAssembleData = (
  ~elementName="e1",
  ~elementVersion="0.0.1",
  ~element=ElementInspectorTool.buildElementInspectorData(list{}, ReducerTool.buildReducers()),
  ~uiControls=[],
  (),
): FrontendUtils.BackendCloudbaseType.elementAssembleData => {
  elementName: elementName,
  elementVersion: elementVersion,
  inspectorData: {
    element: element,
    uiControls: uiControls,
  },
}

let importElement = ElementVisual.Method.importElement
