let useEffectOnce = (
  ~dispatch=_ => (),
  ~selectedPackages=list{},
  ~selectedExtensions=list{},
  ~selectedContributes=list{},
  ~setData,
  ~service,
  (),
) => {
  DependencyGraphUtils.Method.useEffectOnce(
    setData,
    service,
    dispatch,
    (selectedPackages, selectedExtensions, selectedContributes),
  )
}
