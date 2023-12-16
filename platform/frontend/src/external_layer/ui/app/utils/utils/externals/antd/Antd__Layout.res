type theme = [#dark | #light]

@module("antd") @react.component
external make: (~children: React.element=?) => React.element = "Layout"

module Header = {
  @module("antd") @scope("Layout") @react.component
  external make: (~children: React.element=?) => React.element = "Header"
}

module Sider = {
  @module("antd") @scope("Layout") @react.component
  external make: (
    ~theme: theme=?,
    ~width:int=?,
    ~children: React.element=?,
  ) => React.element = "Sider"
}

module Content = {
  @module("antd") @scope("Layout") @react.component
  external make: (~children: React.element=?) => React.element = "Content"
}

module Footer = {
  @module("antd") @scope("Layout") @react.component
  external make: (~children: React.element=?) => React.element = "Footer"
}
