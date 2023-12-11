open Antd
%%raw("import 'antd/dist/antd.css'")
open AssembleSpaceType

module Method = {
  let getInspectorCurrentContribute = ((
    inspectorCurrentContributeId,
    selectedContributes: ApAssembleStoreType.selectedContributes,
  )) => {
    inspectorCurrentContributeId->Meta3dCommonlib.OptionSt.bind(inspectorCurrentContributeId =>
      selectedContributes->Meta3dCommonlib.ListSt.getBy(contribute =>
        contribute.id === inspectorCurrentContributeId
      )
    )
  }

  let updateSelectedContribute = (
    dispatch,
    service: service,
    contributeId,
    contributePackageData,
    contributeStr,
  ) => {
    dispatch(
      ApAssembleStoreType.UpdateSelectedContribute(
        contributeId,
        service.meta3d.loadContribute(.
          service.meta3d.generateContribute(. contributePackageData, contributeStr),
        ).contributeFuncData,
      ),
    )
  }

  let useEffectOnce = (
    (setInspectorCurrentContribute, setContributeStr),
    service,
    (inspectorCurrentContributeId, selectedContributes),
  ) => {
    switch (inspectorCurrentContributeId, selectedContributes)->getInspectorCurrentContribute {
    | None =>
      setInspectorCurrentContribute(_ => None)
      setContributeStr(_ => "")
    | Some(inspectorCurrentContribute) =>
      setInspectorCurrentContribute(_ => inspectorCurrentContribute->Some)
      setContributeStr(_ =>
        service.meta3d.getContributeFuncDataStr(.
          inspectorCurrentContribute.data.contributeFuncData,
        )
      )
    }
  }

  let useSelector = (
    {inspectorCurrentContributeId, selectedContributes}: ApAssembleStoreType.state,
  ) => {
    (inspectorCurrentContributeId, selectedContributes)
  }
}

@react.component
let make = (~service: service) => {
  let (inspectorCurrentContribute, setInspectorCurrentContribute) = service.react.useState(_ =>
    None
  )
  let (contributeStr, setContributeStr) = service.react.useState(_ => "")
  let (isDebugChange, setIsDebugChange) = service.react.useState(_ => false)

  let (
    inspectorCurrentContributeId,
    selectedContributes,
  ) = ReduxUtils.ApAssemble.useSelector(service.react.useSelector, Method.useSelector)

  let dispatch = ReduxUtils.ApAssemble.useDispatch(service.react.useDispatch)

  service.react.useEffect1(. () => {
    Method.useEffectOnce(
      (setInspectorCurrentContribute, setContributeStr),
      service,
      (inspectorCurrentContributeId, selectedContributes),
    )

    None
  }, [inspectorCurrentContributeId, selectedContributes->Obj.magic])

  switch inspectorCurrentContribute {
  | None => React.null
  | Some(inspectorCurrentContribute) =>
    // <Collapse defaultActiveKey={["1"]}>
    //   <Collapse.Panel header="Basic" key="1" />
    //   {}
    // </Collapse>

    <Space direction=#vertical size=#middle>
      {ExtensionsContributesUtils.buildBasicInfoUI(
        service,
        inspectorCurrentContribute.data.contributePackageData.protocol.name,
        inspectorCurrentContribute.data.contributePackageData.protocol.version,
        inspectorCurrentContribute.data.contributePackageData.name,
        inspectorCurrentContribute.data.contributePackageData.version,
        inspectorCurrentContribute.data.contributePackageData.displayName,
      )}
      {service.ui.buildTitle(. ~level=2, ~children={React.string(`Debug`)}, ())}
      {<>
        <Input.TextArea
          value={isDebugChange ? contributeStr : ""}
          onChange={e => {
            setContributeStr(_ => e->EventUtils.getEventTargetValue)
            setIsDebugChange(_ => true)
          }}
        />
        <Button
          onClick={_ => {
            ErrorUtils.showCatchedErrorMessage(() => {
              Method.updateSelectedContribute(
                dispatch,
                service,
                inspectorCurrentContribute.id,
                inspectorCurrentContribute.data.contributePackageData,
                contributeStr,
              )
            }, 5->Some)
          }}>
          {React.string(`提交`)}
        </Button>
      </>}
    </Space>
  }
}
