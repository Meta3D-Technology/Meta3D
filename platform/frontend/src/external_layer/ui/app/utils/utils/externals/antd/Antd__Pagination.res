type pageSize = int

type page = int

@module("antd") @react.component
external make: (
  ~current: int=?,
  ~defaultCurrent: page=?,
  ~defaultPageSize: pageSize=?,
  ~pageSize: pageSize=?,
  ~total: int=?,
  ~showSizeChanger: bool=?,
  ~onChange: (page, pageSize) => unit=?,
) => React.element = "Pagination"
