@react.component
let make = () => {
//  <div>
//     {React.string("App")}
//   </div>

 let url = RescriptReactRouter.useUrl()


// RescriptReactRouter.watchUrl(url => {
//       {switch url.path {
//       | list{"Login"} => <Login />
//       | list{}
//       | _ =>
//         <Index />
//       }}
// })->ignore

      {switch url.path {
      | list{"Login"} => <Login />
      | list{}
      | _ =>
        <Index />
      }}
}
