open BufferPBRMaterialUtils

let getDiffuseColor = (index, typeArr) =>
  Meta3dCommonlib.TypeArrayUtils.getFloat3Tuple(getDiffuseColorIndex(index), typeArr)

let getSpecular = (index, typeArr) =>
  Meta3dCommonlib.TypeArrayUtils.getFloat1(getSpecularIndex(index), typeArr)

let getSpecularColor = (index, typeArr) =>
  Meta3dCommonlib.TypeArrayUtils.getFloat3Tuple(getSpecularColorIndex(index), typeArr)

let getRoughness = (index, typeArr) =>
  Meta3dCommonlib.TypeArrayUtils.getFloat1(getRoughnessIndex(index), typeArr)

let getMetalness = (index, typeArr) =>
  Meta3dCommonlib.TypeArrayUtils.getFloat1(getMetalnessIndex(index), typeArr)

let getTransmission = (index, typeArr) =>
  Meta3dCommonlib.TypeArrayUtils.getFloat1(getTransmissionIndex(index), typeArr)

let getIOR = (index, typeArr) =>
  Meta3dCommonlib.TypeArrayUtils.getFloat1(getIORIndex(index), typeArr)
