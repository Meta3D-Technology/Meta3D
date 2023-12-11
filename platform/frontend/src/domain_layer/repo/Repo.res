open POType

let getElementContribute = state => state.elementContribute

let setElementContribute = (state, elementContribute) => {
  ...state,
  elementContribute: elementContribute,
}
