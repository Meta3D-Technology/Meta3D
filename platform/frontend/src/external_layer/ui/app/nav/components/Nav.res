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
          RescriptReactRouter.push("/ExtensionMarket")
        }}>
        {React.string(`扩展市场`)}
      </span>
      {React.string("| ")}
      <span
        onClick={_ => {
          RescriptReactRouter.push("/ContributeMarket")
        }}>
        {React.string(`贡献市场`)}
      </span>
      {React.string("| ")}
      <span
        onClick={_ => {
          RescriptReactRouter.push("/PackageMarket")
        }}>
        {React.string(`包市场`)}
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
