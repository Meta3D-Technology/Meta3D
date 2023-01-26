open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

@react.component
let make = (~service: service, ~useDispatch, ~useSelectorResult, ~selectContribute) => {
  let dispatch = useDispatch(service.react.useDispatch)

  let selectedContributes = useSelectorResult

  <List
    grid={{gutter: 16, column: 1}}
    dataSource={selectedContributes->Meta3dCommonlib.ListSt.toArray}
    renderItem={((id, protocolIconBase64, data: Meta3d.ExtensionFileType.contributeFileData)) => {
      <List.Item>
        <Card
          key={id}
          onClick={_ => {
            selectContribute(dispatch, id)
          }}
          bodyStyle={ReactDOM.Style.make(~padding="0px", ())}
          cover={<img
            style={ReactDOM.Style.make(~width="50px", ~height="50px", ())} src={protocolIconBase64}
          />}>
          <Card.Meta
            title={<span
              style={ReactDOM.Style.make(
                ~whiteSpace="normal",
                ~wordWrap="break-word",
                ~wordBreak="break-all",
                (),
              )}>
              {React.string(data.contributePackageData.name)}
            </span>}
          />
        </Card>
      </List.Item>
    }}
  />
}
