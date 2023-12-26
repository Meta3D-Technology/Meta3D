


var _map = {"start":"start","_end":"end","center":"center","spaceAround":"space-around","spaceBetween":"space-between"};

var _revMap = {"start":"start","end":"_end","center":"center","space-around":"spaceAround","space-between":"spaceBetween"};

function flexVariantToJs(param) {
  return _map[param];
}

function flexVariantFromJs(param) {
  return _revMap[param];
}

export {
  flexVariantToJs ,
  flexVariantFromJs ,
}
/* No side effect */
