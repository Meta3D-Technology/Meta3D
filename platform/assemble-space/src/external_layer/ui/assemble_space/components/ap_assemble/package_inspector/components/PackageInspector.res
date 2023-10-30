open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let isPackageStoredInApp = (id, storedPackageIdsInApp) => {
    storedPackageIdsInApp->Meta3dCommonlib.ListSt.includes(id)
  }

  let storePackageInApp = (
    // service: service,
    dispatchForApAssembleStore,
    inspectorCurrentPackage: FrontendUtils.ApAssembleStoreType.package,
  ) => {
    // service.app.dispatchStorePackageInApp(. dispatchForAppStore, inspectorCurrentPackage.id)
    dispatchForApAssembleStore(
      FrontendUtils.ApAssembleStoreType.StorePackageInApp(inspectorCurrentPackage.id),
    )
  }

  let unstorePackageInApp = (
    // service: service,
    dispatchForApAssembleStore,
    inspectorCurrentPackage: FrontendUtils.ApAssembleStoreType.package,
  ) => {
    // service.app.dispatchUnStorePackageInApp(. dispatchForAppStore, inspectorCurrentPackage.id)
    dispatchForApAssembleStore(
      FrontendUtils.ApAssembleStoreType.UnStorePackageInApp(inspectorCurrentPackage.id),
    )
  }

  let getInspectorCurrentPackage = ((
    inspectorCurrentPackageId,
    selectedPackages: FrontendUtils.ApAssembleStoreType.selectedPackages,
  )) => {
    inspectorCurrentPackageId->Meta3dCommonlib.OptionSt.bind(inspectorCurrentPackageId =>
      selectedPackages->Meta3dCommonlib.ListSt.getBy(package =>
        package.id === inspectorCurrentPackageId
      )
    )
  }

  let updateSelectedPackage = (dispatch, service: service, packageId, extensions, contributes) => {
    dispatch(
      FrontendUtils.ApAssembleStoreType.UpdateSelectedPackage(
        packageId,
        service.meta3d.generatePackage(.
          (
            extensions->Meta3dCommonlib.ArraySt.map(((
              extensionPackageData,
              extensionFuncDataStr,
            )) => (
              extensionPackageData,
              service.meta3d.getExtensionFuncData(. extensionFuncDataStr),
            )),
            contributes->Meta3dCommonlib.ArraySt.map(((
              contributePackageData,
              contributeFuncDataStr,
            )) => (
              contributePackageData,
              service.meta3d.getContributeFuncData(. contributeFuncDataStr),
            )),
          ),
          [],
        ),
      ),
    )
  }

  let setExtension = (
    setExtensions,
    newExtensionFuncDataStr,
    extensionPackageData: Meta3d.AppAndPackageFileType.extensionPackageData,
  ) => {
    setExtensions(extensions => {
      extensions->Meta3dCommonlib.ArraySt.map((
        (extensionPackageData_: Meta3d.AppAndPackageFileType.extensionPackageData, _) as extension,
      ) => {
        extensionPackageData_.name == extensionPackageData.name &&
          extensionPackageData_.protocol.name == extensionPackageData.protocol.name
          ? {
              (extensionPackageData_, newExtensionFuncDataStr)
            }
          : extension
      })
    })
  }

  let setContribute = (
    setContributes,
    newContributeFuncDataStr,
    contributePackageData: Meta3d.AppAndPackageFileType.contributePackageData,
  ) => {
    setContributes(contributes => {
      contributes->Meta3dCommonlib.ArraySt.map((
        (
          contributePackageData_: Meta3d.AppAndPackageFileType.contributePackageData,
          _,
        ) as contribute,
      ) => {
        contributePackageData_.name == contributePackageData.name &&
          contributePackageData_.protocol.name == contributePackageData.protocol.name
          ? {
              (contributePackageData_, newContributeFuncDataStr)
            }
          : contribute
      })
    })
  }

  let useEffectOnce = (
    (setInspectorCurrentPackage, setExtensions, setContributes),
    service,
    (inspectorCurrentPackageId, selectedPackages),
  ) => {
    switch (inspectorCurrentPackageId, selectedPackages)->getInspectorCurrentPackage {
    | None =>
      setInspectorCurrentPackage(_ => None)
      setExtensions(_ => [])
      setContributes(_ => [])
    | Some(inspectorCurrentPackage) =>
      setInspectorCurrentPackage(_ => inspectorCurrentPackage->Some)

      let (
        allExtensionFileData,
        allContributeFileData,
      ) = service.meta3d.getAllExtensionAndContributeFileDataOfPackage(.
        inspectorCurrentPackage.binaryFile,
      )

      setExtensions(_ =>
        allExtensionFileData->Meta3dCommonlib.ArraySt.map(((
          extensionPackageData,
          extensionFuncData,
        )) => {
          (extensionPackageData, service.meta3d.getExtensionFuncDataStr(. extensionFuncData))
        })
      )
      setContributes(_ =>
        allContributeFileData->Meta3dCommonlib.ArraySt.map(((
          contributePackageData,
          contributeFuncData,
        )) => {
          (contributePackageData, service.meta3d.getContributeFuncDataStr(. contributeFuncData))
        })
      )
    }
  }

  let showDebug = setIsShowDebug => {
    setIsShowDebug(_ => true)
  }

  let useSelector = (
    {
      inspectorCurrentPackageId,
      selectedPackages,
      storedPackageIdsInApp,
    }: FrontendUtils.ApAssembleStoreType.state,
  ) => {
    (inspectorCurrentPackageId, selectedPackages, storedPackageIdsInApp)
    // (inspectorCurrentPackageId, selectedPackages)
  }
}

@react.component
let make = (~service: service) => {
  // let dispatchForAppStore = service.app.useDispatch()
  let dispatchForApAssembleStore = FrontendUtils.ReduxUtils.ApAssemble.useDispatch(
    service.react.useDispatch,
  )

  let (inspectorCurrentPackage, setInspectorCurrentPackage) = service.react.useState(_ => None)
  let (extensions, setExtensions) = service.react.useState(_ => [])
  let (contributes, setContributes) = service.react.useState(_ => [])
  let (isShowDebug, setIsShowDebug) = service.react.useState(_ => false)

  let (
    inspectorCurrentPackageId,
    selectedPackages,
    storedPackageIdsInApp,
  ) = FrontendUtils.ReduxUtils.ApAssemble.useSelector(service.react.useSelector, Method.useSelector)

  let dispatch = FrontendUtils.ReduxUtils.ApAssemble.useDispatch(service.react.useDispatch)

  service.react.useEffect1(. () => {
    Method.useEffectOnce(
      (setInspectorCurrentPackage, setExtensions, setContributes),
      service,
      (inspectorCurrentPackageId, selectedPackages),
    )

    None
  }, [inspectorCurrentPackageId])

  switch inspectorCurrentPackage {
  | None => React.null
  | Some(inspectorCurrentPackage) =>
    // <Collapse defaultActiveKey={["1"]}>
    //   <Collapse.Panel header="Basic" key="1" />
    //   {}
    // </Collapse>

    <Space direction=#vertical size=#middle>
      {service.ui.buildTitle(. ~level=2, ~children={React.string(`配置`)}, ())}
      {Method.isPackageStoredInApp(inspectorCurrentPackage.id, storedPackageIdsInApp)
        ? <Button
            onClick={_ => {
              Method.unstorePackageInApp(dispatchForApAssembleStore, inspectorCurrentPackage)
            }}>
            {React.string(`不保存在App中`)}
          </Button>
        : <Button
            onClick={_ => {
              Method.storePackageInApp(dispatchForApAssembleStore, inspectorCurrentPackage)
            }}>
            {React.string(`保存在App中`)}
          </Button>}
      {service.ui.buildTitle(. ~level=2, ~children={React.string(`Debug`)}, ())}
      <Button
        onClick={_ => {
          Method.showDebug(setIsShowDebug)
        }}>
        {React.string(`显示Debug`)}
      </Button>
      {isShowDebug
        ? <>
            <Button
              onClick={_ => {
                FrontendUtils.ErrorUtils.showCatchedErrorMessage(() => {
                  Method.updateSelectedPackage(
                    dispatch,
                    service,
                    inspectorCurrentPackage.id,
                    extensions,
                    contributes,
                  )
                }, 5->Some)
              }}>
              {React.string(`提交全部`)}
            </Button>
            {service.ui.buildTitle(. ~level=3, ~children={React.string(`Extension`)}, ())}
            {<List
              itemLayout=#horizontal
              dataSource={extensions}
              renderItem={((extensionPackageData, extensionFuncDataStr)) => {
                <List.Item>
                  <List.Item.Meta
                    key={extensionPackageData.name}
                    title={<Typography.Title level=3>
                      {React.string(extensionPackageData.name)}
                    </Typography.Title>}
                    description={<Space direction=#vertical size=#middle>
                      <Space direction=#horizontal size=#small>
                        <Typography.Text>
                          {React.string({j`协议名：${extensionPackageData.protocol.name}`})}
                        </Typography.Text>
                      </Space>
                      <Input.TextArea
                        value={extensionFuncDataStr}
                        onChange={e => {
                          Method.setExtension(
                            setExtensions,
                            e->EventUtils.getEventTargetValue,
                            extensionPackageData,
                          )
                        }}
                      />
                    </Space>}
                  />
                </List.Item>
              }}
            />}
            {service.ui.buildTitle(. ~level=3, ~children={React.string(`Contribute`)}, ())}
            {<List
              itemLayout=#horizontal
              dataSource={contributes}
              renderItem={((contributePackageData, contributeFuncDataStr)) => {
                <List.Item>
                  <List.Item.Meta
                    key={contributePackageData.name}
                    title={<Typography.Title level=3>
                      {React.string(contributePackageData.name)}
                    </Typography.Title>}
                    description={<Space direction=#vertical size=#middle>
                      <Space direction=#horizontal size=#small>
                        <Typography.Text>
                          {React.string({j`协议名：${contributePackageData.protocol.name}`})}
                        </Typography.Text>
                      </Space>
                      <Input.TextArea
                        value={contributeFuncDataStr}
                        onChange={e => {
                          Method.setContribute(
                            setContributes,
                            e->EventUtils.getEventTargetValue,
                            contributePackageData,
                          )
                        }}
                      />
                    </Space>}
                  />
                </List.Item>
              }}
            />}
          </>
        : React.null}
    </Space>
  }
}
