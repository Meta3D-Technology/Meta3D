open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")

@react.component
let make = () => {
  let dispatch = AppStore.useDispatch()
  let {selectedContributes} = AppStore.useSelector(({userCenterState}: AppStore.state) =>
    userCenterState
  )

  let (isLoaded, setIsLoaded) = React.useState(_ => false)
  let (allPublishContributeProtocols, setAllPublishContributeProtocols) = React.useState(_ => [])
  let (contributeProtocolItem, setContributeProtocolItem) = React.useState(_ => None)
  let (allPublishContributes, setAllPublishContributes) = React.useState(_ => None)

  let _isSelect = (id, selectedContributes: UserCenterStore.selectedContributes) => {
    selectedContributes->Meta3dCommonlib.ListSt.includesByFunc(selectedContribute =>
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
    BackendCloudbase.getAllPublishContributeProtocols()->Meta3dBsMost.Most.observe(protocols => {
      setAllPublishContributeProtocols(_ => protocols)
      setIsLoaded(_ => true)
    }, _)->Js.Promise.catch(e => {
      setIsLoaded(_ => false)

      FrontendUtils.ErrorUtils.error(e->Obj.magic, None)->Obj.magic
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
            switch allPublishContributes {
            | Some(allPublishContributes) =>
              <List
                itemLayout=#horizontal
                dataSource={allPublishContributes}
                renderItem={(item: UserCenterStore.contribute) =>
                  <List.Item>
                    <List.Item.Meta
                      key={item.data.contributePackageData.name}
                      title={<span> {React.string(item.data.contributePackageData.name)} </span>}
                      description={React.string(`TODO`)}
                    />
                    <span> {React.string({j`版本号：${item.version}`})} </span>
                    <span> {React.string({j`发布者：${item.username}`})} </span>
                    {_isSelect(item.id, selectedContributes)
                      ? <Button
                          onClick={_ => {
                            dispatch(
                              AppStore.UserCenterAction(
                                UserCenterStore.NotSelectContribute(item.id),
                              ),
                            )
                          }}>
                          {React.string(`取消选择`)}
                        </Button>
                      : <Button
                          onClick={_ => {
                            dispatch(
                              AppStore.UserCenterAction(UserCenterStore.SelectContribute(item)),
                            )
                          }}>
                          {React.string(`选择`)}
                        </Button>}
                  </List.Item>}
              />
            | None =>
              setIsLoaded(_ => false)

              BackendCloudbase.getAllPublishContributes(. item.name, item.version)
              ->Meta3dBsMost.Most.map(data => {
                data->Meta3dCommonlib.ArraySt.map((
                  {id, file, version, username}: FrontendUtils.BackendCloudbaseType.implement,
                ): UserCenterStore.contribute => {
                  {
                    id: id,
                    data: Meta3d.Main.loadContribute(file),
                    version: version,
                    username: username,
                  }
                })
              }, _)
              ->Meta3dBsMost.Most.observe(data => {
                setIsLoaded(_ => true)

                setAllPublishContributes(_ => data->Some)
              }, _)
              ->Js.Promise.catch(e => {
                setIsLoaded(_ => false)

                FrontendUtils.ErrorUtils.error(e->Obj.magic, None)->Obj.magic
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
                  <span> {React.string({j`发布者：${item.username}`})} </span>
                </List.Item>}
            />
          }
        }}
  </>
}
