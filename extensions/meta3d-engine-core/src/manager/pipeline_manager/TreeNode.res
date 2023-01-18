open Meta3dEngineCoreProtocol.TreeType

let buildNode = (pipelineName, (getExecFunc, pipelineData, jobOrder), children) => Node(
  pipelineName,
  {
    getExecFuncs: list{getExecFunc},
    pipelineData: pipelineData,
    jobOrder: jobOrder,
  },
  children,
)

let buildNodeByNodeData = (pipelineName, nodeData, children) => Node(pipelineName, nodeData, children)

let getNodeData = node =>
  switch node {
  | Node(_, nodeData, _) => nodeData
  }

let _getPipelineName = node =>
  switch node {
  | Node(pipelineName, _, _) => pipelineName
  }

let isEqual = (tree1, tree2) => _getPipelineName(tree1) === _getPipelineName(tree2)
