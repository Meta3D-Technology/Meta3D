open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let getInspectorCurrentExtension = ((
    inspectorCurrentExtensionId,
    selectedExtensions: FrontendUtils.PackageAssembleStoreType.selectedExtensions,
  )) => {
    inspectorCurrentExtensionId->Meta3dCommonlib.OptionSt.bind(inspectorCurrentExtensionId =>
      selectedExtensions->Meta3dCommonlib.ListSt.getBy(extension =>
        extension.id === inspectorCurrentExtensionId
      )
    )
  }

  let markEntryExtension = (
    dispatch,
    inspectorCurrentExtension: FrontendUtils.PackageAssembleStoreType.extension,
  ) => {
    dispatch(
      FrontendUtils.PackageAssembleStoreType.MarkEntryExtension(inspectorCurrentExtension.id),
    )
  }

  let unmarkEntryExtension = (
    dispatch,
    inspectorCurrentExtension: FrontendUtils.PackageAssembleStoreType.extension,
  ) => {
    dispatch(
      FrontendUtils.PackageAssembleStoreType.UnMarkEntryExtension(inspectorCurrentExtension.id),
    )
  }

  // let setExtensionNewName = (
  //   dispatch,
  //   inspectorCurrentExtension: FrontendUtils.PackageAssembleStoreType.extension,
  //   newName: string,
  // ) => {
  //   dispatch(
  //     FrontendUtils.PackageAssembleStoreType.SetExtensionNewName(
  //       inspectorCurrentExtension.id,
  //       newName,
  //     ),
  //   )
  // }

  let useSelector = (
    {inspectorCurrentExtensionId, selectedExtensions}: FrontendUtils.PackageAssembleStoreType.state,
  ) => {
    (inspectorCurrentExtensionId, selectedExtensions)
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = ReduxUtils.PackageAssemble.useDispatch(service.react.useDispatch)

  switch ReduxUtils.PackageAssemble.useSelector(
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
      {inspectorCurrentExtension.isEntry
        ? <Button
            onClick={_ => {
              Method.unmarkEntryExtension(dispatch, inspectorCurrentExtension)
            }}>
            {React.string(`取消设为入口`)}
          </Button>
        : <Button
            onClick={_ => {
              Method.markEntryExtension(dispatch, inspectorCurrentExtension)
            }}>
            {React.string(`设为入口`)}
          </Button>}
      // <Input
      //   value={NewNameUtils.getName(
      //     inspectorCurrentExtension.newName,
      //     inspectorCurrentExtension.data.extensionPackageData.name,
      //   )}
      //   onChange={e => {
      //     Method.setExtensionNewName(
      //       dispatch,
      //       inspectorCurrentExtension,
      //       e->EventUtils.getEventTargetValue,
      //     )
      //   }}
      // />
    </>
  }
}
