

import * as TreeNode$Meta3dEngineCore from "./TreeNode.bs.js";
import * as IterateTree$Meta3dEngineCore from "./IterateTree.bs.js";

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

export {
  insertNode ,
}
/* No side effect */
