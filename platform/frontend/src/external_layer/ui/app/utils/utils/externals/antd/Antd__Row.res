type _type = [#flex]

type alignVariant = [#top | #middle | #bottom]

@deriving(jsConverter)
type flexVariant = [
  | #start
  | @as("end") #_end
  | #center
  | @as("space-around") #spaceAround
  | @as("space-between") #spaceBetween
]

@module("antd") @react.component
external make: (
  ~_type: _type=?,
  ~align: alignVariant=?,
  ~gutter: 'a=?,
  ~justify: flexVariant=?,
  ~children: React.element=?,
) => React.element = "Row"
