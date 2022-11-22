open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let setIsDebug = (dispatch, isDebug) => {
    dispatch(FrontendUtils.ApAssembleStoreType.SetIsDebug(isDebug->BoolUtils.stringToBool))
  }

  let setClearColorR = (dispatch, (_, g, b, a), r) => {
    dispatch(FrontendUtils.ApAssembleStoreType.SetClearColor((r, g, b, a)))
  }

  let setClearColorG = (dispatch, (r, _, b, a), g) => {
    dispatch(FrontendUtils.ApAssembleStoreType.SetClearColor((r, g, b, a)))
  }

  let setClearColorB = (dispatch, (r, g, _, a), b) => {
    dispatch(FrontendUtils.ApAssembleStoreType.SetClearColor((r, g, b, a)))
  }

  let setClearColorA = (dispatch, (r, g, b, _), a) => {
    dispatch(FrontendUtils.ApAssembleStoreType.SetClearColor((r, g, b, a)))
  }

  let buildClearColorField = (dispatch, setClearColorField, clearColor, clearColorField) => {
    <>
      // TODO extract IntInput
      <Input
        value={clearColorField->FloatUtils.floatToString}
        onChange={e => {
          setClearColorField(
            dispatch,
            clearColor,
            e->EventUtils.getEventTargetValue->FloatUtils.stringToFloat,
          )
        }}
      />
    </>
  }

  let setSkinName = (dispatch, skinName) => {
    SelectUtils.isEmptySelectOptionValue(skinName)
      ? dispatch(FrontendUtils.ApAssembleStoreType.SetSkinName(None))
      : {
          dispatch(FrontendUtils.ApAssembleStoreType.SetSkinName(skinName->Some))
        }
  }

  let useSelector = (
    {
      selectedContributes,
      isShowApInspector,
      apInspectorData,
    }: FrontendUtils.ApAssembleStoreType.state,
  ) => {
    (isShowApInspector, selectedContributes, apInspectorData)
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = ReduxUtils.ApAssemble.useDispatch(service.react.useDispatch)

  let (isShowApInspector, selectedContributes, apInspectorData) = ReduxUtils.ApAssemble.useSelector(
    service.react.useSelector,
    Method.useSelector,
  )

  let {isDebug, clearColor, skinName} = apInspectorData

  let (r, g, b, a) = clearColor

  isShowApInspector
    ? <>
        <h1> {React.string(`IsDebug`)} </h1>
        {SelectUtils.buildSelect(
          Method.setIsDebug(dispatch),
          isDebug->BoolUtils.boolToString,
          ["true", "false"],
        )}
        <h1> {React.string(`ClearColor`)} </h1>
        {Method.buildClearColorField(dispatch, Method.setClearColorR, clearColor, r)}
        {Method.buildClearColorField(dispatch, Method.setClearColorG, clearColor, g)}
        {Method.buildClearColorField(dispatch, Method.setClearColorB, clearColor, b)}
        {Method.buildClearColorField(dispatch, Method.setClearColorA, clearColor, a)}
        <h1> {React.string(`Skin`)} </h1>
        {SelectUtils.buildSelect(
          Method.setSkinName(dispatch),
          skinName->Meta3dCommonlib.OptionSt.getWithDefault(
            SelectUtils.buildEmptySelectOptionValue(),
          ),
          selectedContributes
          ->SelectedContributesUtils.getSkins
          ->Meta3dCommonlib.ListSt.toArray
          ->Meta3dCommonlib.ArraySt.map(({data}) => {
            (
              service.meta3d.execGetContributeFunc(.
                data.contributeFuncData,
                Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              )->Obj.magic
            )["skinName"]
          }),
        )}
      </>
    : React.null
}
