type key = string

type ref

type rec treeData = {
  title: React.element,
  key: key,
  // icon: Js.Nullable.t<React.element>,
  icon: React.element,
  children: array<treeData>,
}

type allTreeData = array<treeData>

type keys = array<key>

type node = {
  key: key,
  title: string,
  pos: string,
}

type selectedNode = {
  key: key,
  title: string,
}

type info = {
  event: string,
  selected: bool,
  node: node,
  dragNode:node,
  dropPosition:int,
dropToGap:bool,
  selectedNodes: array<selectedNode>,
}

@module("antd") @react.component
external make: (
  ~autoExpandParent:bool=?,
  ~expandAction:bool = ?,
  ~treeData: allTreeData=?,
  ~expandedKeys: keys=?,
  ~selectedKeys: keys=?,
  ~autoExpandParent: bool=?,
  ~onExpand: keys => unit=?,
  ~onSelect: (keys, info) => unit=?,
  ~onDragEnter: (info) => unit=?,
  ~onDrop: (info) => unit=?,
  ~showIcon: bool=?,
  ~draggable: bool=?,
  ~style: ReactDOM.Style.t=?,
) => React.element = "Tree"
