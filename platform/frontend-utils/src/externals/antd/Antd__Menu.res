type theme = [#light | #dark]

type mode = [#vertical | #horizontal | #inline]

type key = string

type item = {
  key: key,
  label: React.element,
}

type clickEvent = {
  item: item,
  key: key,
}

@react.component @module("antd")
external make: (
  ~theme: theme=?,
  ~mode: mode=?,
  ~defaultSelectedKeys: array<key>=?,
  ~selectedKeys: array<key>=?,
  ~items: array<item>=?,
  ~onClick: clickEvent => unit=?,
  ~children: React.element=?,
) => React.element = "Menu"
