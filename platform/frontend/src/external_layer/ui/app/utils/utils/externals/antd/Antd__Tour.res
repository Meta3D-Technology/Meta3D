type target

type tourStep = {
  title: string,
  description: string,
  cover: Js.Nullable.t<React.element>,
  target: unit => target,
}

@module("antd") @react.component
external make: (
  ~_open: bool=?,
  ~onClose: unit => unit=?,
  ~steps: array<tourStep>=?,
  unit,
) => React.element = "Tour"
