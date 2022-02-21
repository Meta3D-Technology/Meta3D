open Meta3dComponentWorkerUtils.BufferTransformUtils

let setLocalToWorldMatrix = (index, data, typeArr) =>
  Meta3dCommonlib.TypeArrayUtils.setFloat16(getLocalToWorldMatrixIndex(index), data, typeArr)

let getLocalPositionTuple = (index, typeArr) =>
  Meta3dCommonlib.TypeArrayUtils.getFloat3Tuple(getLocalPositionIndex(index), typeArr)

// let getLocalPositionTypeArray = (index, typeArr) =>
//   Meta3dCommonlib. TypeArrayUtils.getFloat3TypeArray(getLocalPositionIndex(index), typeArr);

let setLocalPosition = (index, data, typeArr) =>
  Meta3dCommonlib.TypeArrayUtils.setFloat3(getLocalPositionIndex(index), data, typeArr)

let getLocalRotationTuple = (index, typeArr) =>
  Meta3dCommonlib.TypeArrayUtils.getFloat4Tuple(getLocalRotationIndex(index), typeArr)

// let getLocalRotationTypeArray = (index, typeArr) =>
//   Meta3dCommonlib. TypeArrayUtils.getFloat4TypeArray(getLocalRotationIndex(index), typeArr);

let setLocalRotation = (index, data, typeArr) =>
  Meta3dCommonlib.TypeArrayUtils.setFloat4(getLocalRotationIndex(index), data, typeArr)

let getLocalScaleTuple = (index, typeArr) =>
  Meta3dCommonlib.TypeArrayUtils.getFloat3Tuple(getLocalScaleIndex(index), typeArr)

// let getLocalScaleTypeArray = (index, typeArr) =>
//   Meta3dCommonlib. TypeArrayUtils.getFloat3TypeArray(getLocalScaleIndex(index), typeArr);

let setLocalScale = (index, data, typeArr) =>
  Meta3dCommonlib.TypeArrayUtils.setFloat3(getLocalScaleIndex(index), data, typeArr)
