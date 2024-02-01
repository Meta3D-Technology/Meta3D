open StateType

let clone = (state, countRange, sourceScript) => {
  let nameOpt =
    OperateScriptUtils.getName(state, sourceScript)->Meta3dCommonlib.OptionSt.fromNullable
  let attribute =
    OperateScriptUtils.getAttribute(state, sourceScript)->Meta3dCommonlib.OptionSt.getExn
  let eventFileStr =
    OperateScriptUtils.getEventFileStr(state, sourceScript)->Meta3dCommonlib.OptionSt.getExn

  countRange->Meta3dCommonlib.ArraySt.reduceOneParam((. (state, clonedScripts), _) => {
    let (state, clonedScript) = CreateScriptUtils.create(state)

    let state = switch nameOpt {
    | Some(name) => OperateScriptUtils.setName(state, clonedScript, name)
    | None => state
    }

    let state =
      state
      ->OperateScriptUtils.setAttribute(clonedScript, attribute->Obj.magic)
      ->OperateScriptUtils.setEventFileStr(clonedScript, eventFileStr->Obj.magic)

    (state, clonedScripts->Meta3dCommonlib.ArraySt.push(clonedScript))
  }, (state, []))
}
