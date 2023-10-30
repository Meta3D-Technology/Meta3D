open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let getDifferenceSet = (selectedExtensionsFromMarket, selectedExtensionNames) => {
    selectedExtensionsFromMarket->Meta3dCommonlib.ArraySt.filter(((
      extension: FrontendUtils.AssembleSpaceCommonType.extension,
      _,
    )) => {
      !(
        selectedExtensionNames->Meta3dCommonlib.ListSt.includes(
          extension.data.extensionPackageData.name,
        )
      )
    })
  }
}

@react.component
let make = (
  ~service: service,
  ~selectedExtensionsFromMarket: selectedExtensionsFromMarket,
  ~selectedExtensionNames,
  ~useDispatch,
  ~selectExtension,
) => {
  let dispatch = useDispatch(service.react.useDispatch)

  <List
    grid={{gutter: 16, column: 3}}
    dataSource={selectedExtensionsFromMarket
    ->Meta3dCommonlib.ListSt.toArray
    ->Method.getDifferenceSet(selectedExtensionNames)}
    renderItem={((extension, protocolConfigOpt)) => {
      <List.Item>
        <Card
          key={extension.data.extensionPackageData.displayName}
          onClick={_ => {
            selectExtension(
              dispatch,
              extension.protocolIconBase64,
              extension.protocolDisplayName,
              extension.protocolRepoLink,
              extension.protocolDescription,
              protocolConfigOpt->ExtensionsContributesUtils.getProtocolConfigStr,
              extension,
            )
          }}
          bodyStyle={ReactDOM.Style.make(~padding="0px", ())}
          cover={<Image preview=false src={extension.protocolIconBase64} width=50 height=50 />}>
          <Card.Meta
            title={<span
              style={ReactDOM.Style.make(
                ~whiteSpace="normal",
                ~wordWrap="break-word",
                ~wordBreak="break-all",
                (),
              )}>
              {React.string(extension.data.extensionPackageData.displayName)}
            </span>}
          />
        </Card>
      </List.Item>
    }}
  />
}
