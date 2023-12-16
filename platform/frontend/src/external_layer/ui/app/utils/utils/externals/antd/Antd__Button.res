type shape = [#circle | #round]
type size = [#large | #middle | #small]
type _type = [#primary | #ghost | #dashed | #link | #text | #default]

@module("antd") @react.component
external make: (
  ~block: bool=?,
  ~danger: bool=?,
  ~disabled: bool=?,
  ~ghost: bool=?,
  ~href: string=?,
  ~htmlType: string=?,
  ~icon: React.element=?,
  ~loading: bool=?,
  ~onClick: ReactEvent.Mouse.t => unit=?,
  ~children: React.element=?,
  ~shape: shape=?,
  ~size: size=?,
  ~target: string=?,
  ~_type: _type=?,
  ~style: ReactDOM.Style.t=?,
  ~ref: 'a=?,
) => React.element = "Button"
