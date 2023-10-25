open StateType

let clone = (state, countRange, sourcePerspectiveCameraProjection) => {
  let nameOpt =
    OperatePerspectiveCameraProjectionUtils.getName(
      state,
      sourcePerspectiveCameraProjection,
    )->Meta3dCommonlib.OptionSt.fromNullable
  let near =
    OperatePerspectiveCameraProjectionUtils.getNear(
      state,
      sourcePerspectiveCameraProjection,
    )->Meta3dCommonlib.OptionSt.getExn
  let far =
    OperatePerspectiveCameraProjectionUtils.getFar(
      state,
      sourcePerspectiveCameraProjection,
    )->Meta3dCommonlib.OptionSt.getExn
  let fovy =
    OperatePerspectiveCameraProjectionUtils.getFovy(
      state,
      sourcePerspectiveCameraProjection,
    )->Meta3dCommonlib.OptionSt.getExn
  let aspectOpt = OperatePerspectiveCameraProjectionUtils.getAspect(
    state,
    sourcePerspectiveCameraProjection,
  )

  countRange->Meta3dCommonlib.ArraySt.reduceOneParam(
    (. (state, clonedPerspectiveCameraProjections), _) => {
      let (
        state,
        clonedPerspectiveCameraProjection,
      ) = CreatePerspectiveCameraProjectionUtils.create(state)

      let state = switch nameOpt {
      | Some(name) =>
        OperatePerspectiveCameraProjectionUtils.setName(
          state,
          clonedPerspectiveCameraProjection,
          name,
        )
      | None => state
      }

      let state =
        state
        ->DirtyPerspectiveCameraProjectionUtils.mark(clonedPerspectiveCameraProjection, true)
        ->OperatePerspectiveCameraProjectionUtils.setNear(
          clonedPerspectiveCameraProjection,
          near->Obj.magic,
        )
        ->OperatePerspectiveCameraProjectionUtils.setFar(
          clonedPerspectiveCameraProjection,
          far->Obj.magic,
        )
        ->OperatePerspectiveCameraProjectionUtils.setFovy(
          clonedPerspectiveCameraProjection,
          fovy->Obj.magic,
        )

      (
        switch aspectOpt {
        | None => state
        | Some(aspect) =>
          state->OperatePerspectiveCameraProjectionUtils.setAspect(
            clonedPerspectiveCameraProjection,
            aspect->Obj.magic,
          )
        },
        clonedPerspectiveCameraProjections->Meta3dCommonlib.ArraySt.push(
          clonedPerspectiveCameraProjection,
        ),
      )
    },
    (state, []),
  )
}
