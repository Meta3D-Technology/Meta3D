open Antd
%%raw("import 'antd/dist/reset.css'")

type showType =
  | Second
  | Third

@react.component
let make = (~service: FrontendType.service, ~account) => {
  let dispatch = AppStore.useDispatch()
  let {selectedPackages} = AppStore.useSelector(({userCenterState}: AppStoreType.state) =>
    userCenterState
  )

  let (isLoaded, setIsLoaded) = React.useState(_ => false)
  let (
    allPublishPackageEntryExtensionProtocols,
    setAllPublishPackageEntryExtensionProtocols,
  ) = React.useState(_ => [])
  let (showType, setShowType) = React.useState(_ => Second)
  let (page, setPage) = React.useState(_ => 1)
  let (
    packageEntryExtensionProtocolItem,
    setPackageEntryExtensionProtocolItem,
  ) = React.useState(_ => None)

  let (
    selectPublishPackageEntryExtensionProtocol,
    setSelectPublishPackageEntryExtensionProtocol,
  ) = React.useState(_ => Meta3dCommonlib.ImmutableHashMap.createEmpty())

  let _onChange = (page, pageSize) => {
    setPage(_ => page)
  }

  RescriptReactRouter.watchUrl(url => {
    switch url.path {
    | list{"PackageMarket"} =>
      setSelectPublishPackageEntryExtensionProtocol(_ =>
        Meta3dCommonlib.ImmutableHashMap.createEmpty()
      )
      // setSelectPublishPackage(_ => Meta3dCommonlib.ImmutableHashMap.createEmpty())

      setPackageEntryExtensionProtocolItem(_ => None)
      // setAllPublishPackages(_ => None)

      setShowType(_ => Second)
      setPage(_ => 1)
    | _ => ()
    }
  })->ignore

  React.useEffect1(() => {
    service.backend.getAllPublishPackageEntryExtensionProtocols(. MarketUtils.getLimitCount(), 0)
    // ->Meta3dBsMostDefault.Most.flatMap(protocols => {
    //   service.backend.getAllPublishPackageProtocolConfigs()->Meta3dBsMostDefault.Most.map(
    //     protocolConfigs => {
    //       (
    //         protocols->Meta3dCommonlib.ArraySt.filter(
    //           ({name}: BackendCloudbaseType.protocol) =>
    //             name->MarketUtils.isNotInnerProtocol,
    //         ),
    //         protocolConfigs->Meta3dCommonlib.ArraySt.filter(
    //           ({name}: CommonType.protocolConfig) =>
    //             name->MarketUtils.isNotInnerProtocol,
    //         ),
    //       )
    //     },
    //     _,
    //   )
    // }, _)
    // ->Meta3dBsMostDefault.Most.observe(((protocols, protocolConfigs)) => {
    ->Meta3dBsMostDefault.Most.observe(
      protocols => {
        setAllPublishPackageEntryExtensionProtocols(_ => protocols)

        setIsLoaded(_ => true)
      },
      //   setAllPublishPackageProtocolConfigs(_ => protocolConfigs)

      _,
    )
    ->Js.Promise.catch(e => {
      setIsLoaded(_ => false)

      MessageUtils.errorWithExn(e->Error.promiseErrorToExn, None)->Obj.magic
    }, _)
    ->ignore

    None
  }, [])

  <Layout>
    <Layout.Header>
      <Nav currentKey="6" account={account} />
    </Layout.Header>
    <Layout.Content>
      {!isLoaded
        ? <Loading text={j`加载中，请稍候`} />
        : {
            switch packageEntryExtensionProtocolItem {
            | Some(item: BackendCloudbaseType.protocol) =>
              <PackageMarketThird service packageEntryExtensionProtocolItem=item />

            | None =>
              <List
                itemLayout=#horizontal
                dataSource={MarketUtils.getCurrentPage(
                  allPublishPackageEntryExtensionProtocols->MarketUtils.groupAllPublishProtocols,
                  page,
                  MarketUtils.getPageSize(),
                )}
                renderItem={(items: array<BackendCloudbaseType.protocol>) => {
                  let firstItem =
                    items->Meta3dCommonlib.ArraySt.getFirst->Meta3dCommonlib.OptionSt.getExn

                  let item =
                    selectPublishPackageEntryExtensionProtocol
                    ->Meta3dCommonlib.ImmutableHashMap.get(firstItem.name)
                    ->Meta3dCommonlib.OptionSt.getWithDefault(firstItem)

                  <List.Item>
                    <List.Item.Meta
                      key={item.displayName}
                      avatar={<img
                        src={item.iconBase64}
                        width="50px"
                        height="50px"
                        onClick={_ => {
                          setPackageEntryExtensionProtocolItem(_ => item->Some)
                        }}
                      />}
                      title={<Typography.Title
                        level=3
                        onClick={_ => {
                          setShowType(_ => Third)

                          setPackageEntryExtensionProtocolItem(_ => item->Some)
                        }}>
                        {React.string(item.displayName)}
                      </Typography.Title>}
                      description={UIDescriptionUtils.build(
                        item.account,
                        item.repoLink,
                        item.description,
                      )}
                    />
                    {SelectUtils.buildSelectWithoutEmpty(
                      version =>
                        setSelectPublishPackageEntryExtensionProtocol(value =>
                          value->Meta3dCommonlib.ImmutableHashMap.set(
                            item.name,
                            items
                            ->Meta3dCommonlib.ArraySt.find(item => item.version === version)
                            ->Meta3dCommonlib.OptionSt.getExn,
                          )
                        ),
                      item.version,
                      items->Meta3dCommonlib.ArraySt.map(item => item.version),
                    )}
                  </List.Item>
                }}
              />
            }
          }}
    </Layout.Content>
    <Layout.Footer>
      {switch isLoaded {
      | true =>
        switch showType {
        | Second =>
          <Pagination
            current={page}
            defaultPageSize={MarketUtils.getPageSize()}
            total={MarketUtils.getAllProtocolsCount(allPublishPackageEntryExtensionProtocols)}
            showSizeChanger=false
            onChange=_onChange
          />
        | Third => React.null
        }
      | false => React.null
      }}
    </Layout.Footer>
  </Layout>
}
