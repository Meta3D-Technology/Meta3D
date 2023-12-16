open Antd
%%raw("import 'antd/dist/reset.css'")
open AssembleSpaceType

module Method = {
  let _dispatchAction = (canvasData, dispatch) => {
    dispatch(ElementAssembleStoreType.SetCanvasData(canvasData))
  }

  let _setData = (dispatch, buildCanvasDataFunc, canvasData) => {
    buildCanvasDataFunc(canvasData)->_dispatchAction(dispatch)
  }

  let setWidth = (dispatch, canvasData, width) => {
    _setData(
      dispatch,
      canvasData => {
        ...canvasData,
        width,
      },
      canvasData,
    )
  }

  let setHeight = (dispatch, canvasData, height) => {
    _setData(
      dispatch,
      canvasData => {
        ...canvasData,
        height,
      },
      canvasData,
    )
  }

  let useSelector = ({canvasData}: ElementAssembleStoreType.state) => {
    canvasData
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = ReduxUtils.ElementAssemble.useDispatch(service.react.useDispatch)

  let {width, height} as canvasData = ReduxUtils.ElementAssemble.useSelector(
    service.react.useSelector,
    Method.useSelector,
  )

  <Space direction=#horizontal size=#small>
    <Typography.Text> {React.string(`画布大小：`)} </Typography.Text>
    <Input
      value={width->Js.Int.toString}
      onChange={e => {
        Method.setWidth(
          dispatch,
          canvasData,
          e->EventUtils.getEventTargetValue->IntUtils.stringToInt,
        )
      }}
    />
    <Input
      value={height->Js.Int.toString}
      onChange={e => {
        Method.setHeight(
          dispatch,
          canvasData,
          e->EventUtils.getEventTargetValue->IntUtils.stringToInt,
        )
      }}
    />
  </Space>
}
