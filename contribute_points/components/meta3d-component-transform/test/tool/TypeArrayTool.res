open StateType

let getDefaultPosition = () => (0., 0., 0.)

let getDefaultRotation = () => (0., 0., 0., 1.)

let getDefaultScale = () => (1., 1., 1.)

let getDefaultLocalToWorldMatrix = state => state.defaultLocalToWorldMatrix

let setLocalToWorldMatrix = (state, transform, data) => {
  OperateTypeArrayTransformUtils.setLocalToWorldMatrix(transform, data, state.localToWorldMatrices)

  state
}

let changeTypeArrayToTuple = typeArr => typeArr->Js.Array.from
