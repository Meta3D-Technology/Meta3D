// TODO is already post order???
// let rec firstOrderCata = (
let rec postOrderCata = (
  ~nodeFunc: (
    Meta3dEngineCoreType.IWorkForJs.pluginName,
    Meta3dEngineCoreType.TreeType.nodeData,
    list<Meta3dEngineCoreType.TreeType.tree>,
  ) => Meta3dEngineCoreType.TreeType.tree,
  ~tree: Meta3dEngineCoreType.TreeType.tree,
  (),
): Meta3dEngineCoreType.TreeType.tree => {
  let recurse = postOrderCata(~nodeFunc)

  switch tree {
  | Node(pluginName, nodeData, children) =>
    nodeFunc(pluginName, nodeData, children->Meta3dCommonlib.ListSt.map(recurse(~tree=_, ())))
  }
}

// let rec postOrderFoldWithParentNode = (
//   ~nodeFunc: (option<  Meta3dEngineCoreType. TreeType.tree>, 'acc, Meta3dEngineCoreType.IWorkForJs.pluginName,   Meta3dEngineCoreType. TreeType.nodeData) => 'acc,
//   ~acc: 'acc,
//   ~tree:   Meta3dEngineCoreType. TreeType.tree,
//   ~parentNode: option<  Meta3dEngineCoreType. TreeType.tree>=None,
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
//   | Node(pluginName, nodeData, children) =>
//     let localAccum =
//       nodeFunc(parentNode, acc, pluginName, nodeData, children);

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

//     // nodeFunc(pluginName, nodeData, children->Meta3dCommonlib.ListSt.map(recurse(~tree=_, ())))
//   }

// }

let rec postOrderCataWithParentNode = (
  ~nodeFunc: (
    option<Meta3dEngineCoreType.TreeType.tree>,
    Meta3dEngineCoreType.IWorkForJs.pluginName,
    Meta3dEngineCoreType.TreeType.nodeData,
    list<Meta3dEngineCoreType.TreeType.tree>,
  ) => Meta3dCommonlib.Result.t2<Meta3dEngineCoreType.TreeType.tree>,
  ~tree: Meta3dEngineCoreType.TreeType.tree,
  ~parentNode: option<Meta3dEngineCoreType.TreeType.tree>=None,
  (),
): Meta3dCommonlib.Result.t2<Meta3dEngineCoreType.TreeType.tree> => {
  let recurse = postOrderCataWithParentNode(~nodeFunc)

  switch tree {
  | Node(pluginName, nodeData, children) =>
    children
    ->Meta3dCommonlib.ListSt.traverseResultM(recurse(~tree=_, ~parentNode=tree->Some, ()))
    ->Meta3dCommonlib.Result.bind(children => {
      nodeFunc(parentNode, pluginName, nodeData, children)
    })
  }
}
