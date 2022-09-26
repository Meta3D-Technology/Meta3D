open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let addCanvasData = setAllCanvasData => {
    setAllCanvasData(allCanvasData => {
      allCanvasData->Meta3dCommonlib.ArraySt.push(
        (
          {
            id: IdUtils.generateId(),
            width: 0,
            height: 0,
            zIndex: 0,
          }: FrontendUtils.AssembleSpaceStoreType.canvasData
        ),
      )
    })
  }

  let setWidth = (setAllCanvasData, id, width) => {
    setAllCanvasData(allCanvasData => {
      allCanvasData->Meta3dCommonlib.ArraySt.map((
        canvasData: FrontendUtils.AssembleSpaceStoreType.canvasData,
      ) => {
        canvasData.id == id
          ? {
              ...canvasData,
              width: width,
            }
          : canvasData
      })
    })
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = service.react.useDispatch()

  let (allCanvasData, setAllCanvasData) = React.useState(_ => [])

  React.useEffect1(() => {
    dispatch(FrontendUtils.AssembleSpaceStoreType.SetAllCanvasData(allCanvasData))

    None
  }, allCanvasData)

  <>
    <Button
      onClick={_ => {
        Method.addCanvasData(setAllCanvasData)
      }}>
      {React.string(`加入Canvas`)}
    </Button>
    <List
      grid={{gutter: 16, column: 1}}
      dataSource={allCanvasData}
      renderItem={({id, width, height, zIndex}) => {
        <List.Item>
          // TODO extract NumberInput
          <Input
            value={width->Js.Int.toString}
            onChange={e => {
              Method.setWidth(setAllCanvasData, id, e->EventUtils.getEventTargetValue)
            }}
          />
          // TODO
          // <Input
          //   value={height->Js.Int.toString}
          //   onChange={e => {
          //     Method.setHeight(setAllCanvasData, id, e->EventUtils.getEventTargetValue)
          //   }}
          // />
          // <Input
          //   value={zIndex->Js.Int.toString}
          //   onChange={e => {
          //     Method.setZIndex(setAllCanvasData, id, e->EventUtils.getEventTargetValue)
          //   }}
          // />
        </List.Item>
      }}
    />
  </>
}
