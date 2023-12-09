// let getAndSetElementAssembleData = ElementVisual.Method.getAndSetElementAssembleData

// let buildNo = () => ElementVisual.No

// let buildLoaded = assembleData => ElementVisual.Loaded(assembleData)

let convertInput = input => {
  input->Meta3dCommonlib.OptionSt.toNullable
}

let convertEvent = event => {
  event
}

let inConvertInput = input => {
  input->Meta3dCommonlib.OptionSt.fromNullable
}

let inConvertEvent = event => {
  event
}

let buildUIControl = (
  ~protocolName="p1",
  ~protocolVersion="^0.0.1",
  ~displayName="u1",
  ~rect=UIControlInspectorTool.buildRect(),
  ~isDraw=true->FrontendUtils.CommonType.BoolForIsDraw,
  ~input=None,
  ~event=[],
  ~specific=[],
  ~children=[],
  (),
): FrontendUtils.BackendCloudbaseType.uiControl => {
  protocol: {
    name: protocolName,
    version: protocolVersion,
  },
  displayName,
  rect,
  isDraw,
  input: input->convertInput,
  event: event->convertEvent,
  specific,
  children,
}

let buildElementAssembleData = (
  ~account="u1",
  ~elementName="e1",
  ~elementVersion="0.0.1",
  ~uiControls=[],
  ~customInputs=[],
  (),
): FrontendUtils.BackendCloudbaseType.elementAssembleData => {
  account,
  elementName,
  elementVersion,
  inspectorData: {
    uiControls: uiControls,
  },
  customInputs,
}

let importElement = ElementVisual.Method.importElement
