open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let getInspectorCurrentExtension = (
    inspectorCurrentExtensionId,
    selectedExtensions: FrontendUtils.AssembleSpaceStoreType.selectedExtensions,
  ) => {
    selectedExtensions->Meta3dCommonlib.ListSt.getBy(extension =>
      extension.id === inspectorCurrentExtensionId
    )
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = service.react.useDispatch()
  let (inspectorCurrentExtensionId, selectedExtensions) = service.react.useSelector((
    {inspectorCurrentExtensionId, selectedExtensions}: FrontendUtils.AssembleSpaceStoreType.state,
  ) => (inspectorCurrentExtensionId, selectedExtensions))

  switch inspectorCurrentExtensionId {
  | None => React.null
  | Some(inspectorCurrentExtensionId) =>
    switch Method.getInspectorCurrentExtension(inspectorCurrentExtensionId, selectedExtensions) {
    | None => React.null
    | Some(inspectorCurrentExtension) => // <Collapse defaultActiveKey={["1"]}>
      //   <Collapse.Panel header="Basic" key="1" />
      //   {}
      // </Collapse>
      <>
        {inspectorCurrentExtension.isStart
          ? <Button
              onClick={_ => {
                dispatch(
                  FrontendUtils.AssembleSpaceStoreType.UnStartExtension(
                    inspectorCurrentExtension.id,
                  ),
                )
              }}>
              {React.string(`取消启动`)}
            </Button>
          : <Button
              onClick={_ => {
                dispatch(
                  FrontendUtils.AssembleSpaceStoreType.StartExtension(inspectorCurrentExtension.id),
                )
              }}>
              {React.string(`启动`)}
            </Button>}
        <Input
          defaultValue={NewNameUtils.getName(
            inspectorCurrentExtension.newName,
            inspectorCurrentExtension.data,
          )}
          onBlur={e => {
            dispatch(
              FrontendUtils.AssembleSpaceStoreType.SetExtensionNewName(
                inspectorCurrentExtension.id,
                e->EventUtils.getEventTargetValue,
              ),
            )
          }}
        />
      </>
    }
  }
}
