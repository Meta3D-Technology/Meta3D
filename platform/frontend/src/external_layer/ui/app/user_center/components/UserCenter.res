open Antd
%%raw("import 'antd/dist/antd.css'")

@react.component
let make = (~service: FrontendType.service) => {
  let dispatch = AppStore.useDispatch()

  let {account} = AppStore.useSelector(({userCenterState}: AppStoreType.state) => userCenterState)

  let (info, setInfo) = React.useState(_ => None)

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

  let _createFromScratch = (service, dispatch) => {
    setInfo(_ => {j`加载中...`}->Some)

    // TODO perf: use batchXxx to merge request
    _selectAllUIControls(service, dispatch)->Js.Promise.then_(() => {
      _selectEditorWholeAndEngineWholePackages(service, dispatch)
    }, _)->Js.Promise.then_(() => {
      dispatch(
        AppStoreType.UserCenterAction(
          UserCenterStoreType.SetCurrentAppName(_buildCurrentAppName()),
        ),
      )

      setInfo(_ => None)

      _jumptToAssembleSpace()

      ()->Js.Promise.resolve
    }, _)

    // dispatch(
    //   AppStoreType.UserCenterAction(UserCenterStoreType.SetCurrentAppName(_buildCurrentAppName())),
    // )

    // _jumptToAssembleSpace()
  }

  React.useEffect0(() => {
    ErrorUtils.showCatchedErrorMessage(() => {
      _isNotLogin(account)
        ? {
            RescriptReactRouter.push("/Login")
          }
        : ()
    }, 5->Some)

    None
  })

  <Layout>
    <Layout.Header>
      <Nav currentKey="1" />
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
            //   <Button _type=#primary
            //   onClick={_ => {
            //       ErrorUtils.showCatchedErrorMessage(() => {

            //       }, 5->Some)
            //     }}
            //   > {React.string(`导入模板来创建新的应用`)}
            //   </Button>
            <Button
              _type=#default
              onClick={_ => {
                ErrorUtils.showCatchedErrorMessage(() => {
                  _createFromScratch(service, dispatch)->ignore
                }, 5->Some)
              }}>
              {React.string(`从头创建新的应用`)}
            </Button>
          </Space>
          <Typography.Title> {React.string({j`我发布的应用`})} </Typography.Title>
        </Space>
      }}
    </Layout.Content>
  </Layout>
}
