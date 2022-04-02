open StateType

let clone = (state, countRange, sourceBasicCameraView) => {
  countRange->Meta3dCommonlib.ArraySt.reduceOneParam((. (state, clonedBasicCameraViews), _) => {
    let (state, clonedBasicCameraView) = CreateBasicCameraViewUtils.create(state)

    let state = OperateBasicCameraViewUtils.setIsActive(
      state,
      clonedBasicCameraView,
      false->Obj.magic,
    )

    (state, clonedBasicCameraViews->Meta3dCommonlib.ArraySt.push(clonedBasicCameraView))
  }, (state, []))
}
