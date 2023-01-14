// TODO remove
type poContainer = {
  mutable state: option<Meta3dEngineCoreProtocol.StateType.state>,
  mutable meta3dState: option<Meta3dType.Index.state>,
}

let _createStateContainer = (): poContainer => {
  state: None,
  meta3dState: None,
}

let poContainer = _createStateContainer()

let setState = (state: Meta3dEngineCoreProtocol.StateType.state) => {
  poContainer.state = state->Some

  ()
}

let unsafeGetState = () => {
  poContainer.state->Meta3dCommonlib.OptionSt.unsafeGet
}

let setMeta3dState = (meta3dState: Meta3dType.Index.state) => {
  poContainer.meta3dState = meta3dState->Some

  ()
}

let unsafeGetMeta3dState = () => {
  poContainer.meta3dState->Meta3dCommonlib.OptionSt.unsafeGet
}
