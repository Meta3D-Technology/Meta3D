open AntdCharts
open AssembleSpaceType

module Method = {
  let markIsPassDependencyGraphCheck = isPass => ()

  let convertSelectedExtensions = (
    selectedExtensions: PackageAssembleStoreType.selectedExtensions,
  ): ApAssembleStoreType.selectedExtensions => {
    selectedExtensions->Meta3dCommonlib.ListSt.map(({
      id,
      protocolIconBase64,
      protocolConfigStr,
      isEntry,
      version,
      data,
    }): ApAssembleStoreType.extension => {
      {
        id,
        protocolIconBase64,
        protocolConfigStr,
        isStart: isEntry,
        version,
        data,
      }
    })
  }

  let useSelector = (
    {
      selectedPackages,
      selectedExtensions,
      selectedContributes,
    }: PackageAssembleStoreType.state,
  ) => {
    (selectedPackages, selectedExtensions, selectedContributes)
  }
}

@react.component
let make = (~service: service) => {
  let (
    selectedPackages,
    selectedExtensions,
    selectedContributes,
  ) = ReduxUtils.PackageAssemble.useSelector(
    service.react.useSelector,
    Method.useSelector,
  )

  <DependencyGraphUtils
    service
    markIsPassDependencyGraphCheck={Method.markIsPassDependencyGraphCheck}
    selectedPackages
    storedPackageIdsInApp=list{}
    selectedExtensions={Method.convertSelectedExtensions(selectedExtensions)}
    selectedContributes
    // selectedElementsFromMarket=list{}
  />
}
