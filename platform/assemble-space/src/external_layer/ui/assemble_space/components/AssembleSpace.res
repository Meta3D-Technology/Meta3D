open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  // type hookType = {isLoaded: bool, extensions: array<(string, string)>}

  // TODO perf: defer load when panel change
  // let _getExtensionsAndContributes = (
  //   {getAllPublishExtensionProtocols},
  //   selectedExtensionsFromShop,
  // ) => {
  //   getAllPublishExtensionProtocols()->Meta3dBsMost.Most.map(protocols => {
  //     protocols->Meta3dCommonlib.ArraySt.reduceOneParam(
  //       (. result, {name, iconBase64, version}: FrontendUtils.BackendCloudbaseType.protocol) => {
  //         switch selectedExtensionsFromShop->Meta3dCommonlib.ListSt.filter(({data}) => {
  //           let protocol = data.extensionPackageData.protocol

  //           protocol.name === name && Meta3d.Semver.satisfies(version, protocol.version)
  //         }) {
  //         | list{{data}} => result->Meta3dCommonlib.ArraySt.push((name, iconBase64))

  //         | _ => result
  //         }
  //       },
  //       [],
  //     )
  //   }, _)
  // }

  let hook = (service, selectedExtensionsFromShop) => {
    let isLoaded = service.useSelector(({isLoaded}: FrontendUtils.AssembleSpaceStoreType.state) =>
      isLoaded
    )

    // let (isLoaded, setIsLoaded) = React.useState(_ => false)
    // let (extensions, setExtensions) = React.useState(_ => [])

    // let e = ref(Obj.magic(1))

    // React.useEffect1(() => {
    //   _getExtensionsAndContributes(service, selectedExtensionsFromShop)
    //   ->Meta3dBsMost.Most.observe(extensions => {
    //     setIsLoaded(_ => true)

    //     setExtensions(_ => extensions)
    //   }, _)
    //   ->ignore

    //   None
    // }, [])

    // {isLoaded: isLoaded, extensions: extensions}

    (isLoaded, service, selectedExtensionsFromShop)
  }

  // let render = ({isLoaded, extensions}) => {
  let render = ((isLoaded, service, selectedExtensionsFromShop)) => {
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
                    <Extensions service selectedExtensionsFromShop />
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
let make = (~service: service, ~selectedExtensionsFromShop: selectedExtensionsFromShop) => {
  Method.hook(service, selectedExtensionsFromShop)->Method.render
}
