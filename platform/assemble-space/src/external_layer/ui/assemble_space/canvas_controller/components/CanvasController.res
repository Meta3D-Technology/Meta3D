open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let addCanvasData = ((setAllCanvasData, setSetAllCanvasDataFlag), random) => {
    setAllCanvasData(allCanvasData => {
      allCanvasData->Meta3dCommonlib.ListSt.push(
        (
          {
            id: IdUtils.generateId(random),
            width: 0,
            height: 0,
            // zIndex: 0,
          }: FrontendUtils.AssembleSpaceStoreType.canvasData
        ),
      )
    })

    setSetAllCanvasDataFlag(flag => !flag)
  }

  let _setData = ((setAllCanvasData, setSetAllCanvasDataFlag), buildCanvasDataFunc, id, data) => {
    setAllCanvasData(allCanvasData => {
      allCanvasData->Meta3dCommonlib.ListSt.map((
        canvasData: FrontendUtils.AssembleSpaceStoreType.canvasData,
      ) => {
        canvasData.id == id ? buildCanvasDataFunc(canvasData) : canvasData
      })
    })

    setSetAllCanvasDataFlag(flag => !flag)
  }

  let setWidth = ((setAllCanvasData, setSetAllCanvasDataFlag), id, width) => {
    _setData(
      (setAllCanvasData, setSetAllCanvasDataFlag),
      canvasData => {
        ...canvasData,
        width: width,
      },
      id,
      width,
    )
  }

  let setHeight = ((setAllCanvasData, setSetAllCanvasDataFlag), id, height) => {
    _setData(
      (setAllCanvasData, setSetAllCanvasDataFlag),
      canvasData => {
        ...canvasData,
        height: height,
      },
      id,
      height,
    )
  }

  // let setZIndex = ((setAllCanvasData, setSetAllCanvasDataFlag), id, zIndex) => {
  //   _setData(
  //     (setAllCanvasData, setSetAllCanvasDataFlag),
  //     canvasData => {
  //       ...canvasData,
  //       zIndex: zIndex,
  //     },
  //     id,
  //     zIndex,
  //   )
  // }
}

@react.component
let make = (~service: service) => {
  let dispatch = service.react.useDispatch()

  let (allCanvasData, setAllCanvasData) = service.react.useState(_ => list{})
  let (setAllCanvasDataFlag, setSetAllCanvasDataFlag) = service.react.useState(_ => false)

  service.react.useEffect1(. () => {
    dispatch(FrontendUtils.AssembleSpaceStoreType.SetAllCanvasData(allCanvasData))

    None
  }, [setAllCanvasDataFlag])

  <>
    <Button
      onClick={_ => {
        Method.addCanvasData((setAllCanvasData, setSetAllCanvasDataFlag), service.other.random)
      }}>
      {React.string(`加入Canvas`)}
    </Button>
    <List
      // grid={{gutter: 16, column: 1}}
      dataSource={allCanvasData->Meta3dCommonlib.ListSt.toArray}
      renderItem={({id, width, height}) => {
        <List.Item key={id}>
          // TODO extract NumberInput
          <Input
            value={width->Js.Int.toString}
            onChange={e => {
              Method.setWidth(
                (setAllCanvasData, setSetAllCanvasDataFlag),
                id,
                e->EventUtils.getEventTargetValue,
              )
            }}
          />
          <Input
            value={height->Js.Int.toString}
            onChange={e => {
              Method.setHeight(
                (setAllCanvasData, setSetAllCanvasDataFlag),
                id,
                e->EventUtils.getEventTargetValue,
              )
            }}
          />
          // <Input
          //   value={zIndex->Js.Int.toString}
          //   onChange={e => {
          //     Method.setZIndex(
          //       (setAllCanvasData, setSetAllCanvasDataFlag),
          //       id,
          //       e->EventUtils.getEventTargetValue,
          //     )
          //   }}
          // />
        </List.Item>
      }}
    />
  </>
}
