


var _map = {"date":"date","week":"week","month":"month","quarter":"quarter","year":"year"};

var _revMap = {"date":"date","week":"week","month":"month","quarter":"quarter","year":"year"};

function pickerToJs(param) {
  return _map[param];
}

function pickerFromJs(param) {
  return _revMap[param];
}

export {
  pickerToJs ,
  pickerFromJs ,
}
/* No side effect */
