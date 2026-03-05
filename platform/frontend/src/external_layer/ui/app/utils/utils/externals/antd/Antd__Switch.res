@module("antd") @react.component
external make: (
  ~defaultChecked : bool=?,
  ~onChange: bool => unit=?,
  ~children: React.element=?,
  ~style: ReactDOM.Style.t=?,
) => React.element = "Switch"
