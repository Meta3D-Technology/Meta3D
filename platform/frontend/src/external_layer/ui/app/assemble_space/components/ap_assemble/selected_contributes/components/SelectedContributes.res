open Antd
%%raw("import 'antd/dist/reset.css'")
open AssembleSpaceType

module Method = {
  let selectContribute = (dispatch, id) => {
    dispatch(ApAssembleStoreType.SetInspectorCurrentContributeId(id))
  }

  let useSelector = ({selectedContributes}: ApAssembleStoreType.state) => {
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
