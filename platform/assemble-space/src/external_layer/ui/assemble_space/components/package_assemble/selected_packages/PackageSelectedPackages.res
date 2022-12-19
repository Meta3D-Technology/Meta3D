open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let useSelector = ({selectedPackages}: FrontendUtils.PackageAssembleStoreType.state) => {
    selectedPackages
  }
}

@react.component
let make = (~service: service) => {
  let selectedPackages = ReduxUtils.PackageAssemble.useSelector(
    service.react.useSelector,
    Method.useSelector,
  )

  <List
    grid={{gutter: 16, column: 1}}
    dataSource={selectedPackages->Meta3dCommonlib.ListSt.toArray}
    renderItem={({id, protocol, name}) => {
      <List.Item>
        <Card
          key={id}
          bodyStyle={ReactDOM.Style.make(~padding="0px", ())}
          cover={<img
            style={ReactDOM.Style.make(~width="50px", ~height="50px", ())} src={protocol.iconBase64}
          />}>
          <Card.Meta style={ReactDOM.Style.make(~width="100px", ())} title={React.string(name)} />
        </Card>
      </List.Item>
    }}
  />
}
