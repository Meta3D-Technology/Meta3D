open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let selectContribute = (dispatch, id) => {
    dispatch(FrontendUtils.PackageAssembleStoreType.SetInspectorCurrentContributeId(id))
  }

  let useSelector = ({selectedContributes}: FrontendUtils.PackageAssembleStoreType.state) => {
    selectedContributes
  }
}

@react.component
let make = (~service: service) => {
  <SelectedContributesUtils
    service
    useDispatch=FrontendUtils.ReduxUtils.PackageAssemble.useDispatch
    useSelectorResult={FrontendUtils.ReduxUtils.PackageAssemble.useSelector(
      service.react.useSelector,
      Method.useSelector,
    )->Meta3dCommonlib.ListSt.map(({id, protocolIconBase64, data}) => (
      id,
      protocolIconBase64,
      data,
    ))}
    selectContribute=Method.selectContribute
  />
}
