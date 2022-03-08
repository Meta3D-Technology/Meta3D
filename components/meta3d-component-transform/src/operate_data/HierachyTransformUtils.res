open Meta3dComponentTransformProtocol.Index

let getParent = (parentMap, transform) => parentMap->Meta3dCommonlib.MutableSparseMap.get(transform)

let getNullableParent = (parentMap, transform) =>
  parentMap->Meta3dCommonlib.MutableSparseMap.getNullable(transform)

let getNullableChildren = (childrenMap, transform) =>
  childrenMap->Meta3dCommonlib.MutableSparseMap.getNullable(transform)

let unsafeGetChildren = (childrenMap, transform) =>
  childrenMap->Meta3dCommonlib.MutableSparseMap.unsafeGet(transform)

let _addChild = (childrenMap, parent, child) => {
  unsafeGetChildren(childrenMap, parent)->Meta3dCommonlib.ArraySt.push(child)
}

let _addToParent = (state, parent, child) => {
  Meta3dCommonlib.Contract.requireCheck(() => {
    open Meta3dCommonlib.Contract
    open Operators

    let {parentMap, childrenMap} = state

    test(
      Meta3dCommonlib.Log.buildAssertMessage(~expect=j`child not has parent`, ~actual=j`has`),
      () => getParent(parentMap, child)->assertNotExist,
    )
    test(
      Meta3dCommonlib.Log.buildAssertMessage(
        ~expect=j`parent not already has the child`,
        ~actual=j`has`,
      ),
      () =>
        switch getNullableChildren(childrenMap, parent)->Meta3dCommonlib.OptionSt.fromNullable {
        | Some(children) => children->Meta3dCommonlib.ArraySt.includes(child)->assertFalse
        | None => assertPass()
        },
    )
  }, ConfigUtils.getIsDebug(state))

  let {parentMap, childrenMap} = state

  parentMap->Meta3dCommonlib.MutableSparseMap.set(child, parent)->ignore
  childrenMap->_addChild(parent, child)->ignore

  state
}

let removeParentMap = (parentMap, transform) =>
  parentMap->Meta3dCommonlib.MutableSparseMap.remove(transform)

let _removeChild = (children, isDebug, child) =>
  Meta3dCommonlib.ArraySt.deleteBySwap(
    children,
    isDebug,
    Js.Array.indexOf(child, children),
    Js.Array.length(children) - 1,
  )

let removeFromChildMap = (childrenMap, isDebug, parent, child) => {
  unsafeGetChildren(childrenMap, parent)->_removeChild(isDebug, child)
}

let _removeFromParent = (state, currentParent, child) => {
  let {parentMap, childrenMap} = state

  parentMap->removeParentMap(child)->ignore

  removeFromChildMap(childrenMap, ConfigUtils.getIsDebug(state), currentParent, child)->ignore

  state
}

let removeParent = (state, transform) => {
  let {parentMap, childrenMap} = state

  switch getParent(parentMap, transform) {
  | None => state
  | Some(currentParent) => _removeFromParent(state, currentParent, transform)
  }
}
// getNullableParent(parentMap, transform)->Js.Nullable.isNullable
//   ? {
//       state
//     }
//   : {
//       getNullableParent(parentMap, transform)->Js.Nullable.iter((. currentParent) => {
//         _removeFromParent(
//           (parentMap, childrenMap),
//           ConfigUtils.getIsDebug(state),
//           currentParent,
//           transform,
//         )
//       })

//       state
//     }

// switch getParent(transform) {
// | None => ()
// | Some(currentParent) => _removeFromParent(currentParent, transform)
// }

let _setNewParent = (state, parent, child) => {
  let {parentMap, childrenMap} = state

  switch getParent(parentMap, child) {
  | None => _addToParent(state, parent, child)
  | Some(currentParent) =>
    !(currentParent === parent)
      ? {
          _removeFromParent(state, currentParent, child)->_addToParent(parent, child)
        }
      : state
  }
}

let rec markHierachyDirty = (state, transform) => {
  DirtyTransformUtils.mark(state, transform, true)->ignore

  let {childrenMap} = state

  unsafeGetChildren(childrenMap, transform)->Meta3dCommonlib.ArraySt.reduceOneParam(
    (. state, child) => markHierachyDirty(state, child),
    state,
  )
}

let setParent = (state, parent, child) =>
  state->_setNewParent(parent, child)->markHierachyDirty(child)
