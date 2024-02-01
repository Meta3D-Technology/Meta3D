open StateType

let getName = (state, script) => state.names->Meta3dCommonlib.ImmutableSparseMap.getNullable(script)

let setName = (state, script, name) => {
  let {names} = state

  {
    ...state,
    names: names->Meta3dCommonlib.ImmutableSparseMap.set(script, name),
  }
}

let getAttribute = (state, script) =>
  state.attributeMap->Meta3dCommonlib.ImmutableSparseMap.get(script)

let setAttribute = (state, script, attribute) => {
  let {attributeMap} = state

  {
    ...state,
    attributeMap: attributeMap->Meta3dCommonlib.ImmutableSparseMap.set(script, attribute),
  }
}

let getEventFileStr = (state, script) =>
  state.eventFileStrMap->Meta3dCommonlib.ImmutableSparseMap.get(script)

let setEventFileStr = (state, script, eventFileStr) => {
  let {eventFileStrMap} = state

  {
    ...state,
    eventFileStrMap: eventFileStrMap->Meta3dCommonlib.ImmutableSparseMap.set(script, eventFileStr),
  }
}
