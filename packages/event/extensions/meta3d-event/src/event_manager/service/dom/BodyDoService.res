open EventManagerStateType

let getBodyExn = state => {
  state.body->Meta3dCommonlib.OptionSt.getExn
}

let setBody = (state, body) => {
  {
    ...state,
    body: Some(body),
  }
}
