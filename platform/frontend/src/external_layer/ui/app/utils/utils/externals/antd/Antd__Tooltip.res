type placement = [#topLeft | #right]

@module("antd") @react.component
external make: (
  ~title: string=?,
  ~placement:placement=?,
  ~children: React.element=?,
) => React.element = "Tooltip"
