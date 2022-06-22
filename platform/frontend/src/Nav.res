@react.component
let make = () => {
//   let onClick = _ => {
//       ()
//   }

<>
        <nav
            style={
                ReactDOM.Style.make(
                    ~borderBottomWidth="1px",
                    ()
                )
            }
        >
                <span onClick={_ => {
RescriptReactRouter.push("/")
                }}>{React.string(`首页`)}</span> 
{React.string("| ")}

                <span onClick={_ => {
RescriptReactRouter.push("/Login")
                }}>{React.string(`登录`)}</span> 
{React.string("| ")}
        </nav>
</>
}
