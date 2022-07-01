open Antd
%%raw("import 'antd/dist/antd.css'")

@react.component
let make = () => {
  let dispatch = AppStore.useDispatch()
  let {selectedExtensions} = AppStore.useSelector(({userCenterState}: AppStore.state) =>
    userCenterState
  )

  let (isLoaded, setIsLoaded) = React.useState(_ => false)
  let (allPublishExtensionProtocols, setAllPublishExtensionProtocols) = React.useState(_ => [])
  let (allPublishExtensions, setAllPublishExtensions) = React.useState(_ => [])

  let (isShowExtensionPage, setIsShowExtensionPage) = React.useState(_ => false)

  let _isSelect = (id, selectedExtensions: UserCenterStore.selectedExtensions) => {
    selectedExtensions->Meta3dCommonlib.ListSt.includesByFunc(selectedExtension =>
      id === selectedExtension.id
    )
  }

  React.useEffect1(() => {
    BackendCloudbase.getAllPublishExtensionProtocols()->Meta3dBsMost.Most.observe(protocols => {
      setAllPublishExtensionProtocols(_ => protocols)
      setIsLoaded(_ => true)
    }, _)->Js.Promise.catch(e => {
      setIsLoaded(_ => false)
      BackendCloudbase.error(~message=Message.message, ~e, ())->Obj.magic
    }, _)->ignore

    None
  }, [])

  <>
    <Nav />
    {!isLoaded
      ? <p> {React.string(`loading...`)} </p>
      : isShowExtensionPage
      ? <List
        itemLayout=#horizontal
        dataSource={allPublishExtensions}
        renderItem={(item: UserCenterStore.extension) =>
          <List.Item>
            <List.Item.Meta
              key={item.data.extensionPackageData.name}
              title={<span> {React.string(item.data.extensionPackageData.name)} </span>}
              description={React.string(`TODO`)}
            />
            {_isSelect(item.id, selectedExtensions)
              ? <Button
                  onClick={_ => {
                    dispatch(AppStore.UserCenterAction(UserCenterStore.NotSelectExtension(item.id)))
                  }}>
                  {React.string(`取消选择`)}
                </Button>
              : <Button
                  onClick={_ => {
                    dispatch(AppStore.UserCenterAction(UserCenterStore.SelectExtension(item)))
                  }}>
                  {React.string(`选择`)}
                </Button>}
          </List.Item>}
      />
      : <List
          itemLayout=#horizontal
          dataSource={allPublishExtensionProtocols}
          renderItem={(item: BackendCloudbase.protocol) =>
            <List.Item>
              <List.Item.Meta
                key={item.name}
                avatar={<img src={item.iconBase64} />}
                title={<span
                  onClick={_ => {
                    setIsLoaded(_ => false)

                    BackendCloudbase.getAllPublishExtensions(item.name, item.version)
                    ->Meta3dBsMost.Most.map(data => {
                      data->Meta3dCommonlib.ArraySt.map((
                        {id, file}: BackendCloudbase.implement,
                      ): UserCenterStore.extension => {
                        {id: id, data: Meta3d.Main.loadExtension(file)}
                      })
                    }, _)
                    ->Meta3dBsMost.Most.observe(data => {
                      setIsLoaded(_ => true)
                      setAllPublishExtensions(_ => data)
                      setIsShowExtensionPage(_ => true)
                    }, _)
                    ->Js.Promise.catch(e => {
                      setIsLoaded(_ => false)
                      BackendCloudbase.error(~message=Message.message, ~e, ())->Obj.magic
                    }, _)
                    ->ignore
                  }}>
                  {React.string(item.name)}
                </span>}
                description={React.string(`TODO`)}
              />
            </List.Item>}
        />}
  </>
}
