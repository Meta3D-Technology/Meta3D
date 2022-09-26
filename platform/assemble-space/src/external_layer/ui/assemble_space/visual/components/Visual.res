open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  //   let updateAllCanvas = allCanvasData => {
  //     //TODO implement
  //     Obj.magic(1)
  //   }

  let useSelector = ({allCanvasData}: FrontendUtils.AssembleSpaceStoreType.state) => {
    allCanvasData
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = service.react.useDispatch()

  let allCanvasData = service.react.useSelector(Method.useSelector)

  //   React.useEffect1(() => {
  //     Method.updateAllCanvas(allCanvasData)

  //     None
  //   }, allCanvasData)

  <>
    <List
      grid={{gutter: 16, column: 3}}
      dataSource={allCanvasData}
      renderItem={({width, height, zIndex}) => {
        <List.Item>
          <canvas
            style={ReactDOM.Style.make(
              ~borderColor="red",
              ~borderWidth="2px",
              ~width={j`${width->Js.Int.toString}px`},
              ~height={j`${height->Js.Int.toString}px`},
              ~zIndex=zIndex->Js.Int.toString,
              (),
            )}
            width={j`${width->Js.Int.toString}px`}
            height={j`${height->Js.Int.toString}px`}
          />
        </List.Item>
      }}
    />
  </>
}
