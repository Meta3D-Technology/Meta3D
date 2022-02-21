open StateType

let getData = (.
  {
    parentMap,
    childrenMap,
    localPositions,
    localRotations,
    localScales,
    localToWorldMatrices,
  } as state,
  transform,
  dataName: DataType.dataName,
): Js.Nullable.t<'a> => {
  switch dataName {
  | dataName if dataName == Meta3dComponentTransformProtocol.Index.dataName.parent =>
    HierachyTransformUtils.getNullableParent(parentMap, transform)->Obj.magic
  | dataName if dataName == Meta3dComponentTransformProtocol.Index.dataName.children =>
    HierachyTransformUtils.getNullableChildren(childrenMap, transform)->Obj.magic
  | dataName if dataName == Meta3dComponentTransformProtocol.Index.dataName.localPosition =>
    ModelMatrixTransformUtils.getLocalPosition(localPositions, transform)
    ->Obj.magic
    ->Js.Nullable.return
  | dataName if dataName == Meta3dComponentTransformProtocol.Index.dataName.localRotation =>
    ModelMatrixTransformUtils.getLocalRotation(localRotations, transform)
    ->Obj.magic
    ->Js.Nullable.return
  | dataName if dataName == Meta3dComponentTransformProtocol.Index.dataName.localScale =>
    ModelMatrixTransformUtils.getLocalScale(localScales, transform)->Obj.magic->Js.Nullable.return
  | dataName if dataName == Meta3dComponentTransformProtocol.Index.dataName.position =>
    UpdateTransformUtils.updateAndGetPosition(state, transform)
    ->Meta3dCommonlib.Tuple2.getLast
    ->Obj.magic
    ->Js.Nullable.return
  | dataName if dataName == Meta3dComponentTransformProtocol.Index.dataName.rotation =>
    UpdateTransformUtils.updateAndGetRotation(state, transform)
    ->Meta3dCommonlib.Tuple2.getLast
    ->Obj.magic
    ->Js.Nullable.return
  | dataName if dataName == Meta3dComponentTransformProtocol.Index.dataName.scale =>
    UpdateTransformUtils.updateAndGetScale(state, transform)
    ->Meta3dCommonlib.Tuple2.getLast
    ->Obj.magic
    ->Js.Nullable.return
  | dataName if dataName == Meta3dComponentTransformProtocol.Index.dataName.localEulerAngles =>
    ModelMatrixTransformUtils.getLocalEulerAngles(localRotations, transform)
    ->Obj.magic
    ->Js.Nullable.return
  | dataName if dataName == Meta3dComponentTransformProtocol.Index.dataName.eulerAngles =>
    UpdateTransformUtils.updateAndGetEulerAngles(state, transform)
    ->Meta3dCommonlib.Tuple2.getLast
    ->Obj.magic
    ->Js.Nullable.return
  | dataName if dataName == Meta3dComponentTransformProtocol.Index.dataName.normalMatrix =>
    ModelMatrixTransformUtils.getNormalMatrix(state, transform)->Obj.magic->Js.Nullable.return
  | dataName if dataName == Meta3dComponentTransformProtocol.Index.dataName.localToWorldMatrix =>
    Meta3dComponentWorkerUtils.ModelMatrixTransformUtils.getLocalToWorldMatrix(
      localToWorldMatrices,
      transform,
    )
    ->Obj.magic
    ->Js.Nullable.return
  | dataName if dataName == Meta3dComponentTransformProtocol.Index.dataName.dirty =>
    DirtyTransformUtils.isDirty(state, transform)->Obj.magic
  | _ =>
    Meta3dCommonlib.Exception.throwErr(
      Meta3dCommonlib.Log.buildFatalMessage(
        ~title="getData",
        ~description=j`unknown dataName:${dataName->Obj.magic}`,
        ~reason="",
        ~solution=j``,
        ~params=j``,
      ),
    )
  }
}
