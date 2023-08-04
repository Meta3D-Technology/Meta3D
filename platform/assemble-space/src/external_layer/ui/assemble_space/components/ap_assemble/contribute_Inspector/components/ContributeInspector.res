open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

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

  let updateSelectedContribute = (
    dispatch,
    service: service,
    contributeId,
    contributePackageData,
    contributeStr,
  ) => {
    dispatch(
      FrontendUtils.ApAssembleStoreType.UpdateSelectedContribute(
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
        service.meta3d.getContributeStr(. inspectorCurrentContribute.data.contributeFuncData)
      )
    }
  }

  let useSelector = (
    {inspectorCurrentContributeId, selectedContributes}: FrontendUtils.ApAssembleStoreType.state,
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

  let (inspectorCurrentContributeId, selectedContributes) = ReduxUtils.ApAssemble.useSelector(
    service.react.useSelector,
    Method.useSelector,
  )

  let dispatch = ReduxUtils.ApAssemble.useDispatch(service.react.useDispatch)

  service.react.useEffect1(. () => {
    Method.useEffectOnce(
      (setInspectorCurrentContribute, setContributeStr),
      service,
      (inspectorCurrentContributeId, selectedContributes),
    )

    None
  }, [inspectorCurrentContributeId])

  switch inspectorCurrentContribute {
  | None => React.null
  | Some(inspectorCurrentContribute) =>
    Js.log(inspectorCurrentContribute)
    // <Collapse defaultActiveKey={["1"]}>
    //   <Collapse.Panel header="Basic" key="1" />
    //   {}
    // </Collapse>

    <Space direction=#vertical size=#middle>
      {service.ui.buildTitle(. ~level=2, ~children={React.string(`Debug`)}, ())}
      {<>
        <Input.TextArea
          value={contributeStr}
          onChange={e => {
            setContributeStr(_ => e->EventUtils.getEventTargetValue)
          }}
        />
        <Button
          onClick={_ => {
            Method.updateSelectedContribute(
              dispatch,
              service,
              inspectorCurrentContribute.id,
              inspectorCurrentContribute.data.contributePackageData,
              contributeStr,
            )
          }}>
          {React.string(`提交`)}
        </Button>
      </>}
    </Space>
  }
}
