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
  let dataTuple = _getData(state, sourceTransform)

  countRange->Meta3dCommonlib.ArraySt.reduceOneParam((. (state, clonedTransforms), _) => {
    let (state, clonedTransform) = CreateTransformUtils.create(state)
    let state = _setData(state, clonedTransform, dataTuple)

    (state, clonedTransforms->Meta3dCommonlib.ArraySt.push(clonedTransform))
  }, (state, []))
}
