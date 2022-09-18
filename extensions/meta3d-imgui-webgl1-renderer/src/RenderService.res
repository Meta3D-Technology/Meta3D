open Meta3dWebgl1Protocol.ServiceType

open StateType

let createEmptyDrawData = () => {
  noTextureDrawData: {
    verticeArr: [],
    colorArr: [],
    indexArr: [],
  },
  // customTextureDrawData: {
  //   customTexture: None,
  //   verticeArr: [],
  //   colorArr: [],
  //   texCoordArr: [],
  //   indexArr: [],
  // },
  // fontTextureDrawData: {
  //   verticeArr: [],
  //   colorArr: [],
  //   texCoordArr: [],
  //   indexArr: [],
  // },
  // customTextureDrawDataMap: WonderCommonlib.MutableHashMapService.createEmpty(),
}

let _getGl = ({gl}) => {
  gl->Meta3dCommonlib.OptionSt.getExn
}

let _unbindVAO = ({getExtension, bindVertexArrayOES}, gl) =>
  switch getExtension(. "OES_vertex_array_object", gl)->Meta3dCommonlib.OptionSt.fromNullable {
  | Some(ext) => ext->Obj.magic->bindVertexArrayOES(. Js.Nullable.null, _)
  | None => ()
  }

let _backupGlState = (
  {
    getParameter,
    getCurrentProgram,
    getBindingElementArrayBuffer,
    getBindingArrayBuffer,
    isEnabled,
    getDepthTest,
    getBlend,
  },
  gl,
  state,
) => {
  ...state,
  lastWebglData: Some({
    lastProgram: gl
    ->getParameter(. getCurrentProgram(. gl), _)
    ->parameterIntToNullableProgram
    ->Meta3dCommonlib.OptionSt.fromNullable,
    lastElementArrayBuffer: gl
    ->getParameter(. getBindingElementArrayBuffer(. gl), _)
    ->parameterIntToBuffer,
    lastArrayBuffer: gl->getParameter(. getBindingArrayBuffer(. gl), _)->parameterIntToBuffer,
    //   lastTexture: gl
    //   -> getParameter(getBindingTexture2D(. gl), gl)
    //   -> parameterIntToNullableTexture
    //   -> Meta3dCommonlib.OptionSt.fromNullable ,
    lastIsEnableDepthTest: gl->isEnabled(. getDepthTest(. gl), _),
    lastIsEnableBlend: gl->isEnabled(. getBlend(. gl), _),
  }),
}

let _buildAllDrawData = state => {
  //   let fontTextureDrawData = RecordIMGUIService.getFontTextureDrawData(state)
  //   let customTextureDrawDataMap = RecordIMGUIService.getCustomTextureDrawDataMap(state)
  let {noTextureDrawData} = state.drawData->Meta3dCommonlib.OptionSt.getExn

  //   let (_, baseIndex, customTextureDrawDataArr) =
  //     customTextureDrawDataMap
  //     -> WonderCommonlib.MutableHashMapService.getValidValues
  //     -> WonderCommonlib.ArrayService.reduceOneParam(
  //       (.
  //         (lastVerticeArr, baseIndex, resultDrawDataArr),
  //         {verticeArr, indexArr}: DrawDataType.customTextureDrawData as drawData,
  //       ) => {
  //         let baseIndex = DrawDataArrayService.getBaseIndex(lastVerticeArr) + baseIndex

  //         (
  //           verticeArr,
  //           baseIndex,
  //           resultDrawDataArr -> ArrayService.push({
  //             ...drawData,
  //             indexArr: indexArr -> Js.Array.map(index => index + baseIndex),
  //           }),
  //         )
  //       },
  //       ([], 0, []),
  //     )

  //   (state, customTextureDrawDataArr, fontTextureDrawData, noTextureDrawData)
  (state, noTextureDrawData)
}

let _setGlState = (
  {disable, getDepthTest, enable, getBlend, blendFunc, getSrcAlpha, getOneMinusSrcAlpha},
  gl,
) => {
  /* no depth testing; we handle this by manually placing out widgets in the order we wish them to be rendered. */
  disable(. getDepthTest(. gl), gl)

  /* for text rendering, enable alpha blending. */
  enable(. getBlend(. gl), gl)
  blendFunc(. getSrcAlpha(. gl), getOneMinusSrcAlpha(. gl), gl)
}

let _drawElements = ({drawElements, getTriangles, getUnsignedShort}, count, countOffset, gl) =>
  count === 0
    ? gl
    : {
        drawElements(. getTriangles(. gl), count, getUnsignedShort(. gl), countOffset, gl)

        gl
      }

let _drawNoTexture = (webgl1Service, drawElementData: DrawDataType.noTextureDrawElementsData, gl) =>
  _drawElements(webgl1Service, drawElementData.count, 0, gl)

let _renderNoTexture = ({useProgram} as webgl1Service, noTextureDrawData, state, gl) => {
  let noTextureShaderData = state.noTextureShaderData->Meta3dCommonlib.OptionSt.getExn

  useProgram(. noTextureShaderData.program, gl)

  let (state, noTextureDrawElementData) = BufferDataIMGUIService.bufferNoTextureDataAndSend(
    webgl1Service,
    gl,
    noTextureDrawData,
    state,
  )

  gl->_drawNoTexture(webgl1Service, noTextureDrawElementData, _)
}

let _restoreGlState = (
  {
    bindBuffer,
    getElementArrayBuffer,
    getArrayBuffer,
    useProgram,
    enable,
    getDepthTest,
    getBlend,
    disable,
  },
  state,
  gl,
) => {
  let {
    lastProgram,
    lastElementArrayBuffer,
    lastArrayBuffer,
    // lastTexture,
    lastIsEnableDepthTest,
    lastIsEnableBlend,
  } = state.lastWebglData->Meta3dCommonlib.OptionSt.getExn

  bindBuffer(. getElementArrayBuffer(. gl), lastElementArrayBuffer, gl)

  bindBuffer(. getArrayBuffer(. gl), lastArrayBuffer, gl)

  switch lastProgram {
  | Some(lastProgram) => useProgram(. lastProgram, gl)
  | None => ()
  }

  //   switch lastTexture {
  //   | Some(lastTexture) => bindTexture(getTexture2D(. gl), lastTexture, gl)
  //   | None => ()
  //   }

  lastIsEnableDepthTest ? enable(. getDepthTest(. gl), gl) : disable(. getDepthTest(. gl), gl)

  lastIsEnableBlend ? enable(. getBlend(. gl), gl) : disable(. getBlend(. gl), gl)

  state
}

let render = (state, meta3dState, webgl1Service: Meta3dWebgl1Protocol.ServiceType.service) => {
  let gl = state.gl->Meta3dCommonlib.OptionSt.getExn

  /*
   If a VAO is already bound, we need to unbound it. Otherwise, we will write into a VAO created by the user of the library
   when calling vertexAttribPointer, which means that we would effectively corrupt the user data!
 */
  _unbindVAO(webgl1Service, gl)

  /*
   We are changing some GL states when rendering the GUI. So before rendering we backup these states,
   and after rendering we restore these states. This is so that the end-user does not involuntarily have his
   GL-states messed with.
 */
  let state = _backupGlState(webgl1Service, gl, state)

  //   let (state, customTextureDrawDataArr, fontTextureDrawData, noTextureDrawData) =
  //     state -> _buildAllDrawData
  let (state, noTextureDrawData) = state->_buildAllDrawData

  //   let {
  //     customTextureShaderData,
  //     fontTextureShaderData,
  //     noTextureShaderData,
  //   } = RecordIMGUIService.unsafeGetWebglData(state)
  let {noTextureShaderData} = state

  _setGlState(webgl1Service, gl)

  gl
  //   -> _renderCustomTextures(customTextureDrawDataArr, state, _)
  //   -> _renderFontTexture(fontTextureDrawData, state, _)
  ->_renderNoTexture(webgl1Service, noTextureDrawData, state, _)
  ->_restoreGlState(webgl1Service, state, _)
  ->ignore

/*!
fix by meta3d
*/
  let state = {
    ...state,
    drawData: createEmptyDrawData()->Some,
  }

  state
}
