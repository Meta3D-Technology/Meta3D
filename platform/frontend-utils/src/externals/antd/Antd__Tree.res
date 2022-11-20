type key = string

type rec treeData = {
  title: string,
  key: key,
  icon: React.element,
  children: array<treeData>,
}

type allTreeData = array<treeData>

type keys = array<key>

type node = {
  key: key,
  title: string,
}

type selectedNode = {
  key: key,
  title: string,
}

type info = {
  event: string,
  selected: bool,
  node: node,
  selectedNodes: array<selectedNode>,
}

@module("antd") @react.component
external make: (
  ~treeData: allTreeData=?,
  ~expandedKeys: keys=?,
  ~selectedKeys: keys=?,
  ~autoExpandParent: bool=?,
  ~onExpand: keys => unit=?,
  ~onSelect: (keys, info) => unit=?,
  ~showIcon: bool=?,
) => React.element = "Tree"
