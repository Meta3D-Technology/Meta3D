open Antd
%%raw("import 'antd/dist/antd.css'")

module Method = {
  let buildKey = (elementName, elementVersion) => {
    j`${elementName}_${elementVersion}`
  }

  let groupAllElementAssembleData = (
    allElementAssembleData: array<BackendCloudbaseType.elementAssembleData>,
  ): array<array<BackendCloudbaseType.elementAssembleData>> => {
    MarketUtils.groupAllPublishItems(
      (
        ({elementName}: BackendCloudbaseType.elementAssembleData) => elementName,
        ({elementVersion}: BackendCloudbaseType.elementAssembleData) => elementVersion,
      ),
      allElementAssembleData,
    )
  }

  let getAllElementAssembleDataCount = allElementAssembleData => {
    allElementAssembleData->groupAllElementAssembleData->Meta3dCommonlib.ArraySt.length
  }
}

@react.component
let make = (~service: FrontendType.service) => {
  let dispatch = AppStore.useDispatch()
  let {selectedElements} = AppStore.useSelector((
    {userCenterState}: AppStoreType.state,
  ) => userCenterState)

  let (refreshValue, refresh) = React.useState(_ => Js.Math.random())
  let (isLoaded, setIsLoaded) = React.useState(_ => false)
  let (allElementAssembleData, setAllElementAssembleData) = React.useState(_ => [])
  let (selectedPublishElements, setSelectedPublishElements) = React.useState(_ =>
    Meta3dCommonlib.ImmutableHashMap.createEmpty()
  )
  let (page, setPage) = React.useState(_ => 1)

  let onChange = (page, pageSize) => {
    setPage(_ => page)
  }

  RescriptReactRouter.watchUrl(url => {
    switch url.path {
    | list{"ShowPublishedElements"} =>
      setAllElementAssembleData(_ => [])
      setIsLoaded(_ => false)
      refresh(_ => Js.Math.random())

      setPage(_ => 1)
    | _ => ()
    }
  })->ignore

  React.useEffect1(() => {
    service.backend.findAllElementAssembleData(. MarketUtils.getLimitCount(), 0)
    ->Meta3dBsMostDefault.Most.observe(allElementAssembleData => {
      setAllElementAssembleData(_ => allElementAssembleData)
      setIsLoaded(_ => true)
    }, _)
    ->Js.Promise.catch(e => {
      setIsLoaded(_ => false)

      ErrorUtils.errorWithExn(
        e->Error.promiseErrorToExn,
        None,
      )->Obj.magic
    }, _)
    ->ignore

    None
  }, [refreshValue])

  <Layout>
    <Layout.Header>
      <Nav currentKey="6" />
    </Layout.Header>
    <Layout.Content>
      {!isLoaded
        ? <p> {React.string(`loading...`)} </p>
        : <>
            <List
              itemLayout=#horizontal
              dataSource={MarketUtils.getCurrentPage(
                allElementAssembleData->Method.groupAllElementAssembleData,
                page,
                MarketUtils.getPageSize(),
              )}
              renderItem={(
                items: array<BackendCloudbaseType.elementAssembleData>,
              ) => {
                let firstItem =
                  items->Meta3dCommonlib.ArraySt.getFirst->Meta3dCommonlib.OptionSt.getExn

                let item =
                  selectedPublishElements
                  ->Meta3dCommonlib.ImmutableHashMap.get(firstItem.elementName)
                  ->Meta3dCommonlib.OptionSt.getWithDefault(firstItem)

                <List.Item>
                  <List.Item.Meta
                    key={Method.buildKey(item.elementName, item.elementVersion)}
                    title={<Typography.Title level=3>
                      {React.string(item.elementName)}
                    </Typography.Title>}
                  />
                  {SelectUtils.buildSelectWithoutEmpty(
                    version =>
                      setSelectedPublishElements(value =>
                        value->Meta3dCommonlib.ImmutableHashMap.set(
                          item.elementName,
                          items
                          ->Meta3dCommonlib.ArraySt.find(item => item.elementVersion === version)
                          ->Meta3dCommonlib.OptionSt.getExn,
                        )
                      ),
                    item.elementVersion,
                    items->Meta3dCommonlib.ArraySt.map(item => item.elementVersion),
                  )}
                  {MarketUtils.isSelect(
                    (
                      {
                        elementName,
                        elementVersion,
                      }: BackendCloudbaseType.elementAssembleData,
                    ) => Method.buildKey(elementName, elementVersion),
                    Method.buildKey(item.elementName, item.elementVersion),
                    selectedElements,
                  )
                    ? <Button
                        onClick={_ => {
                          dispatch(
                            AppStoreType.UserCenterAction(
                              UserCenterStoreType.NotSelectElement(
                                item.elementName,
                                item.elementVersion,
                              ),
                            ),
                          )
                        }}>
                        {React.string(`取消选择`)}
                      </Button>
                    : <Button
                        onClick={_ => {
                          dispatch(
                            AppStoreType.UserCenterAction(
                              UserCenterStoreType.SelectElement(item),
                            ),
                          )
                        }}>
                        {React.string(`选择`)}
                      </Button>}
                </List.Item>
              }}
            />
          </>}
    </Layout.Content>
    <Layout.Footer>
      {switch isLoaded {
      | true =>
        <Pagination
          defaultCurrent={1}
          defaultPageSize={MarketUtils.getPageSize()}
          total={allElementAssembleData->Method.getAllElementAssembleDataCount}
          showSizeChanger=false
          onChange
        />
      | false => React.null
      }}
    </Layout.Footer>
  </Layout>
}
