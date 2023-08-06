open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

@react.component
let make = (~service: service, ~useDispatch, ~useSelectorResult, ~selectPackage=(_, _) => ()) => {
  let dispatch = useDispatch(service.react.useDispatch)

  let selectedPackages = useSelectorResult

  <List
    grid={{gutter: 16, column: 1}}
    dataSource={selectedPackages->Meta3dCommonlib.ListSt.toArray}
    renderItem={((id, protocolIconBase64, name)) => {
      <List.Item>
        <Card
          key={id}
          onClick={_ => {
            selectPackage(dispatch, id)
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
              {React.string(name)}
            </span>}
          />
        </Card>
      </List.Item>
    }}
  />
}
