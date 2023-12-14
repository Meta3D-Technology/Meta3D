open Antd
%%raw("import 'antd/dist/antd.css'")

@react.component
let make = (~currentKey="2", ~appName) => {
  <Menu
    theme=#dark
    mode=#horizontal
    defaultSelectedKeys={["2"]}
    selectedKeys={[currentKey]}
    onClick={({key}) => {
      switch key {
      | "1" => RescriptReactRouter.push("/UserCenter")
      | "2"
      | _ =>
        RescriptReactRouter.push("/AssembleSpace")
      }
    }}
    items=[
      {
        key: "1",
        label: {React.string(`返回用户中心`)},
      },
      {
        key: "2",
        label: {React.string(`${appName}`)},
      },
    ]
  />
}
