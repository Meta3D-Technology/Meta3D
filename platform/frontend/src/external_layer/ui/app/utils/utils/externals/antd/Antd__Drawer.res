type placement = [#right]

@react.component @module("antd")
external make: (
  ~title: string=?,
  ~placement: placement=?,
  ~_open: bool=?,
  ~onClose: unit => unit=?,
  ~children: React.element=?,
) => React.element = "Drawer"
