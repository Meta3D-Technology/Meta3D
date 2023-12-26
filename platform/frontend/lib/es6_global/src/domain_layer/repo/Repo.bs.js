


function getElementContribute(state) {
  return state.elementContribute;
}

function setElementContribute(state, elementContribute) {
  return {
          elementContribute: elementContribute
        };
}

export {
  getElementContribute ,
  setElementContribute ,
}
/* No side effect */
