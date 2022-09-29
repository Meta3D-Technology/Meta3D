open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let useSelector = ({canvasData}: FrontendUtils.ApViewStoreType.state) => {
    canvasData
  }
}

@react.component
let make = (~service: service) => {
  let {width, height} = ReduxUtils.ApView.useSelector(service.react.useSelector, Method.useSelector)

  <>
    <canvas
      style={ReactDOM.Style.make(
        ~borderStyle="solid",
        ~borderColor="red",
        ~borderWidth="2px",
        ~width={j`${width->Js.Int.toString}px`},
        ~height={j`${height->Js.Int.toString}px`},
        (),
      )}
      width={j`${width->Js.Int.toString}px`}
      height={j`${height->Js.Int.toString}px`}
    />
  </>
}
