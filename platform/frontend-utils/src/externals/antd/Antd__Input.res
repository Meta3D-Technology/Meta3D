type size = [#large | #middle | #small]

@module("antd") @react.component
external make: (
  ~_type: string=?,
  ~value: string=?,
  ~onChange: ReactEvent.Form.t => unit=?,
  ~defaultValue: string=?,
  ~placeholder: string=?,
  ~disabled: bool=?,
  ~addonAfter: 'a=?,
  ~addonBefore: 'c=?,
  ~allowClear: bool=?,
  ~bordered: bool=?,
  ~id: string=?,
  ~maxLength: int=?,
  ~prefix: React.element=?,
  ~size: size=?,
  ~suffix: React.element=?,
  // ~onBlur: ReactEvent.Form.t => unit=?,
  ~onPressEnter: ReactEvent.Form.t => unit=?,
) => React.element = "Input"

module Search = {
  @module("antd") @scope("Input") @react.component
  external make: (
    ~enterButton: 'a=?,
    ~loading: bool=?,
    ~onSearch: ReactEvent.Form.t => unit=?,
  ) => React.element = "Search"
}
