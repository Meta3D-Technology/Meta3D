open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let showApInspector = dispatch => {
    dispatch(FrontendUtils.ApAssembleStoreType.ShowApInspector)
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = FrontendUtils.ReduxUtils.ApAssemble.useDispatch(service.react.useDispatch)

  <>
    <Button
      onClick={_ => {
        Method.showApInspector(dispatch)
      }}>
      {React.string(`显示Ap Inspector`)}
    </Button>
  </>
}
