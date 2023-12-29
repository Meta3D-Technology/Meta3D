type textType = [#default| #secondary | #success | #warning | #danger]

type target = [#_blank]

module Title = {
  @react.component @module("antd") @scope("Typography")
  external make: (
    ~onClick: ReactEvent.Mouse.t => unit=?,
    ~level: int=?,
    ~children: React.element=?,
  ) => React.element = "Title"
}

module Text = {
  @react.component @module("antd") @scope("Typography")
  external make: (
    
    ~_type: textType=?, ~children: React.element=?) => React.element = "Text"
}

module Link = {
  @react.component @module("antd") @scope("Typography")
  external make: (~href: string=?, ~target: target=?, ~children: React.element=?) => React.element =
    "Link"
}

module Paragraph = {
  @react.component @module("antd") @scope("Typography")
  external make: (~_type: textType=?, ~children: React.element=?) => React.element = "Paragraph"
}
