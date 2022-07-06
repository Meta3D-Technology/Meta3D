@module("antd") @react.component
external make: (
  ~title: string=?,
  ~key: string=?,
  ~style: ReactDOM.Style.t=?,
  ~cover: React.element=?,
  ~children: React.element=?,
) => React.element = "Card"

module Meta = {
  @react.component @module("antd") @scope("Card")
  external make: (
    ~title: React.element=?,
    ~avatar: React.element=?,
    ~description: React.element=?,
  ) => //   ~key: string=?,
  React.element = "Meta"
}
