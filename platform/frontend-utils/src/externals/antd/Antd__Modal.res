type fn = unit => unit

@module("antd") @react.component
external make: (
  ~title: string=?,
  // ~\"open": bool=?,
  ~visible: bool=?,
  ~onOk: fn=?,
  ~onCancel: fn=?,
  ~footer: React.element=?,
  ~children: React.element=?,
) => React.element = "Modal"
