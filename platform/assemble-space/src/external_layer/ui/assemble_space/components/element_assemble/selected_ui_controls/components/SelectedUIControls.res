open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let selectUIControl = (dispatch, id) => {
    dispatch(FrontendUtils.ElementAssembleStoreType.SelectSelectedUIControl(id))
  }

  let useSelector = ({selectedUIControls}: FrontendUtils.ElementAssembleStoreType.state) => {
    selectedUIControls
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = ReduxUtils.ElementAssemble.useDispatch(service.react.useDispatch)

  let selectedUIControls = ReduxUtils.ElementAssemble.useSelector(
    service.react.useSelector,
    Method.useSelector,
  )

  <List
    grid={{gutter: 16, column: 1}}
    dataSource={selectedUIControls->Meta3dCommonlib.ListSt.toArray}
    renderItem={({id, protocolIconBase64, name, data} as contribute) => {
      <List.Item>
        <Card
          key={id}
          onClick={_ => {
            Method.selectUIControl(dispatch, id)
          }}
          bodyStyle={ReactDOM.Style.make(~padding="0px", ())}
          cover={<img
            style={ReactDOM.Style.make(~width="50px", ~height="50px", ())} src={protocolIconBase64}
          />}>
          <Card.Meta style={ReactDOM.Style.make(~width="100px", ())} title={React.string(name)} />
        </Card>
      </List.Item>
    }}
  />
}
