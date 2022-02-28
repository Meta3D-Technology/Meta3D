open Meta3dEngineCoreProtocol.TreeType

let buildNode = (pluginName, (getElementFunc, pipelineData, jobOrder), children) => Node(
  pluginName,
  {
    getElementFuncs: list{getElementFunc},
    pipelineData: pipelineData,
    jobOrder: jobOrder,
  },
  children,
)

let buildNodeByNodeData = (pluginName, nodeData, children) => Node(pluginName, nodeData, children)

let getNodeData = node =>
  switch node {
  | Node(_, nodeData, _) => nodeData
  }

let _getPluginName = node =>
  switch node {
  | Node(pluginName, _, _) => pluginName
  }

let isEqual = (tree1, tree2) => _getPluginName(tree1) === _getPluginName(tree2)
