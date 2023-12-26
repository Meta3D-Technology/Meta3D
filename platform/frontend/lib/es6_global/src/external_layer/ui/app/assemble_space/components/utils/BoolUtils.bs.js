


function stringToBool(str) {
  return str === "true";
}

function boolToString(bool) {
  if (bool) {
    return "true";
  } else {
    return "false";
  }
}

export {
  stringToBool ,
  boolToString ,
}
/* No side effect */
