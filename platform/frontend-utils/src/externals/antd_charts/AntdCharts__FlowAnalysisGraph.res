type child

type cfg = {id: string}

type edgeCfg = {@as("type") type_: [#polyline], endArrow: bool}

type markerCfgResult = {show: int}

type data

@module("@ant-design/graphs") @react.component
external make: (
  ~behaviors: array<string>=?,
  ~edgeCfg: edgeCfg=?,
  ~markerCfg: cfg => markerCfgResult=?,
  ~data: data=?,
) => React.element = "FlowAnalysisGraph"
