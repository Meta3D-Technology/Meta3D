// TODO remove
type poContainer = {mutable state: option<Meta3dEngineCoreProtocol.StateType.state>}

let _createStateContainer = (): poContainer => {state: None}

let poContainer = _createStateContainer()

let setState = (state: Meta3dEngineCoreProtocol.StateType.state) => {
  poContainer.state = state->Some

  ()
}

let unsafeGetState = () => {
  poContainer.state->Meta3dCommonlib.OptionSt.unsafeGet
}
