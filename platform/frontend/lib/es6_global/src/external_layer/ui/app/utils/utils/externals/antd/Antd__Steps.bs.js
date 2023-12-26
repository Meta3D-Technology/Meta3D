


var _map = {"horizontal":"horizontal","vertical":"vertical"};

var _revMap = {"horizontal":"horizontal","vertical":"vertical"};

function orientationToJs(param) {
  return _map[param];
}

function orientationFromJs(param) {
  return _revMap[param];
}

var _map$1 = {"default":"default","navigation":"navigation"};

var _revMap$1 = {"default":"default","navigation":"navigation"};

function typeVariantToJs(param) {
  return _map$1[param];
}

function typeVariantFromJs(param) {
  return _revMap$1[param];
}

var _map$2 = {"wait":"wait","process":"process","finish":"finish","error":"error"};

var _revMap$2 = {"wait":"wait","process":"process","finish":"finish","error":"error"};

function statusVariantToJs(param) {
  return _map$2[param];
}

function statusVariantFromJs(param) {
  return _revMap$2[param];
}

var _map$3 = {"default":"default","small":"small"};

var _revMap$3 = {"default":"default","small":"small"};

function sizeVariantToJs(param) {
  return _map$3[param];
}

function sizeVariantFromJs(param) {
  return _revMap$3[param];
}

var Step = {};

export {
  orientationToJs ,
  orientationFromJs ,
  typeVariantToJs ,
  typeVariantFromJs ,
  statusVariantToJs ,
  statusVariantFromJs ,
  sizeVariantToJs ,
  sizeVariantFromJs ,
  Step ,
}
/* No side effect */
