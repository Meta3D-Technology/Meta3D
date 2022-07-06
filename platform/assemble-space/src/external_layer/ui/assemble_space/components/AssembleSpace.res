open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  type hookType = {isLoaded: bool, extensions: array<(string, string)>}

  // TODO perf: defer load when panel change
  let _getExtensionsAndContributes = ({getAllPublishExtensionProtocols}, selectedExtensions) => {
    getAllPublishExtensionProtocols()
    ->Meta3dBsMost.Most.map(protocols => {
      // protocols->Meta3dCommonlib.ArraySt.traverseReduceResultM((. 
      protocols->Meta3dCommonlib.ArraySt.reduceOneParam((. 
      result,
          {name, iconBase64, version}: FrontendUtils.BackendCloudbaseType.protocol,
        ) => {
        switch selectedExtensions->Meta3dCommonlib.ListSt.filter(({ data }) => {
        let protocol = data.extensionPackageData.protocol

          protocol.name === name && protocol.version === version
        }){
        // | arr if arr->Meta3dCommonlib.ArraySt.length === 1=>
        | list{{data}} => 
          // let {data} = arr
          // ->Meta3dCommonlib.ArraySt.getExn(0)

result -> Meta3dCommonlib.ArraySt.push((name, iconBase64))


          // ->Meta3dCommonlib.OptionSt.map(({name, iconBase64}) => (name, iconBase64))
          // ->Meta3dCommonlib.OptionSt.get

          | _ => result
        // | arr if arr->Meta3dCommonlib.ArraySt.length !== 1 =>
        //   Meta3dCommonlib.Result.failWith(
        //     Meta3dCommonlib.Log.buildErrorMessage(
        //       ~title="should has one implement of protocol!",
        //       ~description="",
        //       ~reason="",
        //       ~solution="",
        //       ~params="",
        //     ),
        //   )
        }
      }, [])
    }, _)
  }

  let hook = (service, selectedExtensions) => {
    let (isLoaded, setIsLoaded) = React.useState(_ => false)
    let (extensions, setExtensions) = React.useState(_ => [])

    let e = ref(Obj.magic(1))

    React.useEffect1(() => {
      _getExtensionsAndContributes(service, selectedExtensions)
      ->Meta3dBsMost.Most.observe(extensions => {
        // extensions->Meta3dCommonlib.Result.either(
        //   extensions => {
        //     setIsLoaded(_ => true)

        //     setExtensions(_ => extensions)
        //   },
        //   e => {
        //     setIsLoaded(_ => false)

        //     service.error(. e, None)
        //   },
        // )


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
                <List
                  grid={{gutter: 16, column: 3}}
                  dataSource={extensions}
                  renderItem={((name, iconBase64)) => {
                    <List.Item>
                      <Card
                        key={name}
                        style={ReactDOM.Style.make(~width="200px", ())}
                        cover={<img src={iconBase64} />}>
                        <Card.Meta title={React.string(name)} />
                      </Card>
                    </List.Item>
                  }}
                />

                // <Collapse defaultActiveKey={["1"]}
                // // activeKey={"1"}
                // >
                //   <Collapse.Panel header="Extensions" key="1">
                // <List
                //   grid={{gutter: 16, column: 3}}
                //   dataSource={extensions
                //   ->Meta3dCommonlib.ListSt.toArray
                //   ->Meta3dCommonlib.Log.printForDebug}
                //   renderItem={((name, iconBase64)) => {
                //     Js.log(("name: ", name))->ignore
                //     // React.null

                //     <List.Item>
                //       <Card
                //       key={name}
                //         style={ReactDOM.Style.make(~width="200px", ())}
                //         cover={<img src={iconBase64->Meta3dCommonlib.Log.printForDebug} />}>
                //         <Card.Meta  title={React.string(name)} />
                //       </Card>
                //     </List.Item>
                //   }}
                // />
                //   </Collapse.Panel>
                //   // <Collapse.Panel header="Contributes" key="2">
                //   //   <p> {React.string(`111`)} </p>
                //   // </Collapse.Panel>
                // </Collapse>
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
