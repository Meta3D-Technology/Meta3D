let insertNode = (tree, targetPipelineName, node): (Meta3dEngineCoreProtocol.TreeType.tree, bool) => {
  // TODO check new tree node not exist in tree

  let isInsert = ref(false)

  (
    IterateTree.postOrderCata(
      ~tree,
      ~nodeFunc=(pipelineName, nodeData, children) => {
        pipelineName === targetPipelineName
          ? {
              isInsert := true

              TreeNode.buildNodeByNodeData(pipelineName, nodeData, list{node, ...children})
            }
          : TreeNode.buildNodeByNodeData(pipelineName, nodeData, children)
      },
      (),
    ),
    isInsert.contents,
  )
}
