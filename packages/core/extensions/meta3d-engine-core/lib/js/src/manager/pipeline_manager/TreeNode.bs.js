'use strict';


function buildNode(pipelineName, param, children) {
  return /* Node */{
          _0: pipelineName,
          _1: {
            getExecFuncs: {
              hd: param[0],
              tl: /* [] */0
            },
            pipelineData: param[1],
            jobOrder: param[2]
          },
          _2: children
        };
}

function buildNodeByNodeData(pipelineName, nodeData, children) {
  return /* Node */{
          _0: pipelineName,
          _1: nodeData,
          _2: children
        };
}

function getNodeData(node) {
  return node._1;
}

function _getPipelineName(node) {
  return node._0;
}

function isEqual(tree1, tree2) {
  return _getPipelineName(tree1) === _getPipelineName(tree2);
}

exports.buildNode = buildNode;
exports.buildNodeByNodeData = buildNodeByNodeData;
exports.getNodeData = getNodeData;
exports._getPipelineName = _getPipelineName;
exports.isEqual = isEqual;
/* No side effect */
