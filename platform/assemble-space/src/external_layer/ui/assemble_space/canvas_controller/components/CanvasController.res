open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let addCanvasData = (setAllCanvasData, random) => {
    setAllCanvasData(allCanvasData => {
      allCanvasData->Meta3dCommonlib.ArraySt.push(
        (
          {
            id: IdUtils.generateId(random),
            width: 0,
            height: 0,
            zIndex: 0,
          }: FrontendUtils.AssembleSpaceStoreType.canvasData
        ),
      )
    })
  }

  let _setData = (setAllCanvasData, buildCanvasDataFunc, id, data) => {
    setAllCanvasData(allCanvasData => {
      allCanvasData->Meta3dCommonlib.ArraySt.map((
        canvasData: FrontendUtils.AssembleSpaceStoreType.canvasData,
      ) => {
        canvasData.id == id ? buildCanvasDataFunc(canvasData) : canvasData
      })
    })
  }

  let setWidth = (setAllCanvasData, id, width) => {
    _setData(
      setAllCanvasData,
      canvasData => {
        ...canvasData,
        width: width,
      },
      id,
      width,
    )
  }

  let setHeight = (setAllCanvasData, id, height) => {
    _setData(
      setAllCanvasData,
      canvasData => {
        ...canvasData,
        height: height,
      },
      id,
      height,
    )
  }

  let setZIndex = (setAllCanvasData, id, zIndex) => {
    _setData(
      setAllCanvasData,
      canvasData => {
        ...canvasData,
        zIndex: zIndex,
      },
      id,
      zIndex,
    )
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = service.react.useDispatch()

  let (allCanvasData, setAllCanvasData) = service.react.useState(_ => [])

  service.react.useEffect1(. () => {
    dispatch(FrontendUtils.AssembleSpaceStoreType.SetAllCanvasData(allCanvasData))

    None
  }, [allCanvasData])

  <>
    <Button
      onClick={_ => {
        Method.addCanvasData(setAllCanvasData, service.other.random)
      }}>
      {React.string(`加入Canvas`)}
    </Button>
    <List
      grid={{gutter: 16, column: 1}}
      dataSource={allCanvasData}
      renderItem={({id, width, height, zIndex}) => {
        <List.Item key={id}>
          // TODO extract NumberInput
          <Input
            value={width->Js.Int.toString}
            onChange={e => {
              Method.setWidth(setAllCanvasData, id, e->EventUtils.getEventTargetValue)
            }}
          />
          <Input
            value={height->Js.Int.toString}
            onChange={e => {
              Method.setHeight(setAllCanvasData, id, e->EventUtils.getEventTargetValue)
            }}
          />
          <Input
            value={zIndex->Js.Int.toString}
            onChange={e => {
              Method.setZIndex(setAllCanvasData, id, e->EventUtils.getEventTargetValue)
            }}
          />
        </List.Item>
      }}
    />
  </>
}
