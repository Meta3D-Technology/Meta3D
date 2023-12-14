open Antd
%%raw("import 'antd/dist/antd.css'")

@react.component
let make = (~currentKey="1") => {
  <Menu
    theme=#dark
    mode=#horizontal
    defaultSelectedKeys={["1"]}
    selectedKeys={[currentKey]}
    onClick={({key}) => {
      switch key {
      | "2" => RescriptReactRouter.push("/ExtensionMarket")
      | "3" => RescriptReactRouter.push("/ContributeMarket")
      | "4" => RescriptReactRouter.push("/PackageMarket")
      | "5" => RescriptReactRouter.push("/ShowPublishedApps")
      // | "6" => RescriptReactRouter.push("/ShowPublishedElements")
      | "6" => RescriptReactRouter.push("/AssembleSpace")
      | "1"
      | _ =>
        RescriptReactRouter.push("/")
      }
    }}
    items=[
      {
        key: "1",
        label: {React.string(`首页`)},
      },
      {
        key: "2",
        label: {React.string(`扩展市场`)},
      },
      {
        key: "3",
        label: {React.string(`贡献市场`)},
      },
      {
        key: "4",
        label: {React.string(`包市场`)},
      },
      {
        key: "5",
        label: {React.string(`发布的应用`)},
      },
      // {
      //   key: "6",
      //   label: {React.string(`发布的页面`)},
      // },
      {
        key: "6",
        label: {React.string(`装配空间`)},
      },
    ]
  />
}
