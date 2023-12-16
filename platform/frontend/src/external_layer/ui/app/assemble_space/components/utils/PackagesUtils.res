open Antd
%%raw("import 'antd/dist/reset.css'")
open AssembleSpaceType

module Method = {
  let getDifferenceSet = (
    packages: array<AssembleSpaceCommonType.packageData>,
    selectedPackageNames,
  ) => {
    packages->Meta3dCommonlib.ArraySt.filter(({name}) => {
      !(selectedPackageNames->Meta3dCommonlib.ListSt.includes(name))
    })
  }
}

@react.component
let make = (
  ~service: service,
  ~selectedPackagesFromMarket: selectedPackagesFromMarket,
  ~selectedPackageNames,
  ~useDispatch,
  ~selectPackage,
) => {
  let dispatch = useDispatch(service.react.useDispatch)

  <List
    grid={{gutter: 16, column: 2}}
    dataSource={selectedPackagesFromMarket
    ->Meta3dCommonlib.ListSt.toArray
    ->Method.getDifferenceSet(selectedPackageNames)}
    renderItem={({protocol, name} as package) => {
      <List.Item>
        <Card
          key={name}
          onClick={_ => {
            selectPackage(dispatch, package)
          }}
          bodyStyle={ReactDOM.Style.make(~padding="0px", ())}
          cover={<Image preview=false src={protocol.iconBase64} width=50 height=50 />}>
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
