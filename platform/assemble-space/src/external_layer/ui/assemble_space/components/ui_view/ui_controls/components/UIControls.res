open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let getUIControls = (selectedContributes: FrontendUtils.ApViewStoreType.selectedContributes) => {
    selectedContributes->Meta3dCommonlib.ListSt.filter(({data}) => {
      data.contributePackageData.protocol.name->ContributeTypeUtils.decideContributeType ==
        Meta3dType.ContributeType.UIControl
    })
  }

  let selectUIControl = (dispatch, protocolIconBase64, protocolConfigStr, name, data) => {
    dispatch(
      FrontendUtils.UIViewStoreType.SelectUIControl(
        protocolIconBase64,
        protocolConfigStr->Meta3dCommonlib.OptionSt.getExn,
        name,
        data,
      ),
    )
  }

  let useSelector = ({selectedContributes}: FrontendUtils.ApViewStoreType.state) => {
    selectedContributes
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = ReduxUtils.UIView.useDispatch(service.react.useDispatch)

  let selectedContributes = ReduxUtils.ApView.useSelector(
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
