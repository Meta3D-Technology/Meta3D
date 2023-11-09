'use strict';

var TreeNode$Meta3dEngineCore = require("./TreeNode.bs.js");
var IterateTree$Meta3dEngineCore = require("./IterateTree.bs.js");

function insertNode(tree, targetPipelineName, node) {
  var isInsert = {
    contents: false
  };
  return [
          IterateTree$Meta3dEngineCore.postOrderCata((function (pipelineName, nodeData, children) {
                  if (pipelineName === targetPipelineName) {
                    isInsert.contents = true;
                    return TreeNode$Meta3dEngineCore.buildNodeByNodeData(pipelineName, nodeData, {
                                hd: node,
                                tl: children
                              });
                  } else {
                    return TreeNode$Meta3dEngineCore.buildNodeByNodeData(pipelineName, nodeData, children);
                  }
                }), tree, undefined),
          isInsert.contents
        ];
}

exports.insertNode = insertNode;
/* No side effect */
