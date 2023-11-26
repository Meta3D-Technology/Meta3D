open Js.Typed_array

let _generateId = random => {
  //   (random() *. 1000000.0)->Js.Math.floor_int->Js.Int.toString
  (random() *. 10000000.0)->Js.Math.floor_int
}

let _isArrayBuffer = %raw(`
function (data){
return data instanceof ArrayBuffer
}
`)

let _isOutsideImmutableData = data => {
  _isArrayBuffer(data)
}

let _generateEventDataBuffer = (
  random,
  allEvents: array<Meta3dEventDataProtocol.ServiceType.eventData>,
): ArrayBuffer.t => {
  let encoder = Meta3d.TextEncoder.newTextEncoder()

  let (outsideImmutableDataIdArr, outsideImmutableDataArr, newAllEvents) =
    allEvents->Meta3dCommonlib.ArraySt.reduceOneParam(
      (.
        (outsideImmutableDataIdArr, outsideImmutableDataArr, newAllEvents),
        {inputData} as eventData,
      ) => {
        let (outsideImmutableDataIdArr, outsideImmutableDataArr, newInputData) =
          inputData->Meta3dCommonlib.ArraySt.reduceOneParam(
            (.
              (outsideImmutableDataIdArr, outsideImmutableDataArr, newInputData),
              singleInputData,
            ) => {
              _isOutsideImmutableData(singleInputData)
                ? {
                    let id = _generateId(random)

                    (
                      outsideImmutableDataIdArr->Meta3dCommonlib.ArraySt.push(id),
                      outsideImmutableDataArr->Meta3dCommonlib.ArraySt.push(singleInputData),
                      newInputData->Meta3dCommonlib.ArraySt.push(id),
                    )
                  }
                : {
                    (
                      outsideImmutableDataIdArr,
                      outsideImmutableDataArr,
                      newInputData->Meta3dCommonlib.ArraySt.push(singleInputData->Obj.magic),
                    )
                  }
            },
            (outsideImmutableDataIdArr, outsideImmutableDataArr, []),
          )

        (
          outsideImmutableDataIdArr,
          outsideImmutableDataArr,
          newAllEvents->Meta3dCommonlib.ArraySt.push({
            ...eventData,
            inputData: newInputData->Obj.magic,
          }),
        )
      },
      ([], [], []),
    )

  Meta3d.BinaryFileOperator.generate([
    Meta3d.TextEncoder.encodeUint8Array(newAllEvents->Obj.magic->Js.Json.stringify, encoder),
    Meta3d.TextEncoder.encodeUint8Array(
      outsideImmutableDataIdArr->Obj.magic->Js.Json.stringify,
      encoder,
    ),
    outsideImmutableDataArr
    ->Meta3dCommonlib.ArraySt.map(data => data->Obj.magic->Uint8Array.fromBuffer)
    ->Meta3d.BinaryFileOperator.generate
    ->Uint8Array.fromBuffer,
  ])
}

let export = (allEvents: array<Meta3dEventDataProtocol.ServiceType.eventData>) => {
  allEvents->Meta3dCommonlib.ArraySt.length == 0
    ? ()
    : Meta3dFileUtils.DownloadUtils.createAndDownloadBlobFile(
        _generateEventDataBuffer(Js.Math.random, allEvents),
        "eventData",
        "arraybuffer",
      )
}
