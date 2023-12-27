open Antd
%%raw("import 'antd/dist/reset.css'")

@react.component
let make = (~service: FrontendType.service) => {
  let dispatch = AppStore.useDispatch()
  let dispatchForApAssembleStore = ReduxUtils.ApAssemble.useDispatch(
    ReactUtils.useDispatchForAssembleSpaceStore,
  )
  let dispatchForElementAssembleStore = ReduxUtils.ElementAssemble.useDispatch(
    ReactUtils.useDispatchForAssembleSpaceStore,
  )

  let (
    (account, release, notUseCacheForFindApp, isInCreateFromScratchTourPhase1),
    isInCreateFromScratchTourPhase2,
  ) = AppStore.useSelector(({userCenterState, assembleSpaceState}: AppStoreType.state) => {
    let {account, release, notUseCacheForFindApp, isInCreateFromScratchTourPhase1} = userCenterState

    (
      (account, release, notUseCacheForFindApp, isInCreateFromScratchTourPhase1),
      assembleSpaceState.elementAssembleState.isInCreateFromScratchTourPhase2,
    )
  })

  let (info, setInfo) = React.useState(_ => None)
  let (allPublishApps, setAllPublishApps) = React.useState(_ => [])
  let (downloadProgress, setDownloadProgress) = React.useState(_ => 0)
  // let (
  //   openCreateFromScratchPhase1BeforeTour,
  //   setOpenCreateFromScratchPhase1BeforeTour,
  // ) = React.useState(_ => true)
  // let (openCreateFromScratchPhase1Tour, setOpenCreateFromScratchPhase1Tour) = React.useState(_ =>
  //   false
  // )
  // let (
  //   openCreateFromScratchPhase3BeforeTour,
  //   setOpenCreateFromScratchPhase3BeforeTour,
  // ) = React.useState(_ => false)
  // let (openCreateFromScratchPhase3Tour, setOpenCreateFromScratchPhase3Tour) = React.useState(_ =>
  //   false
  // )
  // let (releaseData, setReleaseData) = React.useState(_ => None)

  // let beginGuideTarget = React.useRef(Meta3dCommonlib.NullableSt.getEmpty())
  let createFromScratchButtonTarget = React.useRef(Meta3dCommonlib.NullableSt.getEmpty())
  let publishedEditorsTarget = React.useRef(Meta3dCommonlib.NullableSt.getEmpty())
  let navTarget = React.useRef(Meta3dCommonlib.NullableSt.getEmpty())
  let guideTarget = React.useRef(Meta3dCommonlib.NullableSt.getEmpty())

  //   let _storeEngineWholePackageInApp = (dispatch, engineWholePackageId) => {
  //     dispatchForApAssembleStore(ApAssembleStoreType.StorePackageInApp(engineWholePackageId))
  //   }

  //   let _startEditorWholePackage = (dispatch, editorWholePackageId) => {
  //     dispatch(ApAssembleStoreType.StartPackage(editorWholePackageId))
  //   }

  // let _jumptToAssembleSpace = () => {
  //   RescriptReactRouter.push("/AssembleSpace")
  // }

  let _buildCurrentAppName = () => {j`未命名的编辑器`}

  let _jumptToAssembleSpaceToCreateEmptyApp = (dispatch, isInCreateFromScratchTourPhase2) => {
    dispatch(
      AppStoreType.UserCenterAction(UserCenterStoreType.SetCurrentAppName(_buildCurrentAppName())),
    )

    setInfo(_ => None)

    isInCreateFromScratchTourPhase2
      ? RescriptReactRouter.push("/CreateFromScratchGuideBeginInElementAssemble")
      : RescriptReactRouter.push("/AssembleSpace")
  }

  let _createFromScratch = (service, dispatch) => {
    !isInCreateFromScratchTourPhase1 && !GuideUtils.readIsFinishCreateFromScratchTour()
      ? {
          // dispatch(
          //   AppStoreType.UserCenterAction(UserCenterStoreType.StartCreateFromScratchTourPhase1),
          // )
          // dispatchForElementAssembleStore(ElementAssembleStoreType.StartCreateFromScratchTourPhase2)
          // // dispatch(
          // //   AppStoreType.UserCenterAction(UserCenterStoreType.StartCreateFromScratchTourPhase3),
          // // )

          // RescriptReactRouter.push("/UserCenter")

          GuideUtils.startCreateFromScratchTour(dispatch, dispatchForElementAssembleStore)

          RescriptReactRouter.push("/CreateFromScratchGuideBeginInUserCenter")
        }
      : {
          setInfo(_ => {j`加载中，请稍候`}->Some)

          dispatch(AppStoreType.UserCenterAction(UserCenterStoreType.RemoveElement))

          dispatch(
            AppStoreType.UserCenterAction(UserCenterStoreType.EndCreateFromScratchTourPhase1),
          )

          // isInCreateFromScratchTourPhase1 && !GuideUtils.readIsFinishCreateFromScratchTour()
          //   ? dispatchForElementAssembleStore(
          //       ElementAssembleStoreType.StartCreateFromScratchTourPhase2,
          //     )
          //   : ()

          UIControlUtils.selectAllUIControls(service, dispatch, release)->Js.Promise.then_(() => {
            SelectPackageUtils.selectEditorWholeAndEngineWholePackages(service, dispatch, release)
          }, _)->Js.Promise.then_(() => {
            _jumptToAssembleSpaceToCreateEmptyApp(dispatch, isInCreateFromScratchTourPhase2)

            ()->Js.Promise.resolve
          }, _)->Js.Promise.catch(e => {
            MessageUtils.errorWithExn(e->Error.promiseErrorToExn, None)->Obj.magic
          }, _)->ignore
        }

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

  React.useEffect0(() => {
    MessageUtils.showCatchedErrorMessage(() => {
      AssembleSpaceUtils.resetWhenLeave(dispatchForElementAssembleStore)

      setInfo(_ => {j`加载中，请稍候`->Some})

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

          MessageUtils.errorWithExn(e->Error.promiseErrorToExn, None)->Obj.magic
        },
        _,
      )
      ->ignore
    }, 5->Some)

    None
  })

  <Layout>
    <Layout.Header>
      <Nav currentKey="1" account={account} navTarget />
    </Layout.Header>
    <Layout>
      {switch info {
      | Some(info) => <Loading text=info />
      | None =>
        <>
          <Layout.Sider width=300 theme=#light>
            <Help guideTarget />
          </Layout.Sider>
          <Layout.Content>
            <CreateFromScratchGuideInUserCenter
              service createFromScratchButtonTarget publishedEditorsTarget navTarget guideTarget
            />
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
                    MessageUtils.showCatchedErrorMessage(() => {
                      _createFromTemplate()
                    }, 5->Some)
                  }}>
                  {React.string(`导入模板来创建新的编辑器`)}
                </Button>
                <Button
                  _type=#default
                  ref={createFromScratchButtonTarget}
                  onClick={_ => {
                    MessageUtils.showCatchedErrorMessage(() => {
                      _createFromScratch(service, dispatch)
                    }, 5->Some)
                  }}>
                  {React.string(`从头创建新的编辑器`)}
                </Button>
                {UserUtils.isAdmin(account)
                  ? <Button
                      _type=#default
                      onClick={_ => {
                        _jumptToAssembleSpaceToCreateEmptyApp(
                          dispatch,
                          isInCreateFromScratchTourPhase2,
                        )
                      }}>
                      {React.string(`进入装配空间`)}
                    </Button>
                  : React.null}
              </Space>
              <section ref={publishedEditorsTarget->Obj.magic}>
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
                          setInfo(_ => j`${downloadProgress->Js.Int.toString}% 下载中`->Some)

                          PublishedAppUtils.importApp(
                            service,
                            (dispatch, dispatchForApAssembleStore, dispatchForElementAssembleStore),
                            (
                              setDownloadProgress,
                              () => {
                                setInfo(_ => None)
                              },
                            ),
                            notUseCacheForFindApp,
                            release,
                            item,
                          )
                        }}>
                        {React.string(`编辑`)}
                      </Button>
                      <Button
                        _type=#default
                        onClick={_ => {
                          LinkUtils.openLink(PublishedAppUtils.buildURL(item.account, item.appName))
                        }}>
                        {React.string(`运行`)}
                      </Button>
                    </List.Item>}
                />
              </section>
            </Space>
          </Layout.Content>
        </>
      }}
    </Layout>
  </Layout>
}
