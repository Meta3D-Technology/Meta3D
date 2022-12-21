open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")

@react.component
let make = (~service: FrontendUtils.FrontendType.service) => {
  let dispatch = AppStore.useDispatch()
  let {selectedPackages} = AppStore.useSelector(({userCenterState}: AppStore.state) =>
    userCenterState
  )

  let (isLoaded, setIsLoaded) = React.useState(_ => false)
  let (
    allPublishPackageEntryExtensionProtocols,
    setAllPublishPackageEntryExtensionProtocols,
  ) = React.useState(_ => [])
  //   let (
  //     allPublishPackageProtocolConfigs,
  //     setAllPublishPackageProtocolConfigs,
  //   ) = React.useState(_ => [])
  let (
    packageEntryExtensionProtocolItem,
    setPackageEntryExtensionProtocolItem,
  ) = React.useState(_ => None)
  let (allPublishPackages, setAllPublishPackages) = React.useState(_ => None)

  let (downloadProgress, setDownloadProgress) = React.useState(_ => 0)
  let (isDownloadBegin, setIsDownloadBegin) = React.useState(_ => false)

  let _isSelect = (id, selectedPackages: UserCenterStore.selectedPackages) => {
    selectedPackages->Meta3dCommonlib.ListSt.includesByFunc(selectedPackage =>
      id === selectedPackage.id
    )
  }

  RescriptReactRouter.watchUrl(url => {
    switch url.path {
    | list{"PackageShop"} =>
      setPackageEntryExtensionProtocolItem(_ => None)
      setAllPublishPackages(_ => None)
    | _ => ()
    }
  })->ignore

  React.useEffect1(() => {
    service.backend.getAllPublishPackageEntryExtensionProtocols()
    // ->Meta3dBsMost.Most.flatMap(protocols => {
    //   service.backend.getAllPublishPackageProtocolConfigs()->Meta3dBsMost.Most.map(
    //     protocolConfigs => {
    //       (
    //         protocols->Meta3dCommonlib.ArraySt.filter(
    //           ({name}: FrontendUtils.BackendCloudbaseType.protocol) =>
    //             name->ShopUtils.isNotInnerProtocol,
    //         ),
    //         protocolConfigs->Meta3dCommonlib.ArraySt.filter(
    //           ({name}: FrontendUtils.CommonType.protocolConfig) =>
    //             name->ShopUtils.isNotInnerProtocol,
    //         ),
    //       )
    //     },
    //     _,
    //   )
    // }, _)
    // ->Meta3dBsMost.Most.observe(((protocols, protocolConfigs)) => {
    ->Meta3dBsMost.Most.observe(
      protocols => {
        setAllPublishPackageEntryExtensionProtocols(_ => protocols)

        setIsLoaded(_ => true)
      },
      //   setAllPublishPackageProtocolConfigs(_ => protocolConfigs)

      _,
    )
    ->Js.Promise.catch(e => {
      setIsLoaded(_ => false)

      FrontendUtils.ErrorUtils.errorWithExn(
        e->FrontendUtils.Error.promiseErrorToExn,
        None,
      )->Obj.magic
    }, _)
    ->ignore

    None
  }, [])

  <>
    <Nav />
    {!isLoaded
      ? <p> {React.string(`loading...`)} </p>
      : {
          switch packageEntryExtensionProtocolItem {
          | Some(item: FrontendUtils.BackendCloudbaseType.protocol) =>
            let (protocolName, protocolVersion) = (item.name, item.version)

            switch allPublishPackages {
            | Some(allPublishPackages) =>
              <>
                {isDownloadBegin
                  ? <p>
                      {React.string({j`${downloadProgress->Js.Int.toString}% downloading...`})}
                    </p>
                  : React.null}
                <List
                  itemLayout=#horizontal
                  dataSource={allPublishPackages}
                  renderItem={(item: FrontendUtils.BackendCloudbaseType.packageImplementInfo) =>
                    <List.Item>
                      <List.Item.Meta
                        key={item.name}
                        title={<span> {React.string(item.name)} </span>}
                        description={React.string(`TODO`)}
                      />
                      <span> {React.string({j`版本号：${item.version}`})} </span>
                      <span> {React.string({j`发布者：${item.account}`})} </span>
                      {_isSelect(item.id, selectedPackages)
                        ? <Button
                            onClick={_ => {
                              dispatch(
                                AppStore.UserCenterAction(
                                  UserCenterStore.NotSelectPackage(item.id),
                                ),
                              )
                            }}>
                            {React.string(`取消选择`)}
                          </Button>
                        : <Button
                            onClick={_ => {
                              setIsDownloadBegin(_ => true)

                              service.backend.findPublishPackage(.
                                progress => setDownloadProgress(_ => progress),
                                // item.entryExtensionProtocolName,
                                // item.entryExtensionProtocolVersion,
                                // item.entryExtensionProtocolIconBase64,
                                item.account,
                                // item.entryExtensionName,
                                item.name,
                                item.version,
                              )
                              ->Meta3dBsMost.Most.observe(
                                file => {
                                  Meta3dCommonlib.NullableSt.isNullable(file)
                                    ? {
                                        setIsDownloadBegin(_ => false)

                                        FrontendUtils.ErrorUtils.error(
                                          {j`找不到package file`},
                                          None,
                                        )->Obj.magic
                                      }
                                    : {
                                        setIsDownloadBegin(_ => false)

                                        dispatch(
                                          AppStore.UserCenterAction(
                                            UserCenterStore.SelectPackage({
                                              id: item.id,
                                              protocol: {
                                                name: item.entryExtensionProtocolName,
                                                version: item.entryExtensionProtocolVersionRange,
                                                iconBase64: item.entryExtensionProtocolIconBase64,
                                              },
                                              entryExtensionName: item.entryExtensionName,
                                              version: item.version,
                                              name: item.name,
                                              binaryFile: file->Meta3dCommonlib.NullableSt.getExn,
                                            }),
                                          ),
                                        )
                                      }
                                },
                                //   data: Meta3d.Main.loadPackage(
                                //     file->Meta3dCommonlib.NullableSt.getExn,
                                //   ),
                                //   version: item.version,
                                //   account: item.account,

                                // allPublishPackageProtocolConfigs->Meta3dCommonlib.ArraySt.find(
                                //   (
                                //     {
                                //       name,
                                //       version,
                                //     }: FrontendUtils.CommonType.protocolConfig,
                                //   ) => {
                                //     name === protocolName && version === protocolVersion
                                //   },
                                // ),

                                _,
                              )
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

              service.backend.getAllPublishPackageInfos(. item.name, item.version)
              ->Meta3dBsMost.Most.observe(data => {
                setAllPublishPackages(_ => data->Some)
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
              dataSource={allPublishPackageEntryExtensionProtocols}
              renderItem={(item: FrontendUtils.BackendCloudbaseType.protocol) =>
                <List.Item>
                  <List.Item.Meta
                    key={item.name}
                    avatar={<img src={item.iconBase64} />}
                    title={<span
                      onClick={_ => {
                        setPackageEntryExtensionProtocolItem(_ => item->Some)
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
