type action = Increment | Decrement
type state = {count: int}

let updateFunction = (state, action) => {
  switch action {
  | Increment => {count: state.count + 1}
  | Decrement => {count: state.count - 1}
  }
}

let initialState = {
  count: 0,
}

let store = Remporium.makeStore(initialState, updateFunction)

module CounterStore = Remporium.CreateModule({
  type action = action
  type state = state
})

let useDispatch = CounterStore.useDispatch

let useSelector = CounterStore.useSelector
