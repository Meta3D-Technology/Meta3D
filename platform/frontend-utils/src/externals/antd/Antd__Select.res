@module("antd") @react.component
external make: (
  ~defaultValue: string=?,
  ~style: ReactDOM.Style.t=?,
  ~onChange: string => unit=?,
  ~children: React.element=?,
) => React.element = "Select"

module Option = {
  @react.component @module("antd") @scope("Select")
  external make: (~value: string=?, ~children: React.element=?) => React.element = "Option"
}
