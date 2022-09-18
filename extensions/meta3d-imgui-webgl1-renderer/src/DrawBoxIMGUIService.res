open StateType

open DrawDataType

let draw = ({ x, y, width, height }: Meta3dImguiRendererProtocol.ServiceType.rect, color:Meta3dImguiRendererProtocol.ServiceType.color, state) => {
  let {noTextureDrawData} as drawData = state.drawData->Meta3dCommonlib.OptionSt.getExn
let {verticeArr, colorArr, indexArr} = noTextureDrawData

  let baseIndex = DrawDataArrayService.getBaseIndex(verticeArr)

  {
    ...state,
    drawData: {
      ...drawData,
      noTextureDrawData: {
        verticeArr: verticeArr -> DrawDataArrayService.addPoints([
          x,
          y,
          x,
          y +. height,
          x +. width,
          y,
          x +. width,
          y +. height,
        ]),
        colorArr: colorArr -> DrawDataArrayService.addPoints(
          DrawDataArrayService.concatArrays([color, color, color, color]),
        ),
        indexArr: indexArr -> DrawDataArrayService.addPoints([
          baseIndex,
          baseIndex + 1,
          baseIndex + 2,
          baseIndex + 3,
          baseIndex + 2,
          baseIndex + 1,
        ]),
      },
    } -> Some,
  }
}
