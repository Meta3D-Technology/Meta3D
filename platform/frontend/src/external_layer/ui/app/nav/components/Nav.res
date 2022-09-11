@react.component
let make = () => {
  <>
    <nav style={ReactDOM.Style.make(~borderBottomWidth="1px", ())}>
      <span
        onClick={_ => {
          RescriptReactRouter.push("/")
        }}>
        {React.string(`首页`)}
      </span>
      {React.string("| ")}
      <span
        onClick={_ => {
          RescriptReactRouter.push("/ExtensionShop")
          Window.reload()
        }}>
        {React.string(`扩展商城`)}
      </span>
      {React.string("| ")}
      <span
        onClick={_ => {
          RescriptReactRouter.push("/ContributeShop")
          Window.reload()
        }}>
        {React.string(`贡献商城`)}
      </span>
      {React.string("| ")}
      <span
        onClick={_ => {
          RescriptReactRouter.push("/ShowPublishedApps")
        }}>
        {React.string(`发布的应用`)}
      </span>
      {React.string("| ")}
      <span
        onClick={_ => {
          RescriptReactRouter.push("/AssembleSpace")
        }}>
        {React.string(`装配空间`)}
      </span>
      {React.string("| ")}
    </nav>
  </>
}
