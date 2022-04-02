open BufferDirectionLightUtils

let getColor = (index, typeArr) =>
  Meta3dCommonlib.TypeArrayUtils.getFloat3Tuple(getColorIndex(index), typeArr)

let getIntensity = (index, typeArr) =>
  Meta3dCommonlib.TypeArrayUtils.getFloat1(getIntensityIndex(index), typeArr)
