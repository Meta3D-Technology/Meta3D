let useEffectOnce = (
  ~dispatch=_ => (),
  ~selectedPackages=list{},
  ~selectedExtensions=list{},
  ~selectedContributes=list{},
  ~setData,
  ~service,
  (),
) => {
  DependencyGraph.Method.useEffectOnce(
    setData,
    service,
    dispatch,
    (selectedPackages, selectedExtensions, selectedContributes),
  )
}
