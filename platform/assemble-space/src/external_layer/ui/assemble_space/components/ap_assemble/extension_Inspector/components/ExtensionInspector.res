open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let getInspectorCurrentExtension = ((
    inspectorCurrentExtensionId,
    selectedExtensions: FrontendUtils.ApAssembleStoreType.selectedExtensions,
  )) => {
    inspectorCurrentExtensionId->Meta3dCommonlib.OptionSt.bind(inspectorCurrentExtensionId =>
      selectedExtensions->Meta3dCommonlib.ListSt.getBy(extension =>
        extension.id === inspectorCurrentExtensionId
      )
    )
  }

  let startExtension = (
    dispatch,
    inspectorCurrentExtension: FrontendUtils.ApAssembleStoreType.extension,
  ) => {
    dispatch(FrontendUtils.ApAssembleStoreType.StartExtension(inspectorCurrentExtension.id))
  }

  let unstartExtension = (
    dispatch,
    inspectorCurrentExtension: FrontendUtils.ApAssembleStoreType.extension,
  ) => {
    dispatch(FrontendUtils.ApAssembleStoreType.UnStartExtension(inspectorCurrentExtension.id))
  }

  let setExtensionNewName = (
    dispatch,
    inspectorCurrentExtension: FrontendUtils.ApAssembleStoreType.extension,
    newName: string,
  ) => {
    dispatch(
      FrontendUtils.ApAssembleStoreType.SetExtensionNewName(inspectorCurrentExtension.id, newName),
    )
  }

  let useSelector = (
    {inspectorCurrentExtensionId, selectedExtensions}: FrontendUtils.ApAssembleStoreType.state,
  ) => {
    (inspectorCurrentExtensionId, selectedExtensions)
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = ReduxUtils.ApAssemble.useDispatch(service.react.useDispatch)

  switch ReduxUtils.ApAssemble.useSelector(
    service.react.useSelector,
    Method.useSelector,
  )->Method.getInspectorCurrentExtension {
  | None => React.null
  | Some(inspectorCurrentExtension) =>
    // <Collapse defaultActiveKey={["1"]}>
    //   <Collapse.Panel header="Basic" key="1" />
    //   {}
    // </Collapse>

    <>
      {inspectorCurrentExtension.isStart
        ? <Button
            onClick={_ => {
              Method.unstartExtension(dispatch, inspectorCurrentExtension)
            }}>
            {React.string(`取消启动`)}
          </Button>
        : <Button
            onClick={_ => {
              Method.startExtension(dispatch, inspectorCurrentExtension)
            }}>
            {React.string(`启动`)}
          </Button>}
      <Input
      // TODO remove newName
        value={NewNameUtils.getName(
          inspectorCurrentExtension.newName,
          inspectorCurrentExtension.data.extensionPackageData.name,
        )}
        onChange={e => {
          Method.setExtensionNewName(
            dispatch,
            inspectorCurrentExtension,
            e->EventUtils.getEventTargetValue,
          )
        }}
      />
    </>
  }
}
