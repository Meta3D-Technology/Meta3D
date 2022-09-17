open DrawDataType

open Meta3dWebgl1Protocol.ServiceType

open StateType

open Js.Typed_array

let _bufferArrayBufferData = (
  {bindBuffer, bufferFloat32Data, getArrayBuffer, getDynamicDraw},
  (buffer, pointArr),
  gl,
) => {
  bindBuffer(. getArrayBuffer(. gl), buffer, gl)
  bufferFloat32Data(. getArrayBuffer(. gl), Float32Array.make(pointArr), getDynamicDraw(. gl), gl)

  gl
}

let _sendArrayBufferData = (
  {enableVertexAttribArray, vertexAttribPointer, getFloat},
  (location, size),
  gl,
) => {
  enableVertexAttribArray(. location, gl)
  vertexAttribPointer(. location, size, getFloat(. gl), false, 0, 0, gl)

  gl
}

let _bufferElementArrayBufferData = (
  {bindBuffer, getElementArrayBuffer, bufferUint16Data, getDynamicDraw},
  buffer,
  pointArr,
  gl,
) => {
  bindBuffer(. getElementArrayBuffer(. gl), buffer, gl)
  bufferUint16Data(. getElementArrayBuffer(. gl), Uint16Array.make(pointArr), getDynamicDraw(. gl), gl)

  gl
}

// let bufferCustomTextureDataAndSend = (gl, customTextureDrawDataArr, state) => {
//   let {customTextureShaderData} = RecordIMGUIService.unsafeGetWebglData(state)

//   let {
//     positionBuffer,
//     colorBuffer,
//     texCoordBuffer,
//     indexBuffer,
//   }: customTextureShaderData = customTextureShaderData

//   let (drawElementsDataArr, _, totalVerticeArr, totalColorArr, totalTexCoordArr, totalIndexArr) =
//     customTextureDrawDataArr |> WonderCommonlib.ArrayService.reduceOneParam(
//       (.
//         (
//           drawElementsDataArr,
//           countOffset,
//           totalVerticeArr,
//           totalColorArr,
//           totalTexCoordArr,
//           totalIndexArr,
//         ),
//         {
//           customTexture,
//           verticeArr,
//           colorArr,
//           texCoordArr,
//           indexArr,
//         }: DrawDataType.customTextureDrawData,
//       ) => {
//         let count = indexArr |> Js.Array.length

//         switch count {
//         | 0 => (
//             drawElementsDataArr,
//             0,
//             totalVerticeArr,
//             totalColorArr,
//             totalTexCoordArr,
//             totalIndexArr,
//           )
//         | count =>
//           let newCountOffset = countOffset + count * 2

//           (
//             drawElementsDataArr |> ArrayService.push(
//               (
//                 {
//                   customTexture: customTexture,
//                   count: count,
//                   countOffset: countOffset,
//                 }: customTextureDrawElementsData
//               ),
//             ),
//             newCountOffset,
//             totalVerticeArr |> Js.Array.concat(verticeArr),
//             totalColorArr |> Js.Array.concat(colorArr),
//             totalTexCoordArr |> Js.Array.concat(texCoordArr),
//             totalIndexArr |> Js.Array.concat(indexArr),
//           )
//         }
//       },
//       ([], 0, [], [], [], []),
//     )

//   gl
//   |> _bufferArrayBufferData((positionBuffer, totalVerticeArr))
//   |> _sendArrayBufferData((customTextureShaderData.aPositonLocation, 2))
//   |> _bufferArrayBufferData((colorBuffer, totalColorArr))
//   |> _sendArrayBufferData((customTextureShaderData.aColorLocation, 3))
//   |> _bufferArrayBufferData((texCoordBuffer, totalTexCoordArr))
//   |> _sendArrayBufferData((customTextureShaderData.aTexCoordLocation, 2))
//   |> _bufferElementArrayBufferData(indexBuffer, totalIndexArr)
//   |> ignore

//   (state, drawElementsDataArr)
// }

// let bufferFontTextureDataAndSend = (gl, fontTextureDrawData, state) => {
//   let {fontTextureShaderData} = RecordIMGUIService.unsafeGetWebglData(state)

//   let {
//     positionBuffer,
//     colorBuffer,
//     texCoordBuffer,
//     indexBuffer,
//   }: fontTextureShaderData = fontTextureShaderData

//   let {verticeArr, colorArr, texCoordArr, indexArr} = fontTextureDrawData

//   gl
//   |> _bufferArrayBufferData((positionBuffer, verticeArr))
//   |> _sendArrayBufferData((fontTextureShaderData.aPositonLocation, 2))
//   |> _bufferArrayBufferData((colorBuffer, colorArr))
//   |> _sendArrayBufferData((fontTextureShaderData.aColorLocation, 3))
//   |> _bufferArrayBufferData((texCoordBuffer, texCoordArr))
//   |> _sendArrayBufferData((fontTextureShaderData.aTexCoordLocation, 2))
//   |> _bufferElementArrayBufferData(indexBuffer, indexArr)
//   |> ignore

//   (state, ({count: indexArr |> Js.Array.length}: fontTextureDrawElementsData))
// }

let bufferNoTextureDataAndSend = (webgl1Service, gl, {verticeArr, colorArr, indexArr}, state) => {
  let noTextureShaderData = state.noTextureShaderData->Meta3dCommonlib.OptionSt.getExn

  let {positionBuffer, colorBuffer, indexBuffer} = noTextureShaderData

  gl
  ->_bufferArrayBufferData(webgl1Service, (positionBuffer, verticeArr), _)
  ->_sendArrayBufferData(webgl1Service, (noTextureShaderData.aPositonLocation, 2), _)
  ->_bufferArrayBufferData(webgl1Service, (colorBuffer, colorArr), _)
  ->_sendArrayBufferData(webgl1Service, (noTextureShaderData.aColorLocation, 3), _)
  ->_bufferElementArrayBufferData(webgl1Service, indexBuffer, indexArr, _)
  ->ignore

  (state, ({count: indexArr->Js.Array.length}: noTextureDrawElementsData))
}

// let coloredTexturedVertex = (
//   positionX,
//   positionY,
//   color,
//   (verticeArr, colorArr, texCoordArr),
//   fontTexUvForWhite,
// ) => (
//   verticeArr |> ArrayService.push(positionX) |> ArrayService.push(positionY),
//   colorArr |> DrawDataArrayService.addPoints(color),
//   texCoordArr |> DrawDataArrayService.addPoints(fontTexUvForWhite),
// )

// let coloredNoTexturedVertex = (positionX, positionY, color, (verticeArr, colorArr)) => (
//   verticeArr |> ArrayService.push(positionX) |> ArrayService.push(positionY),
//   colorArr |> DrawDataArrayService.addPoints(color),
// )
