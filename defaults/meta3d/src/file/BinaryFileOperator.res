open Js.Typed_array

let _buildEmptyEncodedUint8Data = () => {
  let encoder = TextEncoder.newTextEncoder()
  let emptyUint8DataArr = encoder->TextEncoder.encodeUint8Array(" ", _)

  TypeArrayUtils.getUint8_1(0, emptyUint8DataArr)
}

let _writeHeader = (dataLength, byteLengthArr, dataView) => {
  let byteOffset = 0->DataViewCommon.writeUint32_1(dataLength, dataView)

  byteLengthArr->Meta3dCommonlib.ArraySt.reduceOneParam((. byteOffset, byteLength) => {
    byteOffset->DataViewCommon.writeUint32_1(byteLength, dataView)
  }, byteOffset)
}

let _writeDataArr = (
  byteOffset,
  dataArr,
  alignedByteLengthArr,
  emptyEncodedUint8Data,
  dataView,
) => {
  dataArr->Meta3dCommonlib.ArraySt.reduceOneParami((. byteOffset, data, index) => {
    BufferUtils.copyUint8ArrayToArrayBuffer(
      byteOffset,
      (emptyEncodedUint8Data, alignedByteLengthArr->Meta3dCommonlib.ArraySt.getExn(index), data),
      dataView,
    )
  }, byteOffset)
}

let _getDataLengthByteLengthInHeader = () => {
  4
}

let _getDataByteOffsetInHeader = dataIndex => {
  _getDataLengthByteLengthInHeader() + dataIndex * 4
}

let _getHeaderByteLength = dataLength => {
  _getDataLengthByteLengthInHeader() + dataLength * 4
}

let generate = (dataArr: array<Uint8Array.t>): ArrayBuffer.t => {
  let dataLength = dataArr->Meta3dCommonlib.ArraySt.length

  let (totalByteLength, byteLengthArr, alignedByteLengthArr) =
    dataArr->Meta3dCommonlib.ArraySt.reduceOneParam(
      (. (totalByteLength, byteLengthArr, alignedByteLengthArr), data) => {
        let byteLength = data->Uint8Array.byteLength
        let alignedByteLength = byteLength->BufferUtils.alignedLength

        (
          totalByteLength + alignedByteLength,
          byteLengthArr->Meta3dCommonlib.ArraySt.push(byteLength),
          alignedByteLengthArr->Meta3dCommonlib.ArraySt.push(alignedByteLength),
        )
      },
      (_getHeaderByteLength(dataLength), [], []),
    )

  let binaryFile = ArrayBuffer.make(totalByteLength)
  let dataView = DataViewCommon.create(binaryFile)

  let byteOffset =
    _writeHeader(dataLength, byteLengthArr, dataView)->_writeDataArr(
      dataArr,
      alignedByteLengthArr,
      _buildEmptyEncodedUint8Data(),
      dataView,
    )

  binaryFile
}

let load = (binaryFile: ArrayBuffer.t): array<Uint8Array.t> => {
  let dataView = DataViewCommon.create(binaryFile)

  let (dataLength, _) = DataViewCommon.getUint32_1(. 0, dataView)

  Meta3dCommonlib.ArraySt.range(0, dataLength - 1)
  ->Meta3dCommonlib.ArraySt.reduceOneParam((. (byteOffset, uint8ArrayResult), dataIndex) => {
    let (byteLength, _byteOffset) = DataViewCommon.getUint32_1(.
      _getDataByteOffsetInHeader(dataIndex),
      dataView,
    )

    (
      byteOffset + byteLength->BufferUtils.alignedLength,
      uint8ArrayResult->Meta3dCommonlib.ArraySt.push(
        Uint8Array.fromBuffer(
          ArrayBuffer.slice(
            binaryFile,
            ~start=_getHeaderByteLength(dataLength) + byteOffset,
            ~end_=_getHeaderByteLength(dataLength) + byteOffset + byteLength,
          ),
        ),
      ),
    )
  }, (0, []))
  ->Meta3dCommonlib.Tuple2.getLast
}
