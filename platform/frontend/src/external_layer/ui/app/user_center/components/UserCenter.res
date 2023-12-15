open Antd
%%raw("import 'antd/dist/antd.css'")

@react.component
let make = (~service: FrontendType.service) => {
  let dispatch = AppStore.useDispatch()
  let dispatchForApAssembleStore = ReduxUtils.ApAssemble.useDispatch(
    ReactUtils.useDispatchForAssembleSpaceStore,
  )
  let dispatchForElementAssembleStore = ReduxUtils.ElementAssemble.useDispatch(
    ReactUtils.useDispatchForAssembleSpaceStore,
  )

  let {account} = AppStore.useSelector(({userCenterState}: AppStoreType.state) => userCenterState)

  let (info, setInfo) = React.useState(_ => None)
  let (allPublishApps, setAllPublishApps) = React.useState(_ => [])
  let (downloadProgress, setDownloadProgress) = React.useState(_ => 0)

  let _isNotLogin = account => {
    !(account->Meta3dCommonlib.OptionSt.isSome)
  }

  //   let _storeEngineWholePackageInApp = (dispatch, engineWholePackageId) => {
  //     dispatchForApAssembleStore(ApAssembleStoreType.StorePackageInApp(engineWholePackageId))
  //   }

  //   let _startEditorWholePackage = (dispatch, editorWholePackageId) => {
  //     dispatch(ApAssembleStoreType.StartPackage(editorWholePackageId))
  //   }

  let _jumptToAssembleSpace = () => {
    RescriptReactRouter.push("/AssembleSpace")
  }

  let _buildCurrentAppName = () => {j`未命名的应用`}

  let _getAllUIControlData = () => {
    list{
      ("meta3d-ui-control-asset", "meta3d-ui-control-asset-protocol"),
      ("meta3d-ui-control-button", "meta3d-ui-control-button-protocol"),
      ("meta3d-ui-control-collapsing", "meta3d-ui-control-collapsing-protocol"),
      ("meta3d-ui-control-game-view", "meta3d-ui-control-game-view-protocol"),
      ("meta3d-ui-control-image-button", "meta3d-ui-control-image-button-protocol"),
      ("meta3d-ui-control-input-float3", "meta3d-ui-control-input-float3-protocol"),
      ("meta3d-ui-control-input-text", "meta3d-ui-control-input-text-protocol"),
      ("meta3d-ui-control-menu", "meta3d-ui-control-menu-protocol"),
      ("meta3d-ui-control-scene-view", "meta3d-ui-control-scene-view-protocol"),
      ("meta3d-ui-control-switch-button", "meta3d-ui-control-switch-button-protocol"),
      ("meta3d-ui-control-tree", "meta3d-ui-control-tree-protocol"),
      ("meta3d-ui-control-window", "meta3d-ui-control-window-protocol"),
    }
  }

  let _selectAllUIControls = (service: FrontendType.service, dispatch) => {
    _getAllUIControlData()
    ->Meta3dCommonlib.ListSt.traverseReducePromiseM(list{}, (result, (name, protocolName)) => {
      service.backend.findNewestPublishContribute(. progress => (), name, protocolName)
      ->Meta3dBsMostDefault.Most.map(
        ((
          (description, displayName, repoLink, implementVersion, file, account),
          (protocolVersion, protocolIconBase64, _, _, _),
          protocolConfig,
        )) => {
          (
            (
              {
                id: IdUtils.generateId(Js.Math.random),
                protocolName,
                protocolVersion,
                protocolIconBase64,
                version: implementVersion,
                account,
                data: Meta3d.Main.loadContribute(file),
              }: UserCenterStoreType.contribute
            ),
            protocolConfig->Meta3dCommonlib.OptionSt.fromNullable,
          )
        },
        _,
      )
      ->MostUtils.toPromise
      ->Js.Promise.then_(data => {
        result->Meta3dCommonlib.ListSt.push(data)->Js.Promise.resolve
      }, _)
    })
    ->Js.Promise.then_(allUIControls => {
      dispatch(
        AppStoreType.UserCenterAction(UserCenterStoreType.SelectAllUIControls(allUIControls)),
      )

      ()->Js.Promise.resolve
    }, _)
  }

  let _selectEditorWholeAndEngineWholePackages = (service: FrontendType.service, dispatch) => {
    InitPackageUtils.getEditorWholeAndEngineWholePackageData()
    ->Meta3dCommonlib.ListSt.traverseReducePromiseM(list{}, (
      result,
      (name, entryExtensionName, protocolName),
    ) => {
      service.backend.findNewestPublishPackage(. progress => (), protocolName, name)
      ->Meta3dBsMostDefault.Most.map(data => {
        let (
          file,
          entryExtensionProtocolVersion,
          packageVersion,
          entryExtensionProtocolIconBase64,
          entryExtensionProtocolConfigStr,
        ) =
          data->Meta3dCommonlib.NullableSt.getExn

        (
          {
            id: IdUtils.generateId(Js.Math.random),
            name,
            entryExtensionName,
            version: packageVersion,
            protocol: {
              name: protocolName,
              iconBase64: entryExtensionProtocolIconBase64,
              version: entryExtensionProtocolVersion,
            },
            binaryFile: file,
            protocolConfigStr: entryExtensionProtocolConfigStr->Some,
            isStart: false,
          }: UserCenterStoreType.packageData
        )
      }, _)
      ->MostUtils.toPromise
      ->Js.Promise.then_(data => {
        result->Meta3dCommonlib.ListSt.push(data)->Js.Promise.resolve
      }, _)
    })
    ->Js.Promise.then_(editorWholeAndEngineWholePackages => {
      dispatch(
        AppStoreType.UserCenterAction(
          UserCenterStoreType.SetPackages(editorWholeAndEngineWholePackages),
        ),
      )

      ()->Js.Promise.resolve
    }, _)
  }

  let _jumptToAssembleSpaceToCreateEmptyApp = dispatch => {
    dispatch(
      AppStoreType.UserCenterAction(UserCenterStoreType.SetCurrentAppName(_buildCurrentAppName())),
    )

    setInfo(_ => None)

    _jumptToAssembleSpace()
  }

  let _createFromScratch = (service, dispatch) => {
    setInfo(_ => {j`loading...`}->Some)

    // TODO perf: use batchXxx to merge request
    _selectAllUIControls(service, dispatch)->Js.Promise.then_(() => {
      _selectEditorWholeAndEngineWholePackages(service, dispatch)
    }, _)->Js.Promise.then_(() => {
      _jumptToAssembleSpaceToCreateEmptyApp(dispatch)

      ()->Js.Promise.resolve
    }, _)

    // dispatch(
    //   AppStoreType.UserCenterAction(UserCenterStoreType.SetCurrentAppName(_buildCurrentAppName())),
    // )

    // _jumptToAssembleSpace()
  }

  let _createFromTemplate = () => {
    RescriptReactRouter.push("/ShowPublishedApps")
  }

  React.useEffect0(() => {
    ErrorUtils.showCatchedErrorMessage(() => {
      _isNotLogin(account)
        ? {
            RescriptReactRouter.push("/Login")
          }
        : {
            // dispatch(AppStoreType.UserCenterAction(UserCenterStoreType.Reset))

            setInfo(_ => {j`loading...`->Some})

            service.backend.findAllPublishAppsByAccount(. account->Meta3dCommonlib.OptionSt.getExn)
            ->Meta3dBsMostDefault.Most.observe(
              allPublishApps => {
                setAllPublishApps(_ => allPublishApps)
                setInfo(_ => None)
              },
              _,
            )
            ->Js.Promise.catch(
              e => {
                setAllPublishApps(_ => [])
                setInfo(_ => None)

                ErrorUtils.errorWithExn(e->Error.promiseErrorToExn, None)->Obj.magic
              },
              _,
            )
            ->ignore
          }
    }, 5->Some)

    None
  })

  <Layout>
    <Layout.Header>
      <Nav currentKey="1" account={account} />
    </Layout.Header>
    <Layout.Content>
      //   <Typography.Title>
      //     {React.string({
      //       j`欢迎使用Meta3D内测版 v${VersionConfig.getPlatformVersion()}`
      //     })}
      //   </Typography.Title>
      //   <Typography.Paragraph>
      //     <Typography.Text>
      //       {switch account {
      //       | Some(account) => React.string({j`Account：${account}`})
      //       | None => React.string(``)
      //       }}
      //     </Typography.Text>
      //   </Typography.Paragraph>

      {switch info {
      | Some(info) => React.string(`${info}`)
      | None =>
        <Space direction=#vertical size=#middle>
          <Space direction=#horizontal>
            <Button
              _type=#primary
              onClick={_ => {
                ErrorUtils.showCatchedErrorMessage(() => {
                  _createFromTemplate()
                }, 5->Some)
              }}>
              {React.string(`导入模板来创建新的应用`)}
            </Button>
            <Button
              _type=#default
              onClick={_ => {
                ErrorUtils.showCatchedErrorMessage(() => {
                  _createFromScratch(service, dispatch)->ignore
                }, 5->Some)
              }}>
              {React.string(`从头创建新的应用`)}
            </Button>
            {UserUtils.isAdmin(account)
              ? <Button
                  _type=#default
                  onClick={_ => {
                    _jumptToAssembleSpaceToCreateEmptyApp(dispatch)
                  }}>
                  {React.string(`进入装配空间`)}
                </Button>
              : React.null}
          </Space>
          <Typography.Title> {React.string({j`我发布的应用`})} </Typography.Title>
          <List
            itemLayout=#horizontal
            dataSource={allPublishApps}
            renderItem={(item: BackendCloudbaseType.publishAppInfo) =>
              <List.Item>
                <List.Item.Meta
                  key={PublishedAppUtils.buildKey(item.account, item.appName)}
                  title={<Typography.Title level=3>
                    {React.string(item.appName)}
                  </Typography.Title>}
                  // description={UIDescriptionUtils.buildWithoutRepoLink(
                  //   item.account,
                  //   item.description,
                  // )}
                />
                <Button
                  _type=#primary
                  onClick={_ => {
                    setInfo(_ => j`${downloadProgress->Js.Int.toString}% downloading...`->Some)

                    PublishedAppUtils.importApp(
                      service,
                      (dispatch, dispatchForApAssembleStore, dispatchForElementAssembleStore),
                      (
                        setDownloadProgress,
                        () => {
                          setInfo(_ => None)
                        },
                      ),
                      item,
                    )
                  }}>
                  {React.string(`编辑`)}
                </Button>
                <Button
                  _type=#default
                  onClick={_ => {
                    PublishedAppUtils.openLink(
                      PublishedAppUtils.buildURL(item.account, item.appName),
                    )
                  }}>
                  {React.string(`运行`)}
                </Button>
              </List.Item>}
          />
        </Space>
      }}
    </Layout.Content>
  </Layout>
}
