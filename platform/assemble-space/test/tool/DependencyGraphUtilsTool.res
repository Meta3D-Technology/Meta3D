let useEffectOnce = (
  ~dispatch=_ => (),
  ~selectedPackages=list{},
  ~allPackagesStoredInApp=list{},
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
    ((selectedPackages, allPackagesStoredInApp), selectedExtensions, selectedContributes),
  )
}
