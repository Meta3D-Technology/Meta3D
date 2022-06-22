type action = Inc | Dec
type state = {count: int}

let reducer = (state, action) => {
  switch action {
  | Inc => {count: state.count + 1}
  | Dec => {count: state.count - 1}
  }
}

@react.component
let make = () => {
let (state, dispatch) = React.useReducer(reducer, {count: 0})


<>
<Nav />

    {React.string("Login")}
        {React.string("Count:" ++ Belt.Int.toString(state.count))}
    <button onClick={(_) => dispatch(Dec)}> {React.string("-")} </button>
    <button onClick={(_) => dispatch(Inc)}> {React.string("+")} </button>
</>

}
