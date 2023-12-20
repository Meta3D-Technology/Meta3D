@module("antd") @react.component
external make: (
  ~title: string=?,
  ~description: string=?,
  ~onConfirm: ReactEvent.Mouse.t => unit=?,
  ~onCancel: ReactEvent.Mouse.t => unit=?,
  ~okText: string=?,
  ~cancelText: string=?,
  ~children: React.element=?,
  unit,
) => React.element = "Popconfirm"
