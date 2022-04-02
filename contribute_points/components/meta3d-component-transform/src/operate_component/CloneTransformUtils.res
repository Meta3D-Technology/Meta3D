open StateType

let _setData = (state, clonedTransform, (localPosition, localRotation, localScale)) => {
  state
  ->ModelMatrixTransformUtils.setLocalPosition(clonedTransform, localPosition)
  ->ModelMatrixTransformUtils.setLocalRotation(clonedTransform, localRotation)
  ->ModelMatrixTransformUtils.setLocalScale(clonedTransform, localScale)
}

let _getData = ({localPositions, localRotations, localScales} as state, sourceTransform) => {
  (
    ModelMatrixTransformUtils.getLocalPosition(localPositions, sourceTransform),
    ModelMatrixTransformUtils.getLocalRotation(localRotations, sourceTransform),
    ModelMatrixTransformUtils.getLocalScale(localScales, sourceTransform),
  )
}

let clone = (state, countRange, sourceTransform) => {
  Meta3dCommonlib.CloneUtils.clone(
    state,
    (CreateTransformUtils.create, _getData, _setData),
    countRange,
    sourceTransform,
  )
}
