open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  type hookType = {isLoaded: bool, extensions: array<(string, string)>}

  // TODO perf: defer load when panel change
  let _getExtensionsAndContributes = ({getAllPublishExtensionProtocols}, selectedExtensions) => {
    getAllPublishExtensionProtocols()->Meta3dBsMost.Most.map(protocols => {
      protocols->Meta3dCommonlib.ArraySt.reduceOneParam(
        (. result, {name, iconBase64, version}: FrontendUtils.BackendCloudbaseType.protocol) => {
          switch selectedExtensions->Meta3dCommonlib.ListSt.filter(({data}) => {
            let protocol = data.extensionPackageData.protocol

            protocol.name === name && Meta3d.Semver.satisfies(version, protocol.version)
          }) {
          | list{{data}} => result->Meta3dCommonlib.ArraySt.push((name, iconBase64))

          | _ => result
          }
        },
        [],
      )
    }, _)
  }

  let hook = (service, selectedExtensions) => {
    let (isLoaded, setIsLoaded) = React.useState(_ => false)
    let (extensions, setExtensions) = React.useState(_ => [])

    let e = ref(Obj.magic(1))

    React.useEffect1(() => {
      _getExtensionsAndContributes(service, selectedExtensions)
      ->Meta3dBsMost.Most.observe(extensions => {
        setIsLoaded(_ => true)

        setExtensions(_ => extensions)
      }, _)
      ->ignore

      None
    }, [])

    {isLoaded: isLoaded, extensions: extensions}
  }

  let render = ({isLoaded, extensions}) => {
    !isLoaded
      ? <Layout> <Layout.Content> {React.string(`loading...`)} </Layout.Content> </Layout>
      : {
          <Layout>
            <Layout.Header>
              <Button
                onClick={_ => {
                  ()
                }}>
                {React.string(`发布`)}
              </Button>
            </Layout.Header>
            <Layout>
              // TODO extract Sider component
              <Layout.Sider>
                <Collapse defaultActiveKey={["1"]}>
                  <Collapse.Panel header="Extensions" key="1">
                    <List
                      grid={{gutter: 16, column: 3}}
                      dataSource={extensions}
                      renderItem={((name, iconBase64)) => {
                        <List.Item>
                          <Card
                            key={name}
                            bodyStyle={ReactDOM.Style.make(~padding="0px", ())}
                            cover={<img
                              style={ReactDOM.Style.make(~width="50px", ~height="50px", ())}
                              src={iconBase64}
                            />}>
                            <Card.Meta
                              style={ReactDOM.Style.make(~width="100px", ())}
                              title={React.string(name)}
                            />
                          </Card>
                        </List.Item>
                      }}
                    />
                  </Collapse.Panel>
                </Collapse>
              </Layout.Sider>
              <Layout.Content> {React.string(`装配空间`)} </Layout.Content>
            </Layout>
          </Layout>
        }
  }
}

@react.component
let make = (~service: service, ~selectedExtensions: selectedExtensions) => {
  Method.hook(service, selectedExtensions)->Method.render
}
