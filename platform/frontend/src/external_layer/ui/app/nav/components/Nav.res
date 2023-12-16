open Antd
%%raw("import 'antd/dist/reset.css'")

@react.component
let make = (~currentKey="1", ~account) => {
  <Menu
    theme=#dark
    mode=#horizontal
    defaultSelectedKeys={["1"]}
    selectedKeys={[currentKey]}
    onClick={({key}) => {
      switch key {
      | "2" => RescriptReactRouter.push("/ShowPublishedApps")
      | "3" => RescriptReactRouter.push("/ExtensionMarket")
      | "4" => RescriptReactRouter.push("/ContributeMarket")
      | "5" => RescriptReactRouter.push("/PackageMarket")
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
            label: {React.string(`扩展市场`)},
          },
          {
            key: "4",
            label: {React.string(`贡献市场`)},
          },
          {
            key: "5",
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
        ]}
  />
}
