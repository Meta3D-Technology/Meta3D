type poContainer = {mutable state: option<StateType.state>}

let _createStateContainer = (): poContainer => {state: None}

let poContainer = _createStateContainer()

let setState = (state: StateType.state) => {
  poContainer.state = state->Some

  ()
}

let unsafeGetState = () => {
  poContainer.state->Meta3dCommonlib.OptionSt.unsafeGet
}
