@module("antd") @react.component
external make: (
  ~bordered: bool=?,
  ~title: 'a=?,
  ~key: string=?,
  ~onClick: ReactEvent.Mouse.t => unit=?,
  ~headStyle: ReactDOM.Style.t=?,
  ~bodyStyle: ReactDOM.Style.t=?,
  ~cover: React.element=?,
  ~children: React.element=?,
) => React.element = "Card"

module Meta = {
  @react.component @module("antd") @scope("Card")
  external make: (
    ~style: ReactDOM.Style.t=?,
    ~title: React.element=?,
    ~avatar: React.element=?,
    ~description: React.element=?,
  ) => //   ~key: string=?,
  React.element = "Meta"
}
