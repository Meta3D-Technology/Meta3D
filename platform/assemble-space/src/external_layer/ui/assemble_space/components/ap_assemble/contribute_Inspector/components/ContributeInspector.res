open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

// TODO refactor: duplicate

module Method = {
  let getInspectorCurrentContribute = ((
    inspectorCurrentContributeId,
    selectedContributes: FrontendUtils.ApAssembleStoreType.selectedContributes,
  )) => {
    inspectorCurrentContributeId->Meta3dCommonlib.OptionSt.bind(inspectorCurrentContributeId =>
      selectedContributes->Meta3dCommonlib.ListSt.getBy(contribute =>
        contribute.id === inspectorCurrentContributeId
      )
    )
  }

  let setContributeNewName = (
    dispatch,
    inspectorCurrentContribute: FrontendUtils.ApAssembleStoreType.contribute,
    newName: string,
  ) => {
    dispatch(
      FrontendUtils.ApAssembleStoreType.SetContributeNewName(
        inspectorCurrentContribute.id,
        newName,
      ),
    )
  }

  let useSelector = (
    {inspectorCurrentContributeId, selectedContributes}: FrontendUtils.ApAssembleStoreType.state,
  ) => {
    (inspectorCurrentContributeId, selectedContributes)
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = ReduxUtils.ApAssemble.useDispatch(service.react.useDispatch)

  switch ReduxUtils.ApAssemble.useSelector(
    service.react.useSelector,
    Method.useSelector,
  )->Method.getInspectorCurrentContribute {
  | None => React.null
  | Some(inspectorCurrentContribute) => <>
      <Input
        value={NewNameUtils.getName(
          inspectorCurrentContribute.newName,
          inspectorCurrentContribute.data.contributePackageData.name,
        )}
        onChange={e => {
          Method.setContributeNewName(
            dispatch,
            inspectorCurrentContribute,
            e->EventUtils.getEventTargetValue,
          )
        }}
      />
    </>
  }
}
