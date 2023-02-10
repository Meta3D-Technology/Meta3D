type direction = [#vertical | #horizontal]

type size = [#small | #middle | #large]

@react.component @module("antd")
external make: (
  ~direction: direction=?,
  ~size: size=?,
  ~children: React.element=?,
) => React.element = "Space"
