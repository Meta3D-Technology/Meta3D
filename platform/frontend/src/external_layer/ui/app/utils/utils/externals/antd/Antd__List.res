type grid = {
  gutter: int,
  column: int,
}

type itemLayout = [#horizontal]

@module("antd") @react.component
external make: (
  ~grid: grid=?,
  ~itemLayout: itemLayout=?,
  ~dataSource: array<'a>=?,
  // ~rowKey: 'a => string=?,
  ~renderItem: 'a => React.element,
) => React.element = "List"

module Item = {
  @react.component @module("antd") @scope("List")
  external make: (~children: React.element=?, ~ref: 'a=?) => React.element = "Item"

  module Meta = {
    @react.component @module("antd") @scope(("List", "Item"))
    external make: (
      ~title: React.element=?,
      ~avatar: React.element=?,
      ~description: React.element=?,
      ~key: string=?,
    ) => React.element = "Meta"
  }
}
