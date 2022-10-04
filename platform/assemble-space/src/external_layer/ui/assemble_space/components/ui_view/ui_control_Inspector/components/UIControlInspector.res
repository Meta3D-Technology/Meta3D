open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let getCurrentSelectedUIControlInspectorData = ((
    inspectorCurrentUIControlId,
    selectedUIControlInspectorData: FrontendUtils.UIViewStoreType.selectedUIControlInspectorData,
  )) => {
    inspectorCurrentUIControlId->Meta3dCommonlib.OptionSt.bind(inspectorCurrentUIControlId =>
      selectedUIControlInspectorData->Meta3dCommonlib.ListSt.getBy(data =>
        data.id === inspectorCurrentUIControlId
      )
    )
  }

  let setRect = (dispatch, id, rect) => {
    dispatch(FrontendUtils.UIViewStoreType.SetRect(id, rect))
  }

  let useSelector = (
    {
      inspectorCurrentUIControlId,
      selectedUIControlInspectorData,
    }: FrontendUtils.UIViewStoreType.state,
  ) => {
    (inspectorCurrentUIControlId, selectedUIControlInspectorData)
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = ReduxUtils.UIView.useDispatch(service.react.useDispatch)

  switch ReduxUtils.UIView.useSelector(
    service.react.useSelector,
    Method.useSelector,
  )->Method.getCurrentSelectedUIControlInspectorData {
  | None => React.null
  | Some({id, rect}) =>
    let {x, y, width, height} = rect

    <>
      <h1> {React.string(`Rect`)} </h1>
      // TODO extract IntInput
      <Input
        value={x->Js.Int.toString}
        onChange={e => {
          Method.setRect(
            dispatch,
            id,
            {
              ...rect,
              x: e->EventUtils.getEventTargetValue->IntUtils.stringToInt,
            },
          )
        }}
      />
      <Input
        value={y->Js.Int.toString}
        onChange={e => {
          Method.setRect(
            dispatch,
            id,
            {
              ...rect,
              y: e->EventUtils.getEventTargetValue->IntUtils.stringToInt,
            },
          )
        }}
      />
      <Input
        value={width->Js.Int.toString}
        onChange={e => {
          Method.setRect(
            dispatch,
            id,
            {
              ...rect,
              width: e->EventUtils.getEventTargetValue->IntUtils.stringToInt,
            },
          )
        }}
      />
      <Input
        value={height->Js.Int.toString}
        onChange={e => {
          Method.setRect(
            dispatch,
            id,
            {
              ...rect,
              height: e->EventUtils.getEventTargetValue->IntUtils.stringToInt,
            },
          )
        }}
      />
    </>
  }
}
