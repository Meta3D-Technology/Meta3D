open Meta3dUiProtocol.IMGUIDataType

let init = (
  meta3dState,
  (api: Meta3dType.Index.api, imguiRendererExtensionName),
  isDebug,
  canvas,
) => {
  let imguiRendererState = api.getExtensionState(. meta3dState, imguiRendererExtensionName)

  let imguiRendererService: Meta3dImguiRendererProtocol.ServiceType.service = api.getExtensionService(.
    meta3dState,
    imguiRendererExtensionName,
  )

  let imguiRendererState = imguiRendererService.init(
    imguiRendererState,
    meta3dState,
    isDebug,
    canvas,
  )

  let meta3dState = api.setExtensionState(.
    meta3dState,
    imguiRendererExtensionName,
    imguiRendererState,
  )

  meta3dState
}

let _createEmptyDrawData = () => {
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

let createData = () => {
  // assetData: {
  //   fntId: "fnt",
  //   bitmapId: "bitmap",
  //   fntDataMap: WonderCommonlib.MutableHashMapService.createEmpty(),
  //   bitmapMap: WonderCommonlib.MutableHashMapService.createEmpty(),
  //   customImageArr: [],
  //   customTextureMap: WonderCommonlib.MutableHashMapService.createEmpty(),
  //   settedAssetData: RecordAssetIMGUIService.createSettedAssetData(),
  // },
  // fontData: None,
  // webglData: None,
  drawData: _createEmptyDrawData(),
  /* controlData: {
       radioButtonData: {
         isSelectedMap: WonderCommonlib.MutableHashMapService.createEmpty(),
       },
       checkboxData: {
         index: 0,
         isSelectedMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
       },
       sliderData: {
         index: 0,
         valueMap: WonderCommonlib.MutableSparseMapService.createEmpty(),
       },
     }, */
  ioData: {
    pointUp: false,
    pointDown: false,
    pointPosition: (0, 0),
    pointMovementDelta: (0, 0),
  },
  // execData: {
  //   apiJsObj: _buildAPIJsObj() |> Obj.magic,
  //   execFuncDataArr: WonderCommonlib.ArrayService.createEmpty(),
  // },
  // layoutData: {
  //   groupData: {
  //     positionArr: [],
  //     index: 0,
  //   },
  // },
  // extendData: {
  //   customControlData: {
  //     apiJsObj: ExtendAPIJsObjIMGUIService.createAPIJsObj() |> Obj.magic,
  //     funcMap: WonderCommonlib.ImmutableHashMapService.createEmpty(),
  //   },
  //   skinData: {
  //     allSkinDataMap: WonderCommonlib.ImmutableHashMapService.createEmpty(),
  //   },
  // },
}
