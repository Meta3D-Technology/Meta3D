

import * as Curry from "./../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Caml_option from "./../../../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as ListSt$Meta3dCommonlib from "./../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as Result$Meta3dCommonlib from "./../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/Result.bs.js";

function postOrderCata(nodeFunc, tree, param) {
  return Curry._3(nodeFunc, tree._0, tree._1, ListSt$Meta3dCommonlib.map(tree._2, (function (__x) {
                    return postOrderCata(nodeFunc, __x, undefined);
                  })));
}

function postOrderCataWithParentNode(nodeFunc, tree, parentNodeOpt, param) {
  var parentNode = parentNodeOpt !== undefined ? Caml_option.valFromOption(parentNodeOpt) : undefined;
  var nodeData = tree._1;
  var workPluginName = tree._0;
  return Result$Meta3dCommonlib.bind(ListSt$Meta3dCommonlib.traverseResultM(tree._2, (function (__x) {
                    var param = Caml_option.some(tree);
                    var param$1;
                    return postOrderCataWithParentNode(nodeFunc, __x, param, param$1);
                  })), (function (children) {
                return Curry._4(nodeFunc, parentNode, workPluginName, nodeData, children);
              }));
}

export {
  postOrderCata ,
  postOrderCataWithParentNode ,
  
}
/* No side effect */
