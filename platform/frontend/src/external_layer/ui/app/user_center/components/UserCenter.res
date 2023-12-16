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

  let {account, release} = AppStore.useSelector(({userCenterState}: AppStoreType.state) =>
    userCenterState
  )

  let (info, setInfo) = React.useState(_ => None)
  let (allPublishApps, setAllPublishApps) = React.useState(_ => [])
  let (downloadProgress, setDownloadProgress) = React.useState(_ => 0)
  // let (releaseData, setReleaseData) = React.useState(_ => None)

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

  let _buildCurrentAppName = () => {j`未命名的编辑器`}

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

    dispatch(AppStoreType.UserCenterAction(UserCenterStoreType.RemoveElement))

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

  let _logOut = dispatch => {
    LoginUtils.logOut()

    dispatch(AppStoreType.UserCenterAction(UserCenterStoreType.LogOut))

    RescriptReactRouter.push("/Login")
  }

  let getReleaseData = dispatch => {
    Window.fetch("https://api.github.com/repos/Meta3D-Technology/Meta3D/releases/latest")
    ->Js.Promise.then_(({json}: WindowType.fetchResult) => {
      json(.)->Js.Promise.resolve
    }, _)
    ->Js.Promise.then_(
      json => {
        let data = json->Obj.magic

        let published_at = data["published_at"]

        dispatch(
          AppStoreType.UserCenterAction(
            UserCenterStoreType.SetRelease(
              (
                {
                  version: data["tag_name"],
                  releaseDateUntilNow: Moment.moment(.).subtract(.
                    Moment.createMomentFromDate(. published_at),
                  ).dayOfYear(.)->Meta3dCommonlib.Log.printStringForDebug,
                }: UserCenterStoreType.release
              ),
            ),
          ),
        )

        ()->Js.Promise.resolve
      },
      // Js.log(Moment.moment(.))
      // Js.log(Moment.createMomentFromDate(. published_at))
      // Js.log(Moment.moment(.).subtract(. Moment.createMomentFromDate(. published_at)))

      // Js.log(Moment.moment(.).subtract(. Moment.createMomentFromDate(. published_at)).month(.))

      // setReleaseData(_ =>
      //   (
      //     {
      //       version: data["tag_name"],
      //       releaseDateUntilNow: Moment.moment(.).subtract(.
      //         Moment.createMomentFromDate(. published_at),
      //       ).date(.)->Meta3dCommonlib.Log.printStringForDebug,
      //     }: UserCenterType.releaseData
      //   )->Some
      // )

      _,
    )
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

            getReleaseData(dispatch)->ignore

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
    <Layout>
      <Layout.Sider width=200 theme=#light>
        <Card key={"0"}>
          <iframe
            src="https://ghbtns.com/github-btn.html?user=Meta3D-Technology&repo=Meta3D&type=star&count=true&size=large"
            // frameborder="0"
            style={ReactDOM.Style.make(
              // ~borderStyle="solid",
              // ~borderColor="red",
              ~borderWidth="0px",
              (),
            )}
            scrolling="0"
            width="170"
            height="30"
            title="GitHub"
          />
          // <span> {React.string(`欢迎Star`)} </span>
        </Card>
        <Card
          key={"1"}
          // title={<span>
          //   <a
          //     href={"https://qm.qq.com/cgi-bin/qm/qr?k=SaSgwsyiccUjc3Mx3Jqliv9HJnHxL-WI&jump_from=webapi&authKey=+EQRAdLQ80spfX++pA3UB4erf6cxC+Mo4jH6bfovhdE7MOvI5WBUljCZ6roGaNZh"}>
          //     {React.string(`点这里`)}
          //   </a>
          //   {React.string(`加QQ群`)}
          // </span>}
        >
          <span>
            <a
              href={"https://qm.qq.com/cgi-bin/qm/qr?k=SaSgwsyiccUjc3Mx3Jqliv9HJnHxL-WI&jump_from=webapi&authKey=+EQRAdLQ80spfX++pA3UB4erf6cxC+Mo4jH6bfovhdE7MOvI5WBUljCZ6roGaNZh"}>
              {React.string(`点这里`)}
            </a>
            {React.string(`加QQ群`)}
          </span>
        </Card>
        <Card key={"2"}>
          <span>
            <a href={"https://meta3d-website.4everland.app/docs/%E7%AE%80%E4%BB%8B"}>
              {React.string(`文档`)}
            </a>
            {React.string(``)}
          </span>
        </Card>
        <Card key={"3"}>
          <span>
            <a href={"https://github.com/Meta3D-Technology/Meta3D/issues/new/choose"}>
              {React.string(`Github`)}
            </a>
            {React.string(`上提Issue`)}
          </span>
        </Card>
        <Card key={"4"}>
          <span>
            <a href={"https://github.com/Meta3D-Technology/Meta3D/discussions"}>
              {React.string(`论坛`)}
            </a>
            {React.string(`上寻求帮助`)}
          </span>
        </Card>
        // <p> {React.string({j`Meta3D v${VersionConfig.getPlatformVersion()}`})} </p>

        {switch release {
        | None => React.null
        | Some({version, releaseDateUntilNow}) =>
          <>
            <Typography.Title level=5> {React.string({j`Meta3D ${version}`})} </Typography.Title>
            <Typography.Title level=5>
              {React.string({j`${releaseDateUntilNow->IntUtils.intToString}天前更新`})}
            </Typography.Title>
          </>
        }}
      </Layout.Sider>
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
            <Typography.Title> {React.string({j`我的信息`})} </Typography.Title>
            <Space direction=#horizontal>
              <Typography.Text>
                {React.string({j`账户名：${account->Meta3dCommonlib.OptionSt.getExn}`})}
              </Typography.Text>
              <Button
                onClick={_ => {
                  _logOut(dispatch)
                }}>
                {React.string(`登出`)}
              </Button>
            </Space>
            <Typography.Title> {React.string({j`我发布的编辑器`})} </Typography.Title>
            <Space direction=#horizontal>
              <Button
                _type=#primary
                onClick={_ => {
                  ErrorUtils.showCatchedErrorMessage(() => {
                    _createFromTemplate()
                  }, 5->Some)
                }}>
                {React.string(`导入模板来创建新的编辑器`)}
              </Button>
              <Button
                _type=#default
                onClick={_ => {
                  ErrorUtils.showCatchedErrorMessage(() => {
                    _createFromScratch(service, dispatch)->ignore
                  }, 5->Some)
                }}>
                {React.string(`从头创建新的编辑器`)}
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
                      LinkUtils.openLink(
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
  </Layout>
}
