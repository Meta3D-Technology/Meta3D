'use strict';

var TreeNode$Meta3dEngineCore = require("./TreeNode.bs.js");
var IterateTree$Meta3dEngineCore = require("./IterateTree.bs.js");

function insertNode(tree, targetPluginName, node) {
  var isInsert = {
    contents: false
  };
  return [
          IterateTree$Meta3dEngineCore.postOrderCata((function (workPluginName, nodeData, children) {
                  if (workPluginName === targetPluginName) {
                    isInsert.contents = true;
                    return TreeNode$Meta3dEngineCore.buildNodeByNodeData(workPluginName, nodeData, {
                                hd: node,
                                tl: children
                              });
                  } else {
                    return TreeNode$Meta3dEngineCore.buildNodeByNodeData(workPluginName, nodeData, children);
                  }
                }), tree, undefined),
          isInsert.contents
        ];
}

exports.insertNode = insertNode;
/* No side effect */
