type child

type cfg = {children: array<child>}

type markerCfgResult = {show: int}

type data

@module("@ant-design/graphs") @react.component
external make: (
  ~behaviors: array<string>=?,
  ~markerCfg: cfg => markerCfgResult=?,
  ~data: data=?,
) => React.element = "DecompositionTreeGraph"
