open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let _dispatchAction = (canvasData, dispatch) => {
    dispatch(FrontendUtils.ApViewStoreType.SetCanvasData(canvasData))
  }

  let _setData = (dispatch, buildCanvasDataFunc, canvasData) => {
    buildCanvasDataFunc(canvasData)->_dispatchAction(dispatch)
  }

  let setWidth = (dispatch, canvasData, width) => {
    _setData(
      dispatch,
      canvasData => {
        ...canvasData,
        width: width,
      },
      canvasData,
    )
  }

  let setHeight = (dispatch, canvasData, height) => {
    _setData(
      dispatch,
      canvasData => {
        ...canvasData,
        height: height,
      },
      canvasData,
    )
  }

  let useSelector = ({canvasData}: FrontendUtils.ApViewStoreType.state) => {
    canvasData
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = ReduxUtils.ApView.useDispatch(service.react.useDispatch)

  let {width, height} as canvasData = ReduxUtils.ApView.useSelector(
    service.react.useSelector,
    Method.useSelector,
  )

  <>
    <Input
      value={width->Js.Int.toString}
      onChange={e => {
        Method.setWidth(dispatch, canvasData, e->EventUtils.getEventTargetValue)
      }}
    />
    <Input
      value={height->Js.Int.toString}
      onChange={e => {
        Method.setHeight(dispatch, canvasData, e->EventUtils.getEventTargetValue)
      }}
    />
  </>
}
