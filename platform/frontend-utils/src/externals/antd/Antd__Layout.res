@module("antd") @react.component
external make: (~children: React.element=?) => React.element = "Layout"

module Header = {
  @module("antd") @scope("Layout") @react.component
  external make: (~children: React.element=?) => React.element = "Header"
}

module Content = {
  @module("antd") @scope("Layout") @react.component
  external make: (~children: React.element=?) => React.element = "Content"
}

module Footer = {
  @module("antd") @scope("Layout") @react.component
  external make: (~children: React.element=?) => React.element = "Footer"
}
