

import * as TreeNode$Meta3dEngineCoreSceneview from "./TreeNode.bs.js";
import * as IterateTree$Meta3dEngineCoreSceneview from "./IterateTree.bs.js";

function insertNode(tree, targetPipelineName, node) {
  var isInsert = {
    contents: false
  };
  return [
          IterateTree$Meta3dEngineCoreSceneview.postOrderCata((function (pipelineName, nodeData, children) {
                  if (pipelineName === targetPipelineName) {
                    isInsert.contents = true;
                    return TreeNode$Meta3dEngineCoreSceneview.buildNodeByNodeData(pipelineName, nodeData, {
                                hd: node,
                                tl: children
                              });
                  } else {
                    return TreeNode$Meta3dEngineCoreSceneview.buildNodeByNodeData(pipelineName, nodeData, children);
                  }
                }), tree, undefined),
          isInsert.contents
        ];
}

export {
  insertNode ,
}
/* No side effect */
