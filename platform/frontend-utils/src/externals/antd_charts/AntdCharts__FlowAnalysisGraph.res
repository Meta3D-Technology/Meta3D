type child

type cfg = {id: string}

type items = {layout?: [#follow]}

type color = string

type styleObj = {
  fill?: color,
  fontSize?: int,
  stroke?: color,
}

type node

type nodeStyleFunc = node => styleObj

type title = {
  containerStyle?: nodeStyleFunc,
  style?: nodeStyleFunc,
}

type nodeCfg = {
  autoWidth: bool,
  items: items,
  title: title,
}

type id = string

type edge = {
  source: id,
  target: id,
}

type nodeCfgInEventCfg = {
  id: id,
  model: node,
}

type nodeInEventCfg = {_cfg: nodeCfgInEventCfg}

type eventCfg = {nodes: array<nodeInEventCfg>}

type event = {cfg: eventCfg}

type edgeStyleFunc = (edge, event) => styleObj

type edgeCfg = {
  @as("type") type_?: [#polyline],
  endArrow?: bool,
  style?: edgeStyleFunc,
}

type markerCfgResult = {show: int}

type data

@module("@ant-design/graphs") @react.component
external make: (
  ~behaviors: array<string>=?,
  ~nodeCfg: nodeCfg=?,
  ~edgeCfg: edgeCfg=?,
  ~markerCfg: cfg => markerCfgResult=?,
  ~data: data=?,
) => React.element = "FlowAnalysisGraph"
