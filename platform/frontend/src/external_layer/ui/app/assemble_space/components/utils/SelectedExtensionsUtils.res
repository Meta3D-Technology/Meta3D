open Antd
%%raw("import 'antd/dist/reset.css'")
open AssembleSpaceType

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
          cover={<Image preview=false src={protocolIconBase64} width=50 height=50 />}>
          <Card.Meta
            title={<span
              style={ReactDOM.Style.make(
                ~whiteSpace="normal",
                ~wordWrap="break-word",
                ~wordBreak="break-all",
                (),
              )}>
              {React.string(data.extensionPackageData.displayName)}
            </span>}
          />
        </Card>
      </List.Item>
    }}
  />
}
