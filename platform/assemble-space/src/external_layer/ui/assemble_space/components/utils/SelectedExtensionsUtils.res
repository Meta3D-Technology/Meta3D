open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

@react.component
let make = (~service: service, ~useDispatch, ~useSelectorResult, ~selectExtension) => {
  let dispatch = useDispatch(service.react.useDispatch)

  let selectedExtensions = useSelectorResult

  <List
    grid={{gutter: 16, column: 1}}
    dataSource={selectedExtensions->Meta3dCommonlib.ListSt.toArray}
    renderItem={((id, protocolIconBase64, data: Meta3d.ExtensionFileType.extensionFileData)) => {
      <List.Item>
        <Card
          key={id}
          onClick={_ => {
            selectExtension(dispatch, id)
          }}
          bodyStyle={ReactDOM.Style.make(~padding="0px", ())}
          cover={<img
            style={ReactDOM.Style.make(~width="50px", ~height="50px", ())} src={protocolIconBase64}
          />}>
          <Card.Meta
            style={ReactDOM.Style.make(~width="100px", ())}
            title={React.string(data.extensionPackageData.name)}
          />
        </Card>
      </List.Item>
    }}
  />
}
