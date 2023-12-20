type target

type buttonProps = {
  children: React.element,
  onClick: unit => unit,
}

type tourStep = {
  title: string,
  description: string,
  cover: Js.Nullable.t<React.element>,
  target: unit => target,
  closeIcon: Js.Nullable.t<React.element>,
  // nextButtonProps: Js.Nullable.t<buttonProps>,
}

// let buildButtonProps = (~children=React.null, ~onClick=() => (), ()): Js.Nullable.t<
//   buttonProps,
// > => {
//   {
//     children,
//     onClick,
//   }->Meta3dCommonlib.NullableSt.return
// }

@module("antd") @react.component
external make: (
  ~_open: bool=?,
  ~current: int=?,
  ~onClose: unit => unit=?,
  ~onChange: int => unit=?,
  ~steps: array<tourStep>=?,
  // ~closeIcon: React.element=?,
  unit,
) => React.element = "Tour"
