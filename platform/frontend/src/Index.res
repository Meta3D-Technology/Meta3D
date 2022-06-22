@react.component
let make = () => {
      let dispatch =  CounterStore.useDispatch()
      let count = CounterStore.useSelector(state => state.count)


<>
<Nav />

    {React.string("Index")}
     <button onClick=(_ => dispatch(Increment))>
            {"Increment"->React.string}
        </button>
        <button onClick=(_ => dispatch(Decrement))>
            {"Decrement"->React.string}
        </button>
        <div>{count->React.int}</div>
</>
}
