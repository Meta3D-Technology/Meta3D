type itemLayout = [#horizontal]

@module("antd") @react.component
external make: (
  ~itemLayout: itemLayout=?,
  ~dataSource: array<'a>=?,
  ~renderItem: 'a => React.element,
  // ~rowKey: 'a => string,
) => React.element = "List"

module Item = {
  @react.component @module("antd") @scope("List")
  external make: (~children: React.element=?) => React.element = "Item"

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
