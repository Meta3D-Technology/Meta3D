open StateType

let clone = (state, countRange, sourceBasicCameraView) => {
  let nameOpt = OperateBasicCameraViewUtils.getName(state, sourceBasicCameraView)->Meta3dCommonlib.OptionSt.fromNullable

  countRange->Meta3dCommonlib.ArraySt.reduceOneParam((. (state, clonedBasicCameraViews), _) => {
    let (state, clonedBasicCameraView) = CreateBasicCameraViewUtils.create(state)

    let state = switch nameOpt {
    | Some(name) => OperateBasicCameraViewUtils.setName(state, clonedBasicCameraView, name)
    | None => state
    }

    let state = OperateBasicCameraViewUtils.setIsActive(
      state,
      clonedBasicCameraView,
      false->Obj.magic,
    )

    (state, clonedBasicCameraViews->Meta3dCommonlib.ArraySt.push(clonedBasicCameraView))
  }, (state, []))
}
