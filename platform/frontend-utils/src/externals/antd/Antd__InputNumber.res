@module("antd") @react.component
external make: (
  ~style: ReactDOM.Style.t=?,
  ~onChange: string => unit=?,
  ~defaultValue: string=?,
  ~value: string=?,
  ~min: string=?,
  ~max: string=?,
  ~step: string=?,
  ~stringMode: bool=?,
) => React.element = "InputNumber"
