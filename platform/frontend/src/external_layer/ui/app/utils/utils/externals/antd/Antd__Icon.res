@module("@ant-design/icons") @react.component
external make: (
  ~component: 'a=?,
  ~rorate: int=?,
  ~spin: bool=?,
  ~style: ReactDOM.Style.t=?,
  ~twoToneColor: string=?,
) => React.element = "Icon"

module UploadOutlined = {
  @react.component @module("@ant-design/icons")
  external make: (~height: 'a=?, ~width: 'b=?) => React.element = "UploadOutlined"
}

module SearchOutlined = {
  @react.component @module("@ant-design/icons")
  external make: (~height: 'a=?, ~width: 'b=?) => React.element = "SearchOutlined"
}

module InfoCircleOutlined = {
  @react.component @module("@ant-design/icons")
  external make: (~height: 'a=?, ~width: 'b=?) => React.element = "InfoCircleOutlined"
}

module MinusCircleOutlined = {
  @react.component @module("@ant-design/icons")
  external make: (~onClick: ReactEvent.Mouse.t => unit=?) => React.element = "MinusCircleOutlined"
}

module DeleteOutlined = {
  @react.component @module("@ant-design/icons")
  external make: (~onClick: ReactEvent.Mouse.t => unit=?) => React.element = "DeleteOutlined"
}

module FileAddOutlined = {
  @react.component @module("@ant-design/icons")
  external make: unit => React.element = "FileAddOutlined"
}

module CloseOutlined = {
  @react.component @module("@ant-design/icons")
  external make: (~onClick: ReactEvent.Mouse.t => unit=?) => React.element = "CloseOutlined"
}
