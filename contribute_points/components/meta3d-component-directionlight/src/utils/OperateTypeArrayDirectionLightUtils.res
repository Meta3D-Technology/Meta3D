open Meta3dComponentWorkerUtils.BufferDirectionLightUtils

let setColor = (index, data, typeArr) =>
  Meta3dCommonlib.TypeArrayUtils.setFloat3(getColorIndex(index), data, typeArr)

let setIntensity = (index, data, typeArr) =>
  Meta3dCommonlib.TypeArrayUtils.setFloat1(getIntensityIndex(index), data, typeArr)
