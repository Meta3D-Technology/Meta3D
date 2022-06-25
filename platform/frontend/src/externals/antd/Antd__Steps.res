@deriving(jsConverter)
type orientation = [
  | @as("horizontal") #horizontal
  | @as("vertical") #vertical
]

@deriving(jsConverter)
type typeVariant = [
  | @as("default") #default
  | @as("navigation") #navigation
]

@deriving(jsConverter)
type statusVariant = [
  | @as("wait") #wait
  | @as("process") #process
  | @as("finish") #finish
  | @bas.as("error") #error
]

@deriving(jsConverter)
type sizeVariant = [@as("default") #default | @as("small") #small]

@module("antd") @react.component
external make: (
  ~className: string=?,
  ~_type: typeVariant=?,
  ~current: int=?,
  ~direction: orientation=?,
  ~labelPlacement: orientation=?,
  ~progressDot: bool=?,
  ~size: sizeVariant=?,
  ~status: statusVariant=?,
  ~initial: int=?,
  ~onChange: unit=?,
  ~children: React.element=?,
  unit,
) => React.element = "Steps"

module Step = {
  @react.component @module("antd") @scope("Steps")
  external make: (
    ~title: 'a=?,
    ~description: 'a=?,
    ~status: statusVariant=?,
    ~icon: 'a=?,
    ~subTitle: 'string=?,
    ~disabled: bool=?,
  ) => React.element = "Step"
}
