open Antd
%%raw("import 'antd/dist/reset.css'")
open AssembleSpaceType

module Method = {
  let selectExtension = (
    dispatch,
    protocolIconBase64,
    protocolDisplayName,
    protocolRepoLink,
    protocolDescription,
    protocolConfigStr,
    extension,
  ) => {
    dispatch(
      PackageAssembleStoreType.SelectExtension(
        protocolIconBase64,
        protocolDisplayName,
        protocolRepoLink,
        protocolDescription,
        protocolConfigStr,
        extension,
      ),
    )
  }

  let useSelector = ({selectedExtensions}: PackageAssembleStoreType.state) => {
    selectedExtensions
  }
}

@react.component
let make = (~service: service, ~selectedExtensionsFromMarket: selectedExtensionsFromMarket) => {
  <ExtensionsUtils
    service
    selectedExtensionsFromMarket
    selectedExtensionNames={ReduxUtils.PackageAssemble.useSelector(
      service.react.useSelector,
      Method.useSelector,
    )->Meta3dCommonlib.ListSt.map(({data}) => data.extensionPackageData.name)}
    useDispatch=ReduxUtils.PackageAssemble.useDispatch
    selectExtension=Method.selectExtension
  />
}
