type key = string

@module("antd") @react.component
external make: (
  ~defaultActiveKey: array<key>=?,
  ~activeKey: key=?,
  ~onChange: key=?,
  ~children: React.element=?,
) => React.element = "Layout"

module Panel = {
  @module("antd") @scope("Collapse") @react.component
  external make: (~header: string=?, ~key: string=?, ~children: React.element=?) => React.element =
    "Panel"
}
