open StateType

let _setData = (state, clonedTransform, (name, localPosition, localRotation, localScale)) => {
  name
  ->Meta3dCommonlib.OptionSt.map(name => {
    SetTransformDataUtils.setName(state, clonedTransform, name)
  })
  ->Meta3dCommonlib.OptionSt.getWithDefault(state)
  ->ModelMatrixTransformUtils.setLocalPosition(clonedTransform, localPosition)
  ->ModelMatrixTransformUtils.setLocalRotation(clonedTransform, localRotation)
  ->ModelMatrixTransformUtils.setLocalScale(clonedTransform, localScale)
}

let _getData = ({localPositions, localRotations, localScales} as state, sourceTransform) => {
  (
    GetTransformDataUtils.getName(state, sourceTransform)->Meta3dCommonlib.OptionSt.fromNullable,
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
