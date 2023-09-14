// TODO is already post order???
// let rec firstOrderCata = (
let rec postOrderCata = (
  ~nodeFunc: (
    Meta3dEngineCoreSceneviewProtocol.PipelineContributeType.pipelineName,
    Meta3dEngineCoreSceneviewProtocol.TreeType.nodeData,
    list<Meta3dEngineCoreSceneviewProtocol.TreeType.tree>,
  ) => Meta3dEngineCoreSceneviewProtocol.TreeType.tree,
  ~tree: Meta3dEngineCoreSceneviewProtocol.TreeType.tree,
  (),
): Meta3dEngineCoreSceneviewProtocol.TreeType.tree => {
  let recurse = postOrderCata(~nodeFunc)

  switch tree {
  | Node(pipelineName, nodeData, children) =>
    nodeFunc(pipelineName, nodeData, children->Meta3dCommonlib.ListSt.map(recurse(~tree=_, ())))
  }
}

// let rec postOrderFoldWithParentNode = (
//   ~nodeFunc: (option<  Meta3dEngineCoreSceneviewProtocol. TreeType.tree>, 'acc, Meta3dEngineCoreSceneviewProtocol.PipelineContributeType.pipelineName,   Meta3dEngineCoreSceneviewProtocol. TreeType.nodeData) => 'acc,
//   ~acc: 'acc,
//   ~tree:   Meta3dEngineCoreSceneviewProtocol. TreeType.tree,
//   ~parentNode: option<  Meta3dEngineCoreSceneviewProtocol. TreeType.tree>=None,
//   (),
// ): 'acc => {
// //   let recurse = firstOrderCata(~nodeFunc, ~acc, ~parentNode, ())

//   let recurse = (parentNode, acc, child) =>
//     postOrderFoldWithParentNode(
//       ~acc,
//       ~tree=child,
//       ~nodeFunc,
//       ~parentFolderNode,
//       (),
//     );

//   switch tree {
//   | Node(pipelineName, nodeData, children) =>
//     let localAccum =
//       nodeFunc(parentNode, acc, pipelineName, nodeData, children);

//     UIStateAssetService.fold(
//     //   seqFoldFunc,

//       recurse(
//         Some(
//           FolderNodeAssetService.buildNodeByNodeData(
//             ~nodeId,
//             ~nodeData=folderNodeData,
//             ~children,
//           ),
//         ),
//       ),
//       localAccum,
//       children,
//     );

//     // nodeFunc(pipelineName, nodeData, children->Meta3dCommonlib.ListSt.map(recurse(~tree=_, ())))
//   }

// }

let rec postOrderCataWithParentNode = (
  ~nodeFunc: (
    option<Meta3dEngineCoreSceneviewProtocol.TreeType.tree>,
    Meta3dEngineCoreSceneviewProtocol.PipelineContributeType.pipelineName,
    Meta3dEngineCoreSceneviewProtocol.TreeType.nodeData,
    list<Meta3dEngineCoreSceneviewProtocol.TreeType.tree>,
  ) => Meta3dCommonlib.Result.t2<Meta3dEngineCoreSceneviewProtocol.TreeType.tree>,
  ~tree: Meta3dEngineCoreSceneviewProtocol.TreeType.tree,
  ~parentNode: option<Meta3dEngineCoreSceneviewProtocol.TreeType.tree>=None,
  (),
): Meta3dCommonlib.Result.t2<Meta3dEngineCoreSceneviewProtocol.TreeType.tree> => {
  let recurse = postOrderCataWithParentNode(~nodeFunc)

  switch tree {
  | Node(pipelineName, nodeData, children) =>
    children
    ->Meta3dCommonlib.ListSt.traverseResultM(recurse(~tree=_, ~parentNode=tree->Some, ()))
    ->Meta3dCommonlib.Result.bind(children => {
      nodeFunc(parentNode, pipelineName, nodeData, children)
    })
  }
}
