open Antd
%%raw("import 'antd/dist/reset.css'")
open AssembleSpaceType

module Method = {
  let getDifferenceSet = (selectedContributesFromMarket, selectedContributeNames) => {
    selectedContributesFromMarket->Meta3dCommonlib.ArraySt.filter(((
      contribute: AssembleSpaceCommonType.contribute,
      _,
    )) => {
      !(
        selectedContributeNames->Meta3dCommonlib.ListSt.includes(
          contribute.data.contributePackageData.name,
        )
      )
    })
  }
}

@react.component
let make = (
  ~service: service,
  ~selectedContributesFromMarket: selectedContributesFromMarket,
  ~selectedContributeNames,
  ~useDispatch,
  ~selectContribute,
) => {
  let dispatch = useDispatch(service.react.useDispatch)

  <List
    grid={{gutter: 16, column: 2}}
    dataSource={selectedContributesFromMarket
    ->Meta3dCommonlib.ListSt.toArray
    ->Method.getDifferenceSet(selectedContributeNames)}
    renderItem={((contribute, protocolConfigOpt)) => {
      <List.Item>
        <Card
          key={contribute.data.contributePackageData.displayName}
          onClick={_ => {
            selectContribute(
              dispatch,
              contribute.protocolIconBase64,
              protocolConfigOpt->ExtensionsContributesUtils.getProtocolConfigStr,
              contribute,
            )
          }}
          bodyStyle={ReactDOM.Style.make(~padding="0px", ())}
          cover={<Image preview=false src={contribute.protocolIconBase64} width=50 height=50 />}>
          <Card.Meta
            title={<span
              style={ReactDOM.Style.make(
                ~whiteSpace="normal",
                ~wordWrap="break-word",
                ~wordBreak="break-all",
                (),
              )}>
              {React.string(contribute.data.contributePackageData.displayName)}
            </span>}
          />
        </Card>
      </List.Item>
    }}
  />
}
