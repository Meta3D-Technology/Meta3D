


var poContainer = {
  po: {
    elementContribute: undefined
  }
};

function getPO(param) {
  return poContainer.po;
}

function setPO(po) {
  poContainer.po = po;
}

export {
  poContainer ,
  getPO ,
  setPO ,
}
/* No side effect */
