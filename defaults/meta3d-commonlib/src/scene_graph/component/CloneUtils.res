let clone = (state, (createFunc, getDataFunc, setDataFunc), countRange, sourceComponent) => {
  let dataTuple = getDataFunc(state, sourceComponent)

  countRange->ArraySt.reduceOneParam((. (state, clonedComponents), _) => {
    let (state, clonedComponent) = createFunc(state)
    let state = setDataFunc(state, clonedComponent, dataTuple)

    (state, clonedComponents->ArraySt.push(clonedComponent))
  }, (state, []))
}
