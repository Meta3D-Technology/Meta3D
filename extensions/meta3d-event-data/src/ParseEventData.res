open Js.Typed_array

let parse = (eventData: ArrayBuffer.t): array<Meta3dEventDataProtocol.ServiceType.eventData> => {
  let decoder = Meta3d.TextDecoder.newTextDecoder("utf-8")

  let [
    allEventsUint8,
    outsideImmutableDataIdUint8,
    outsideImmutableDataUint8,
  ] = Meta3d.BinaryFileOperator.load(eventData)

  let outsideImmutableDataIdArr =
    Meta3d.TextDecoder.decodeUint8Array(outsideImmutableDataIdUint8, decoder)->Js.Json.parseExn

  let outsideImmutableDataArr =
    outsideImmutableDataUint8
    ->Uint8Array.buffer
    ->Meta3d.BinaryFileOperator.load
    ->Meta3dCommonlib.ArraySt.map(data => data->Uint8Array.buffer)

  Meta3d.TextDecoder.decodeUint8Array(allEventsUint8, decoder)
  ->Js.Json.parseExn
  ->Obj.magic
  ->Meta3dCommonlib.ArraySt.map((eventData: Meta3dEventDataProtocol.ServiceType.eventData) => {
    {
      ...eventData,
      inputData: eventData.inputData->Meta3dCommonlib.ArraySt.map(singleInputData => {
        switch outsideImmutableDataIdArr->Obj.magic->Js.Array.indexOf(singleInputData, _) {
        | -1 => singleInputData
        | index => outsideImmutableDataArr->Obj.magic->Meta3dCommonlib.ArraySt.getExn(index)
        }
      }),
    }
  })
}
