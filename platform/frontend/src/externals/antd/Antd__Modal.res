type fn = unit => unit

@module("antd") @react.component
external make: (
  ~title: string=?,
  ~visible: bool=?,
  ~onOk: fn=?,
  ~onCancel: fn=?,
  ~children: React.element=?,
) => React.element = "Modal"
