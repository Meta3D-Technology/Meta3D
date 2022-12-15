open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

// TODO refactor: duplicate

module Method = {
  let getInspectorCurrentContribute = ((
    inspectorCurrentContributeId,
    selectedContributes: FrontendUtils.PackageAssembleStoreType.selectedContributes,
  )) => {
    inspectorCurrentContributeId->Meta3dCommonlib.OptionSt.bind(inspectorCurrentContributeId =>
      selectedContributes->Meta3dCommonlib.ListSt.getBy(contribute =>
        contribute.id === inspectorCurrentContributeId
      )
    )
  }

  let setContributeNewName = (
    dispatch,
    inspectorCurrentContribute: FrontendUtils.PackageAssembleStoreType.contribute,
    newName: string,
  ) => {
    dispatch(
      FrontendUtils.PackageAssembleStoreType.SetContributeNewName(
        inspectorCurrentContribute.id,
        newName,
      ),
    )
  }

  let useSelector = (
    {inspectorCurrentContributeId, selectedContributes}: FrontendUtils.PackageAssembleStoreType.state,
  ) => {
    (inspectorCurrentContributeId, selectedContributes)
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = ReduxUtils.PackageAssemble.useDispatch(service.react.useDispatch)

  switch ReduxUtils.PackageAssemble.useSelector(
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
