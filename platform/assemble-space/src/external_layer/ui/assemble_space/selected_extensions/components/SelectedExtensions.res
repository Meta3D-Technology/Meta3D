open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let selectExtension = (dispatch, id) => {
    dispatch(FrontendUtils.AssembleSpaceStoreType.SetInspectorCurrentExtensionId(id))
  }

  let useSelector = ({selectedExtensions}: FrontendUtils.AssembleSpaceStoreType.state) => {
    // service.react.useSelector(store => store.selectedExtensions)
    selectedExtensions
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = service.react.useDispatch()
  // let selectedExtensions = service.react.useSelector((
  //   {selectedExtensions}: FrontendUtils.AssembleSpaceStoreType.state,
  // ) => selectedExtensions)

  let selectedExtensions = service.react.useSelector(Method.useSelector)

  <List
    grid={{gutter: 16, column: 1}}
    dataSource={selectedExtensions->Meta3dCommonlib.ListSt.toArray}
    renderItem={({id, protocolIconBase64, newName, data} as extension) => {
      <List.Item>
        <Card
          key={id}
          onClick={_ => {
            Method.selectExtension(dispatch, id)
          }}
          bodyStyle={ReactDOM.Style.make(~padding="0px", ())}
          cover={<img
            style={ReactDOM.Style.make(~width="50px", ~height="50px", ())} src={protocolIconBase64}
          />}>
          <Card.Meta
            style={ReactDOM.Style.make(~width="100px", ())}
            title={React.string(NewNameUtils.getName(newName, data))}
          />
        </Card>
      </List.Item>
    }}
  />
}
