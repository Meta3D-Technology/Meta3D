open Antd
%%raw("import 'antd/dist/reset.css'")
open AssembleSpaceType

module Method = {
  let startPackage = (dispatch, inspectorCurrentPackage: ApAssembleStoreType.package) => {
    dispatch(ApAssembleStoreType.StartPackage(inspectorCurrentPackage.id))
  }

  let unstartPackage = (dispatch, inspectorCurrentPackage: ApAssembleStoreType.package) => {
    dispatch(ApAssembleStoreType.UnStartPackage(inspectorCurrentPackage.id))
  }

  let isPackageStoredInApp = (id, storedPackageIdsInApp) => {
    storedPackageIdsInApp->Meta3dCommonlib.ListSt.includes(id)
  }

  let storePackageInApp = (
    // service: service,
    dispatchForApAssembleStore,
    inspectorCurrentPackage: ApAssembleStoreType.package,
  ) => {
    // service.app.dispatchStorePackageInApp(. dispatchForAppStore, inspectorCurrentPackage.id)
    dispatchForApAssembleStore(ApAssembleStoreType.StorePackageInApp(inspectorCurrentPackage.id))
  }

  let unstorePackageInApp = (
    // service: service,
    dispatchForApAssembleStore,
    inspectorCurrentPackage: ApAssembleStoreType.package,
  ) => {
    // service.app.dispatchUnStorePackageInApp(. dispatchForAppStore, inspectorCurrentPackage.id)
    dispatchForApAssembleStore(ApAssembleStoreType.UnStorePackageInApp(inspectorCurrentPackage.id))
  }

  let getInspectorCurrentPackage = ((
    inspectorCurrentPackageId,
    selectedPackages: ApAssembleStoreType.selectedPackages,
  )) => {
    inspectorCurrentPackageId->Meta3dCommonlib.OptionSt.bind(inspectorCurrentPackageId =>
      selectedPackages->Meta3dCommonlib.ListSt.getBy(package =>
        package.id === inspectorCurrentPackageId
      )
    )
  }

  let updateSelectedPackage = (
    dispatch,
    service: service,
    inspectorCurrentPackage: AssembleSpaceCommonType.packageData,
    extensions,
    contributes,
  ) => {
    dispatch(
      ApAssembleStoreType.UpdateSelectedPackage(
        inspectorCurrentPackage.id,
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
          PackageUtils.buildPackageData(inspectorCurrentPackage),
        ),
      ),
    )
  }

  let setExtension = (
    (setExtensions, setIsDebugChangeMap),
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
    setIsDebugChangeMap(isDebugChangeMap =>
      isDebugChangeMap->Meta3dCommonlib.ImmutableHashMap.set(
        extensionPackageData.protocol.name,
        true,
      )
    )
  }

  let setContribute = (
    (setContributes, setIsDebugChangeMap),
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
    setIsDebugChangeMap(isDebugChangeMap =>
      isDebugChangeMap->Meta3dCommonlib.ImmutableHashMap.set(
        contributePackageData.protocol.name,
        true,
      )
    )
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
      ) = PackageUtils.getPackageAllExtensionAndContributeFileData(
        service,
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

  let resteDebug = (setIsDebugChangeMap, setIsShowDebug) => {
    setIsDebugChangeMap(_ => Meta3dCommonlib.ImmutableHashMap.createEmpty())
    setIsShowDebug(_ => false)
  }

  let useSelector = (
    {inspectorCurrentPackageId, selectedPackages, storedPackageIdsInApp}: ApAssembleStoreType.state,
  ) => {
    (inspectorCurrentPackageId, selectedPackages, storedPackageIdsInApp)
    // (inspectorCurrentPackageId, selectedPackages)
  }
}

@react.component
let make = (~service: service) => {
  // let dispatchForAppStore = service.app.useDispatch()
  let dispatchForApAssembleStore = ReduxUtils.ApAssemble.useDispatch(service.react.useDispatch)

  let (inspectorCurrentPackage, setInspectorCurrentPackage) = service.react.useState(_ => None)
  let (extensions, setExtensions) = service.react.useState(_ => [])
  let (contributes, setContributes) = service.react.useState(_ => [])
  let (isDebugChangeMap, setIsDebugChangeMap) = service.react.useState(_ =>
    Meta3dCommonlib.ImmutableHashMap.createEmpty()
  )
  let (isShowDebug, setIsShowDebug) = service.react.useState(_ => false)

  let (
    inspectorCurrentPackageId,
    selectedPackages,
    storedPackageIdsInApp,
  ) = ReduxUtils.ApAssemble.useSelector(service.react.useSelector, Method.useSelector)

  let dispatch = ReduxUtils.ApAssemble.useDispatch(service.react.useDispatch)

  service.react.useEffect1(. () => {
    Method.useEffectOnce(
      (setInspectorCurrentPackage, setExtensions, setContributes),
      service,
      (inspectorCurrentPackageId, selectedPackages),
    )

    None
  }, [inspectorCurrentPackageId, selectedPackages->Obj.magic])

  service.react.useEffect1(. () => {
    Method.resteDebug(setIsDebugChangeMap, setIsShowDebug)

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
      {service.ui.buildTitle(. ~level=2, ~children={React.string(`基本信息`)}, ())}
      {service.ui.buildText(.
        ~_type=#default,
        ~children={
          React.string({
            j`协议名：${inspectorCurrentPackage.protocol.name}`
          })
        },
        (),
      )}
      {service.ui.buildText(.
        ~_type=#default,
        ~children={
          React.string({
            j`协议版本：${inspectorCurrentPackage.protocol.version}`
          })
        },
        (),
      )}
      {service.ui.buildText(.
        ~_type=#default,
        ~children={
          React.string({
            j`包名：${inspectorCurrentPackage.name}`
          })
        },
        (),
      )}
      {service.ui.buildText(.
        ~_type=#default,
        ~children={
          React.string({
            j`包版本：${inspectorCurrentPackage.version}`
          })
        },
        (),
      )}
      {service.ui.buildText(.
        ~_type=#default,
        ~children={
          React.string({j`入口扩展名：${inspectorCurrentPackage.entryExtensionName}`})
        },
        (),
      )}
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
      {service.ui.buildTitle(. ~level=2, ~children={React.string(`入口包`)}, ())}
      {inspectorCurrentPackage.isStart
        ? <Button
            onClick={_ => {
              Method.unstartPackage(dispatch, inspectorCurrentPackage)
            }}>
            {React.string(`取消启动`)}
          </Button>
        : <Button
            onClick={_ => {
              Method.startPackage(dispatch, inspectorCurrentPackage)
            }}>
            {React.string(`启动`)}
          </Button>}
      {service.ui.buildTitle(. ~level=2, ~children={React.string(`Debug`)}, ())}
      {isShowDebug
        ? <>
            <Button
              onClick={_ => {
                MessageUtils.showCatchedErrorMessage(() => {
                  Method.updateSelectedPackage(
                    dispatch,
                    service,
                    inspectorCurrentPackage,
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
                        value={switch isDebugChangeMap->Meta3dCommonlib.ImmutableHashMap.get(
                          extensionPackageData.protocol.name,
                        ) {
                        | Some(isChange) if isChange => extensionFuncDataStr
                        | _ => ""
                        }}
                        onChange={e => {
                          Method.setExtension(
                            (setExtensions, setIsDebugChangeMap),
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
                        value={switch isDebugChangeMap->Meta3dCommonlib.ImmutableHashMap.get(
                          contributePackageData.protocol.name,
                        ) {
                        | Some(isChange) if isChange => contributeFuncDataStr
                        | _ => ""
                        }}
                        onChange={e => {
                          Method.setContribute(
                            (setContributes, setIsDebugChangeMap),
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
        : <Button
            onClick={_ => {
              Method.showDebug(setIsShowDebug)
            }}>
            {React.string(`显示Debug`)}
          </Button>}
    </Space>
  }
}
