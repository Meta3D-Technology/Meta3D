type key = string

@module("antd") @react.component
external make: (
  ~defaultActiveKey: array<key>=?,
  ~activeKey: key=?,
  ~onChange: array<key> => unit=?,
  ~children: React.element=?,
) => React.element = "Collapse"

module Panel = {
  @module("antd") @scope("Collapse") @react.component
  external make: (
    ~ref: 'a=?,
    ~header: string=?,
    ~key: string=?,
    ~children: React.element=?,
  ) => React.element = "Panel"
}
