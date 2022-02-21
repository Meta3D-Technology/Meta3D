open BufferTransformUtils

let getLocalToWorldMatrixTypeArray = (index, typeArr) =>
  Meta3dCommonlib.TypeArrayUtils.getFloat16TypeArray(getLocalToWorldMatrixIndex(index), typeArr)
