open Antd
%%raw("import 'antd/dist/antd.css'")

@react.component
let make = () => {
  let dispatch = AppStore.useDispatch()

  let (isLoaded, setIsLoaded) = React.useState(_ => false)
  let (allPublishExtensionProtocols, setAllPublishExtensionProtocols) = React.useState(_ => [])
  let (allPublishExtensions, setAllPublishExtensions) = React.useState(_ => [])

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
      : {
          <List
            itemLayout=#horizontal
            dataSource={allPublishExtensionProtocols}
            // rowKey={(item: BackendCloudbase.protocol) => {
            //   item.name->Meta3dCommonlib.Log.printForDebug
            // }}
            renderItem={(item: BackendCloudbase.protocol) =>
              <List.Item>
                <List.Item.Meta
                  key={item.name}
                  avatar={<img src={item.iconBase64} />}
                  title={<span
                    onClick={_ => {
                      ()
                    }}>
                    {React.string(item.name)}
                  </span>}
                  description={React.string(`TODO`)}
                />
              </List.Item>}
          />
        }}
  </>
}
