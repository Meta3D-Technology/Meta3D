type direction = [#vertical | #horizontal]

type size = [#small | #middle | #large]

type align = [#center | #start | #end | #baseline]

@react.component @module("antd")
external make: (
  ~wrap: bool=?,
  ~align: align=?,
  ~direction: direction=?,
  ~size: size=?,
  ~children: React.element=?,
) => React.element = "Space"
