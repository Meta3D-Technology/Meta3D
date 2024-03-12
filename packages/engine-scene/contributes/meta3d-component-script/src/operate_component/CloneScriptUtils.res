open StateType

let clone = (state, countRange, sourceScript) => {
  let nameOpt =
    OperateScriptUtils.getName(state, sourceScript)->Meta3dCommonlib.OptionSt.fromNullable
  let attributeOpt = OperateScriptUtils.getAttribute(state, sourceScript)
  let allAssetData =
    OperateScriptUtils.getAllAssetData(state, sourceScript)->Meta3dCommonlib.OptionSt.getExn

  countRange->Meta3dCommonlib.ArraySt.reduceOneParam((. (state, clonedScripts), _) => {
    let (state, clonedScript) = CreateScriptUtils.create(state)

    let state = switch nameOpt {
    | Some(name) => OperateScriptUtils.setName(state, clonedScript, name)
    | None => state
    }

    let state = switch attributeOpt {
    | Some(attribute) => OperateScriptUtils.setAttribute(state, clonedScript, attribute->Obj.magic)
    | None => state
    }

    let state = state->OperateScriptUtils.setAllAssetData(clonedScript, allAssetData->Obj.magic)

    (state, clonedScripts->Meta3dCommonlib.ArraySt.push(clonedScript))
  }, (state, []))
}
