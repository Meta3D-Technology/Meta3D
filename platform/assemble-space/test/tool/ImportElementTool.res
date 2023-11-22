// let getAndSetElementAssembleData = ElementVisual.Method.getAndSetElementAssembleData

// let buildNo = () => ElementVisual.No

// let buildLoaded = assembleData => ElementVisual.Loaded(assembleData)

let convertInput = input => {
  input
  ->Meta3dCommonlib.OptionSt.map((
    {inputName, inputFileStr}: FrontendUtils.ElementAssembleStoreType.input,
  ): FrontendUtils.BackendCloudbaseType.input => {
    inputName,
    inputFileStr: inputFileStr->Meta3dCommonlib.OptionSt.toNullable,
  })
  ->Meta3dCommonlib.OptionSt.toNullable
}

let convertEvent = event => {
  event->Meta3dCommonlib.ArraySt.map((
    {eventName, actionName, actionFileStr}: FrontendUtils.ElementAssembleStoreType.eventData,
  ): FrontendUtils.BackendCloudbaseType.eventData => {
    eventName,
    actionName,
    actionFileStr: actionFileStr->Meta3dCommonlib.OptionSt.toNullable,
  })
}

let inConvertInput = input => {
  input
  ->Meta3dCommonlib.NullableSt.map((.
    {inputName, inputFileStr}: FrontendUtils.BackendCloudbaseType.input,
  ): FrontendUtils.ElementAssembleStoreType.input => {
    inputName,
    inputFileStr: inputFileStr->Meta3dCommonlib.OptionSt.fromNullable,
  })
  ->Meta3dCommonlib.OptionSt.fromNullable
}

let inConvertEvent = event => {
  event->Meta3dCommonlib.ArraySt.map((
    {eventName, actionName, actionFileStr}: FrontendUtils.BackendCloudbaseType.eventData,
  ): FrontendUtils.ElementAssembleStoreType.eventData => {
    eventName,
    actionName,
    actionFileStr: actionFileStr->Meta3dCommonlib.OptionSt.fromNullable,
  })
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
  (),
): FrontendUtils.BackendCloudbaseType.elementAssembleData => {
  account,
  elementName,
  elementVersion,
  inspectorData: {
    uiControls: uiControls,
  },
}

let importElement = ElementVisual.Method.importElement
