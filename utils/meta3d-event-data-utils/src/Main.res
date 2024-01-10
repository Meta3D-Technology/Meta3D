let _getImportSingleEventEventName = () => "ImportSingleEventEvent"

// let getSingleEventAllEvents = (editorWholeService: Meta3dEditorWholeProtocol.ServiceType.service , meta3dState, sceneGLB) => {
let getSingleEventAllEvents = (sceneGLB: Js.Typed_array.ArrayBuffer.t): array<
  Meta3dEventDataProtocol.ServiceType.eventData,
> => {
  // let eventSourcingService = editorWholeService.event( meta3dState).eventSourcing(meta3dState)-> Obj.magic

  // eventSourcingService["createAllEvents"](.
  //   [
  //     {
  //       "name": _getImportSingleEventEventName(),
  //       "isOnlyRead": false,
  //       "inputData": [sceneGLB],
  //     },
  //   ],
  //   meta3dState,
  // )["toArray"](.)

  [
    {
      name: _getImportSingleEventEventName(),
      isOnlyRead: false->Meta3dCommonlib.NullableSt.return,
      inputData: [sceneGLB->Obj.magic],
    },
  ]
}

let exportEventData = ExportEventData.export

let generateEventDataBuffer = ExportEventData.generateEventDataBuffer
