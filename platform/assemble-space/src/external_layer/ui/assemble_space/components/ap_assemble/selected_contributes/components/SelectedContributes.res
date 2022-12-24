open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let selectContribute = (dispatch, id) => {
    dispatch(FrontendUtils.ApAssembleStoreType.SetInspectorCurrentContributeId(id))
  }

  let useSelector = ({selectedContributes}: FrontendUtils.ApAssembleStoreType.state) => {
    selectedContributes
  }
}

@react.component
let make = (~service: service) => {
  <SelectedContributesUtils
    service
    useDispatch=ReduxUtils.ApAssemble.useDispatch
    useSelectorResult={ReduxUtils.ApAssemble.useSelector(
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
