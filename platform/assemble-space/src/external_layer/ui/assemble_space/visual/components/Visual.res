open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let useSelector = ({allCanvasData}: FrontendUtils.AssembleSpaceStoreType.state) => {
    allCanvasData
  }
}

@react.component
let make = (~service: service) => {
  let allCanvasData = service.react.useSelector(Method.useSelector)

  <>
    <List
      grid={{gutter: 16, column: 3}}
      dataSource={allCanvasData->Meta3dCommonlib.ListSt.toArray}
      renderItem={({id, width, height}) => {
        <List.Item>
          <canvas
            key={id}
            style={ReactDOM.Style.make(
              ~borderStyle="solid",
              ~borderColor="red",
              ~borderWidth="2px",
              ~width={j`${width->Js.Int.toString}px`},
              ~height={j`${height->Js.Int.toString}px`},
              // ~zIndex=zIndex->Js.Int.toString,
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
