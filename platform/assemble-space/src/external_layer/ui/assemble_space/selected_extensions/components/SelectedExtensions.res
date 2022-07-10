open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  // let getName = (newName, data: Meta3d.ExtensionFileType.extensionFileData) => {
  //   newName->Meta3dCommonlib.OptionSt.getWithDefault(data.extensionPackageData.name)
  // }

}

@react.component
let make = (~service: service) => {
  let dispatch = service.react.useDispatch()
  let selectedExtensions = service.react.useSelector((
    {selectedExtensions}: FrontendUtils.AssembleSpaceStoreType.state,
  ) => selectedExtensions)

  <List
    grid={{gutter: 16, column: 1}}
    dataSource={selectedExtensions->Meta3dCommonlib.ListSt.toArray}
    renderItem={({id, protocolIconBase64, newName, data} as extension) => {
      <List.Item>
        <Card
          key={id}
          onClick={_ => {
            dispatch(FrontendUtils.AssembleSpaceStoreType.SetInspectorCurrentExtensionId(id))
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
