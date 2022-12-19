open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let selectPackage = (dispatch, package) => {
    dispatch(FrontendUtils.PackageAssembleStoreType.SelectPackage(package))
  }
}

@react.component
let make = (~service: service, ~selectedPackagesFromShop: selectedPackagesFromShop) => {
  let dispatch = ReduxUtils.PackageAssemble.useDispatch(service.react.useDispatch)

  <List
    grid={{gutter: 16, column: 3}}
    dataSource={selectedPackagesFromShop->Meta3dCommonlib.ListSt.toArray}
    renderItem={({protocol, name} as package) => {
      <List.Item>
        <Card
          key={name}
          onClick={_ => {
            Method.selectPackage(dispatch, package)
          }}
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
