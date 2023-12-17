@module("antd") @react.component
external make: (
  ~ref: 'a=?,
  ~style: ReactDOM.Style.t=?,
  ~onChange: float => unit=?,
  ~defaultValue: float=?,
  ~value: float=?,
  ~min: float=?,
  ~max: float=?,
  ~step: string=?,
  ~stringMode: bool=?,
) => React.element = "InputNumber"
