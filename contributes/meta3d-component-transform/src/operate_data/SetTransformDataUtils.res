open StateType

let setData = (.
  state,
  transform,
  dataName: Meta3dEngineCoreSceneviewProtocol.ComponentContributeType.dataName,
  dataValue: Meta3dEngineCoreSceneviewProtocol.ComponentContributeType.dataValue,
): StateType.state => {
  switch dataName {
  | dataName if dataName == Meta3dComponentTransformProtocol.Index.dataName.parent =>
    let parent: Js.Nullable.t<Meta3dComponentTransformProtocol.Index.transform> = dataValue->Obj.magic

    // Js.Nullable.isNullable(parent)
    //   ? {
    //       HierachyTransformUtils.removeParent(state, transform)
    //     }
    //   : {
    //       parent->Js.Nullable.iter((. parent) => {
    //         HierachyTransformUtils.setParent(state, parent, transform)
    //       })
    //     }

    switch parent->Meta3dCommonlib.OptionSt.fromNullable {
    | None => HierachyTransformUtils.removeParent(state, transform)
    | Some(parent) => HierachyTransformUtils.setParent(state, parent, transform)
    }
  | dataName if dataName == Meta3dComponentTransformProtocol.Index.dataName.localPosition =>
    ModelMatrixTransformUtils.setLocalPosition(state, transform, dataValue->Obj.magic)
  | dataName if dataName == Meta3dComponentTransformProtocol.Index.dataName.localRotation =>
    ModelMatrixTransformUtils.setLocalRotation(state, transform, dataValue->Obj.magic)
  | dataName if dataName == Meta3dComponentTransformProtocol.Index.dataName.localScale =>
    ModelMatrixTransformUtils.setLocalScale(state, transform, dataValue->Obj.magic)
  | dataName if dataName == Meta3dComponentTransformProtocol.Index.dataName.localEulerAngles =>
    ModelMatrixTransformUtils.setLocalEulerAngles(state, transform, dataValue->Obj.magic)
  | dataName if dataName == Meta3dComponentTransformProtocol.Index.dataName.position =>
    UpdateTransformUtils.updateAndSetPosition(state, transform, dataValue->Obj.magic)
  | dataName if dataName == Meta3dComponentTransformProtocol.Index.dataName.rotation =>
    UpdateTransformUtils.updateAndSetRotation(state, transform, dataValue->Obj.magic)
  | dataName if dataName == Meta3dComponentTransformProtocol.Index.dataName.scale =>
    UpdateTransformUtils.updateAndSetScale(state, transform, dataValue->Obj.magic)
  | dataName if dataName == Meta3dComponentTransformProtocol.Index.dataName.eulerAngles =>
    UpdateTransformUtils.updateAndSetEulerAngles(state, transform, dataValue->Obj.magic)
  | dataName if dataName == Meta3dComponentTransformProtocol.Index.dataName.update =>
    UpdateTransformUtils.mutableUpdate(state, transform)
  | _ =>
    Meta3dCommonlib.Exception.throwErr(
      Meta3dCommonlib.Exception.buildErr(
      Meta3dCommonlib.Log.buildFatalMessage(
        ~title="setData",
        ~description=j`unknown dataName:${dataName->Obj.magic}`,
        ~reason="",
        ~solution=j``,
        ~params=j``,
      ),
      )
    )
  }
}
