open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let getUIControls = SelectedContributesUtils.getUIControls

  let selectUIControl = (dispatch, protocolIconBase64, protocolConfigStr, name, data) => {
    dispatch(
      FrontendUtils.ElementAssembleStoreType.SelectUIControl(
        protocolIconBase64,
        protocolConfigStr->Meta3dCommonlib.OptionSt.getExn,
        name,
        data,
      ),
    )
  }

  let useSelector = ({selectedContributes}: FrontendUtils.ApAssembleStoreType.state) => {
    selectedContributes
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = ReduxUtils.ElementAssemble.useDispatch(service.react.useDispatch)

  let selectedContributes = ReduxUtils.ApAssemble.useSelector(
    service.react.useSelector,
    Method.useSelector,
  )

  // TODO duplicate with ap view
  <List
  // grid={{gutter: 16, column: 3}}
    dataSource={selectedContributes->Method.getUIControls->Meta3dCommonlib.ListSt.toArray}
    renderItem={({id, newName, protocolIconBase64, protocolConfigStr, data}) => {
      let name = NewNameUtils.getName(newName, data.contributePackageData.name)

      <List.Item>
        <Card
          key={id}
          onClick={_ => {
            Method.selectUIControl(dispatch, protocolIconBase64, protocolConfigStr, name, data)
          }}
          bodyStyle={ReactDOM.Style.make(~padding="0px", ())}
          cover={<img
            style={ReactDOM.Style.make(~width="50px", ~height="50px", ())} src={protocolIconBase64}
          />}>
          <Card.Meta style={ReactDOM.Style.make(~width="100px", ())} title={React.string(name)} />
        </Card>
      </List.Item>
    }}
  />
}
