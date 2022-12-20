open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")

@react.component
let make = (~service: FrontendUtils.FrontendType.service) => {
  let dispatch = AppStore.useDispatch()
  let {selectedContributes} = AppStore.useSelector(({userCenterState}: AppStore.state) =>
    userCenterState
  )

  let (isLoaded, setIsLoaded) = React.useState(_ => false)
  let (allPublishContributeProtocols, setAllPublishContributeProtocols) = React.useState(_ => [])
  let (
    allPublishContributeProtocolConfigs,
    setAllPublishContributeProtocolConfigs,
  ) = React.useState(_ => [])
  let (contributeProtocolItem, setContributeProtocolItem) = React.useState(_ => None)
  let (allPublishContributes, setAllPublishContributes) = React.useState(_ => None)

  let (downloadProgress, setDownloadProgress) = React.useState(_ => 0)
  let (isDownloadBegin, setIsDownloadBegin) = React.useState(_ => false)

  let _isSelect = (id, selectedContributes: UserCenterStore.selectedContributes) => {
    selectedContributes->Meta3dCommonlib.ListSt.includesByFunc(((selectedContribute, _)) =>
      id === selectedContribute.id
    )
  }

  RescriptReactRouter.watchUrl(url => {
    switch url.path {
    | list{"ContributeShop"} =>
      setContributeProtocolItem(_ => None)
      setAllPublishContributes(_ => None)
    | _ => ()
    }
  })->ignore

  React.useEffect1(() => {
    service.backend.getAllPublishContributeProtocols()->Meta3dBsMost.Most.flatMap(protocols => {
      service.backend.getAllPublishContributeProtocolConfigs()->Meta3dBsMost.Most.map(
        protocolConfigs => {
          (
            protocols->Meta3dCommonlib.ArraySt.filter(
              ({name}: FrontendUtils.BackendCloudbaseType.protocol) =>
                name->ShopUtils.isNotInnerProtocol,
            ),
            protocolConfigs->Meta3dCommonlib.ArraySt.filter(
              ({name}: FrontendUtils.CommonType.protocolConfig) =>
                name->ShopUtils.isNotInnerProtocol,
            ),
          )
        },
        _,
      )
    }, _)->Meta3dBsMost.Most.observe(((protocols, protocolConfigs)) => {
      setAllPublishContributeProtocols(_ => protocols)
      setAllPublishContributeProtocolConfigs(_ => protocolConfigs)
      setIsLoaded(_ => true)
    }, _)->Js.Promise.catch(e => {
      setIsLoaded(_ => false)

      FrontendUtils.ErrorUtils.errorWithExn(
        e->FrontendUtils.Error.promiseErrorToExn,
        None,
      )->Obj.magic
    }, _)->ignore

    None
  }, [])

  <>
    <Nav />
    {!isLoaded
      ? <p> {React.string(`loading...`)} </p>
      : {
          switch contributeProtocolItem {
          | Some(item: FrontendUtils.BackendCloudbaseType.protocol) =>
            let (protocolName, protocolVersion) = (item.name, item.version)

            switch allPublishContributes {
            | Some(allPublishContributes) =>
              <>
                {isDownloadBegin
                  ? <p>
                      {React.string({j`${downloadProgress->Js.Int.toString}% downloading...`})}
                    </p>
                  : React.null}
                <List
                  itemLayout=#horizontal
                  dataSource={allPublishContributes}
                  renderItem={(item: FrontendUtils.FrontendType.publishContribute) =>
                    <List.Item>
                      <List.Item.Meta
                        key={item.info.name}
                        title={<span> {React.string(item.info.name)} </span>}
                        description={React.string(`TODO`)}
                      />
                      <span> {React.string({j`版本号：${item.info.version}`})} </span>
                      <span> {React.string({j`发布者：${item.info.account}`})} </span>
                      {_isSelect(item.info.id, selectedContributes)
                        ? <Button
                            onClick={_ => {
                              dispatch(
                                AppStore.UserCenterAction(
                                  UserCenterStore.NotSelectContribute(item.info.id),
                                ),
                              )
                            }}>
                            {React.string(`取消选择`)}
                          </Button>
                        : <Button
                            onClick={_ => {
                              setIsDownloadBegin(_ => true)

                              service.backend.findPublishContribute(.
                                progress => setDownloadProgress(_ => progress),
                                item.info.account,
                                item.info.name,
                                item.info.version,
                              )
                              ->Meta3dBsMost.Most.observe(file => {
                                Meta3dCommonlib.NullableSt.isNullable(file)
                                  ? {
                                      setIsDownloadBegin(_ => false)

                                      FrontendUtils.ErrorUtils.error(
                                        {j`找不到contribute file`},
                                        None,
                                      )->Obj.magic
                                    }
                                  : {
                                      setIsDownloadBegin(_ => false)

                                      dispatch(
                                        AppStore.UserCenterAction(
                                          UserCenterStore.SelectContribute(
                                            {
                                              id: item.info.id,
                                              data: service.backend.loadContribute(.
                                                file->Meta3dCommonlib.NullableSt.getExn,
                                              ),
                                              protocolName: item.protocolName,
                                              protocolVersion: item.protocolVersion,
                                              protocolIconBase64: item.protocolIconBase64,
                                              version: item.info.version,
                                              account: item.info.account,
                                            },
                                            allPublishContributeProtocolConfigs->Meta3dCommonlib.ArraySt.find(
                                              (
                                                {
                                                  name,
                                                  version,
                                                }: FrontendUtils.CommonType.protocolConfig,
                                              ) => {
                                                name === protocolName && version === protocolVersion
                                              },
                                            ),
                                          ),
                                        ),
                                      )
                                    }
                              }, _)
                              ->Js.Promise.catch(e => {
                                setIsDownloadBegin(_ => false)

                                FrontendUtils.ErrorUtils.errorWithExn(
                                  e->FrontendUtils.Error.promiseErrorToExn,
                                  None,
                                )->Obj.magic
                              }, _)
                              ->ignore
                            }}>
                            {React.string(`选择`)}
                          </Button>}
                    </List.Item>}
                />
              </>
            | None =>
              setIsLoaded(_ => false)

              service.backend.getAllPublishContributeInfos(. item.name, item.version)
              ->Meta3dBsMost.Most.observe(data => {
                setAllPublishContributes(_ =>
                  data
                  ->Meta3dCommonlib.ArraySt.map(
                    (info): FrontendUtils.FrontendType.publishContribute => {
                      protocolName: item.name,
                      protocolVersion: item.version,
                      protocolIconBase64: item.iconBase64,
                      info,
                    },
                  )
                  ->Some
                )
                setIsLoaded(_ => true)
              }, _)
              ->Js.Promise.catch(e => {
                setIsLoaded(_ => false)

                FrontendUtils.ErrorUtils.errorWithExn(
                  e->FrontendUtils.Error.promiseErrorToExn,
                  None,
                )->Obj.magic
              }, _)
              ->ignore

              <> </>
            }
          | None =>
            <List
              itemLayout=#horizontal
              dataSource={allPublishContributeProtocols}
              renderItem={(item: FrontendUtils.BackendCloudbaseType.protocol) =>
                <List.Item>
                  <List.Item.Meta
                    key={item.name}
                    avatar={<img src={item.iconBase64} />}
                    title={<span
                      onClick={_ => {
                        setContributeProtocolItem(_ => item->Some)
                      }}>
                      {React.string(item.name)}
                    </span>}
                    description={React.string(`TODO`)}
                  />
                  <span> {React.string({j`版本号：${item.version}`})} </span>
                  <span> {React.string({j`发布者：${item.account}`})} </span>
                </List.Item>}
            />
          }
        }}
  </>
}
