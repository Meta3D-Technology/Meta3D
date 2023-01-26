open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

@react.component
let make = (~service: service, ~useSelectorResult) => {
  let selectedPackages = useSelectorResult

  <List
    grid={{gutter: 16, column: 1}}
    dataSource={selectedPackages->Meta3dCommonlib.ListSt.toArray}
    renderItem={((id, protocolIconBase64, name)) => {
      <List.Item>
        <Card
          key={id}
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
              {React.string(name)}
            </span>}
          />
        </Card>
      </List.Item>
    }}
  />
}
