let _getImportDataEventName = () => "ImportDataEvent"

// let buildAllEventsOnlyHasImportDataEvent = (editorWholeService: Meta3dEditorWholeProtocol.ServiceType.service , meta3dState, sceneGLB) => {
let buildAllEventsOnlyHasImportDataEvent = (
  sceneGLB: Js.Typed_array.ArrayBuffer.t,
  assetData: Js.Nullable.t<Js.Typed_array.ArrayBuffer.t>,
): array<Meta3dEventDataProtocol.ServiceType.eventData> => {
  // let eventSourcingService = editorWholeService.event( meta3dState).eventSourcing(meta3dState)-> Obj.magic

  // eventSourcingService["createAllEvents"](.
  //   [
  //     {
  //       "name": _getImportDataEventName(),
  //       "isOnlyRead": false,
  //       "inputData": [sceneGLB],
  //     },
  //   ],
  //   meta3dState,
  // )["toArray"](.)

  [
    {
      name: _getImportDataEventName(),
      isOnlyRead: false->Meta3dCommonlib.NullableSt.return,
      inputData: [sceneGLB->Obj.magic, assetData->Obj.magic],
    },
  ]
}

let exportEventData = ExportEventData.export

let generateEventDataBuffer = ExportEventData.generateEventDataBuffer
