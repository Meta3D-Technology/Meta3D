@module("antd") @react.component
external make: (
  ~preview: bool=?,
  ~width: 'a=?,
  ~height: 'b=?,
  ~src: string=?,
  ~fallback: 'a=?,
) => React.element = "Image"
