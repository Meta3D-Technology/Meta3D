open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

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
      FrontendUtils.PackageAssembleStoreType.SelectExtension(
        protocolIconBase64,
        protocolDisplayName,
        protocolRepoLink,
        protocolDescription,
        protocolConfigStr,
        extension,
      ),
    )
  }

  let useSelector = ({selectedExtensions}: FrontendUtils.PackageAssembleStoreType.state) => {
    selectedExtensions
  }
}

@react.component
let make = (~service: service, ~selectedExtensionsFromMarket: selectedExtensionsFromMarket) => {
  <ExtensionsUtils
    service
    selectedExtensionsFromMarket
    selectedExtensionNames={FrontendUtils.ReduxUtils.PackageAssemble.useSelector(
      service.react.useSelector,
      Method.useSelector,
    )->Meta3dCommonlib.ListSt.map(({data}) => data.extensionPackageData.name)}
    useDispatch=FrontendUtils.ReduxUtils.PackageAssemble.useDispatch
    selectExtension=Method.selectExtension
  />
}
