open Antd
%%raw("import 'antd/dist/antd.css'")
open AssembleSpaceType

module Method = {
  let getInspectorCurrentExtension = ((
    inspectorCurrentExtensionId,
    selectedExtensions: ApAssembleStoreType.selectedExtensions,
  )) => {
    inspectorCurrentExtensionId->Meta3dCommonlib.OptionSt.bind(inspectorCurrentExtensionId =>
      selectedExtensions->Meta3dCommonlib.ListSt.getBy(extension =>
        extension.id === inspectorCurrentExtensionId
      )
    )
  }

  let startExtension = (
    dispatch,
    inspectorCurrentExtension: ApAssembleStoreType.extension,
  ) => {
    dispatch(ApAssembleStoreType.StartExtension(inspectorCurrentExtension.id))
  }

  let unstartExtension = (
    dispatch,
    inspectorCurrentExtension: ApAssembleStoreType.extension,
  ) => {
    dispatch(ApAssembleStoreType.UnStartExtension(inspectorCurrentExtension.id))
  }

  // let setExtensionNewName = (
  //   dispatch,
  //   inspectorCurrentExtension: ApAssembleStoreType.extension,
  //   newName: string,
  // ) => {
  //   dispatch(
  //     ApAssembleStoreType.SetExtensionNewName(inspectorCurrentExtension.id, newName),
  //   )
  // }

  let updateSelectedExtension = (
    dispatch,
    service: service,
    extensionId,
    extensionPackageData,
    extensionStr,
  ) => {
    dispatch(
      ApAssembleStoreType.UpdateSelectedExtension(
        extensionId,
        service.meta3d.loadExtension(.
          service.meta3d.generateExtension(. extensionPackageData, extensionStr),
        ).extensionFuncData,
      ),
    )
  }

  let useEffectOnce = (
    (setInspectorCurrentExtension, setExtensionStr),
    service,
    (inspectorCurrentExtensionId, selectedExtensions),
  ) => {
    switch (inspectorCurrentExtensionId, selectedExtensions)->getInspectorCurrentExtension {
    | None =>
      setInspectorCurrentExtension(_ => None)
      setExtensionStr(_ => "")
    | Some(inspectorCurrentExtension) =>
      setInspectorCurrentExtension(_ => inspectorCurrentExtension->Some)
      setExtensionStr(_ =>
        service.meta3d.getExtensionFuncDataStr(. inspectorCurrentExtension.data.extensionFuncData)
      )
    }
  }

  let useSelector = (
    {inspectorCurrentExtensionId, selectedExtensions}: ApAssembleStoreType.state,
  ) => {
    (inspectorCurrentExtensionId, selectedExtensions)
  }
}

@react.component
let make = (~service: service) => {
  let (inspectorCurrentExtension, setInspectorCurrentExtension) = service.react.useState(_ => None)
  let (extensionStr, setExtensionStr) = service.react.useState(_ => "")

  let (
    inspectorCurrentExtensionId,
    selectedExtensions,
  ) = ReduxUtils.ApAssemble.useSelector(service.react.useSelector, Method.useSelector)

  let dispatch = ReduxUtils.ApAssemble.useDispatch(service.react.useDispatch)

  service.react.useEffect1(. () => {
    Method.useEffectOnce(
      (setInspectorCurrentExtension, setExtensionStr),
      service,
      (inspectorCurrentExtensionId, selectedExtensions),
    )

    None
  }, [inspectorCurrentExtensionId, selectedExtensions->Obj.magic])

  switch inspectorCurrentExtension {
  | None => React.null
  | Some(inspectorCurrentExtension) =>
    // <Collapse defaultActiveKey={["1"]}>
    //   <Collapse.Panel header="Basic" key="1" />
    //   {}
    // </Collapse>

    <Space direction=#vertical size=#middle>
      {ExtensionsContributesUtils.buildBasicInfoUI(
        service,
        inspectorCurrentExtension.data.extensionPackageData.protocol.name,
        inspectorCurrentExtension.data.extensionPackageData.protocol.version,
        inspectorCurrentExtension.data.extensionPackageData.name,
        inspectorCurrentExtension.data.extensionPackageData.version,
        inspectorCurrentExtension.data.extensionPackageData.displayName,
      )}
      {service.ui.buildTitle(. ~level=2, ~children={React.string(`入口扩展`)}, ())}
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
      {service.ui.buildTitle(. ~level=2, ~children={React.string(`Debug`)}, ())}
      {<>
        <Input.TextArea
          value={extensionStr}
          onChange={e => {
            setExtensionStr(_ => e->EventUtils.getEventTargetValue)
          }}
        />
        <Button
          onClick={_ => {
            ErrorUtils.showCatchedErrorMessage(() => {
              Method.updateSelectedExtension(
                dispatch,
                service,
                inspectorCurrentExtension.id,
                inspectorCurrentExtension.data.extensionPackageData,
                extensionStr,
              )
            }, 5->Some)
          }}>
          {React.string(`提交`)}
        </Button>
      </>}
    </Space>
  }
}
