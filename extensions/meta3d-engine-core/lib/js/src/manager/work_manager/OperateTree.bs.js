'use strict';

var TreeNode$Meta3dEngineCore = require("./TreeNode.bs.js");
var IterateTree$Meta3dEngineCore = require("./IterateTree.bs.js");

function insertNode(tree, targetPluginName, node) {
  var isInsert = {
    contents: false
  };
  return [
          IterateTree$Meta3dEngineCore.postOrderCata((function (pluginName, nodeData, children) {
                  if (pluginName === targetPluginName) {
                    isInsert.contents = true;
                    return TreeNode$Meta3dEngineCore.buildNodeByNodeData(pluginName, nodeData, {
                                hd: node,
                                tl: children
                              });
                  } else {
                    return TreeNode$Meta3dEngineCore.buildNodeByNodeData(pluginName, nodeData, children);
                  }
                }), tree, undefined),
          isInsert.contents
        ];
}

exports.insertNode = insertNode;
/* No side effect */
