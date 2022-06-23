@module("antd") @react.component
external make: (
  ~children: React.element=?,
  ~flex: 'a=?,
  ~offset: int=?,
  ~order: int=?,
  ~pull: int=?,
  ~push: int=?,
  ~span: int=?,
  ~xs: int=?,
  ~sm: int=?,
  ~md: int=?,
  ~lg: int=?,
  ~xl: int=?,
  ~xxl: int=?,
) => React.element = "Col"
