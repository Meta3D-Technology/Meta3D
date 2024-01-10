open Antd
%%raw("import 'antd/dist/reset.css'")

@react.component
let make = (
  ~currentKey="1",
  ~navTarget: React.ref<Js.Nullable.t<'a>>=Meta3dCommonlib.NullableSt.getEmpty()->Obj.magic,
  ~account,
) => {
  <Space direction=#horizontal>
    <Button
      // level=3
      _type=#text
      onClick={_ => {
        RescriptReactRouter.push("/")
      }}>
      <Typography.Title level=3> {React.string({j`Meta3D`})} </Typography.Title>
    </Button>
    <section ref={navTarget->Obj.magic}>
      <Menu
        theme=#light
        mode=#horizontal
        defaultSelectedKeys={["1"]}
        selectedKeys={[currentKey]}
        onClick={({key}) => {
          switch key {
          | "2" => RescriptReactRouter.push("/ShowPublishedApps")
          | "3" => RescriptReactRouter.push("/ShowPublishedFinalApps")
          | "4" => RescriptReactRouter.push("/ExtensionMarket")
          | "5" => RescriptReactRouter.push("/ContributeMarket")
          | "6" => RescriptReactRouter.push("/PackageMarket")
          | "1"
          | _ =>
            RescriptReactRouter.push("/")
          }
        }}
        items={UserUtils.isAdmin(account)
          ? [
              {
                key: "1",
                label: {React.string(`用户中心`)},
              },
              {
                key: "2",
                label: {React.string(`发布的编辑器`)},
              },
              {
                key: "3",
                label: {React.string(`发布的应用`)},
              },
              {
                key: "4",
                label: {React.string(`扩展市场`)},
              },
              {
                key: "5",
                label: {React.string(`贡献市场`)},
              },
              {
                key: "6",
                label: {React.string(`包市场`)},
              },
            ]
          : [
              {
                key: "1",
                label: {React.string(`用户中心`)},
              },
              {
                key: "2",
                label: {React.string(`发布的编辑器`)},
              },
              {
                key: "3",
                label: {React.string(`发布的应用`)},
              },
            ]}
      />
    </section>
  </Space>
}
