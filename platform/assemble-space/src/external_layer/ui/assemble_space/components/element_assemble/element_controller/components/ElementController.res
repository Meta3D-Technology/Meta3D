open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let showElementInspector = dispatch => {
    dispatch(FrontendUtils.ElementAssembleStoreType.ShowElementInspector)
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = FrontendUtils.ReduxUtils.ElementAssemble.useDispatch(service.react.useDispatch)

  <>
    <Button
      onClick={_ => {
        Method.showElementInspector(dispatch)
      }}>
      {React.string(`显示Element Inspector`)}
    </Button>
  </>
}
