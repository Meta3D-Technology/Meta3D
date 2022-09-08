let insertNode = (tree, targetPluginName, node): (Meta3dEngineCoreProtocol.TreeType.tree, bool) => {
  // TODO check new tree node not exist in tree

  let isInsert = ref(false)

  (
    IterateTree.postOrderCata(
      ~tree,
      ~nodeFunc=(workPluginName, nodeData, children) => {
        workPluginName === targetPluginName
          ? {
              isInsert := true

              TreeNode.buildNodeByNodeData(workPluginName, nodeData, list{node, ...children})
            }
          : TreeNode.buildNodeByNodeData(workPluginName, nodeData, children)
      },
      (),
    ),
    isInsert.contents,
  )
}
