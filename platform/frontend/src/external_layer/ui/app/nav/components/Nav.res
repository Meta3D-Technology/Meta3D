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
        RouterUtils.pushUrl("/")
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
          | "2" => RouterUtils.pushUrl("/ShowPublishedApps")
          | "3" => RouterUtils.pushUrl("/ShowPublishedFinalApps")
          | "4" => RouterUtils.pushUrl("/ExtensionMarket")
          | "5" => RouterUtils.pushUrl("/ContributeMarket")
          | "6" => RouterUtils.pushUrl("/PackageMarket")
          | "1"
          | _ =>
            RouterUtils.pushUrl("/")
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
