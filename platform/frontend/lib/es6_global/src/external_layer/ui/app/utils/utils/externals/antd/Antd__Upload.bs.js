


var _map = {"pictureCard":"picture-card","picture":"picture","text":"text"};

var _revMap = {"picture-card":"pictureCard","picture":"picture","text":"text"};

function listTypeToJs(param) {
  return _map[param];
}

function listTypeFromJs(param) {
  return _revMap[param];
}

export {
  listTypeToJs ,
  listTypeFromJs ,
}
/* No side effect */
