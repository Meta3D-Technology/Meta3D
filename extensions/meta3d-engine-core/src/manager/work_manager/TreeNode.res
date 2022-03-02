open Meta3dEngineCoreProtocol.TreeType

let buildNode = (workPluginName, (getExecFunc, pipelineData, jobOrder), children) => Node(
  workPluginName,
  {
    getExecFuncs: list{getExecFunc},
    pipelineData: pipelineData,
    jobOrder: jobOrder,
  },
  children,
)

let buildNodeByNodeData = (workPluginName, nodeData, children) => Node(workPluginName, nodeData, children)

let getNodeData = node =>
  switch node {
  | Node(_, nodeData, _) => nodeData
  }

let _getPluginName = node =>
  switch node {
  | Node(workPluginName, _, _) => workPluginName
  }

let isEqual = (tree1, tree2) => _getPluginName(tree1) === _getPluginName(tree2)
