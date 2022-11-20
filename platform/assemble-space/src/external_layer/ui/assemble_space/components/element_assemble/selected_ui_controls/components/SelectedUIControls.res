open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let _selectUIControl = (service, dispatch, id) => {
    dispatch(
      FrontendUtils.ElementAssembleStoreType.SelectSelectedUIControl(
        (service.meta3d.hasChildren, service.meta3d.serializeUIControlProtocolConfigLib),
        id,
      ),
    )
  }

  let rec convertToTreeData = selectedUIControls => {
    selectedUIControls
    ->Meta3dCommonlib.ListSt.map((
      {id, protocolIconBase64, name, children}: FrontendUtils.ElementAssembleStoreType.uiControl,
    ): Tree.treeData => {
      {
        title: name,
        key: id,
        icon: <img
        style={ReactDOM.Style.make(~width="20px", ~height="20px", ())} src={protocolIconBase64}
          // src={protocolIconBase64}
        />,
        children: convertToTreeData(children),
      }
    })
    ->Meta3dCommonlib.ListSt.toArray
  }

  let onExpand = ((setExpandedKeys, setAutoExpandParent), expandedKeysValue) => {
    setExpandedKeys(_ => expandedKeysValue)
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setAutoExpandParent(_ => false)
  }

  let onSelect = (service, (dispatch, setSelectedKeys), selectedKeysValue, info: Tree.info) => {
    setSelectedKeys(_ => selectedKeysValue)

    _selectUIControl(service, dispatch, info.node.key)
  }

  let useSelector = ({selectedUIControls}: FrontendUtils.ElementAssembleStoreType.state) => {
    selectedUIControls
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = ReduxUtils.ElementAssemble.useDispatch(service.react.useDispatch)

  let (expandedKeys, setExpandedKeys) = service.react.useState(_ => [])
  let (selectedKeys, setSelectedKeys) = service.react.useState(_ => [])
  let (autoExpandParent, setAutoExpandParent) = service.react.useState(_ => true)

  let selectedUIControls = ReduxUtils.ElementAssemble.useSelector(
    service.react.useSelector,
    Method.useSelector,
  )

  <Tree
    showIcon=true
    treeData={selectedUIControls->Method.convertToTreeData}
    expandedKeys
    onExpand={expandedKeysValue =>
      Method.onExpand((setExpandedKeys, setAutoExpandParent), expandedKeysValue)}
    selectedKeys
    onSelect={(selectedKeysValue, info) =>
      Method.onSelect(service, (dispatch, setSelectedKeys), selectedKeysValue, info)}
  />

  // <List
  //   grid={{gutter: 16, column: 1}}
  //   dataSource={selectedUIControls->Meta3dCommonlib.ListSt.toArray->Meta3dCommonlib.Log.printForDebug}
  //   renderItem={({id, protocolIconBase64, name, data} as contribute) => {
  //     Js.log("a")
  //     <List.Item>
  //       <Card
  //         key={id}
  //         onClick={_ => {
  //           Method.selectUIControl(service, dispatch, id)
  //         }}
  //         bodyStyle={ReactDOM.Style.make(~padding="0px", ())}
  //         cover={<img
  //           style={ReactDOM.Style.make(~width="50px", ~height="50px", ())} src={protocolIconBase64}
  //         />}>
  //         <Card.Meta style={ReactDOM.Style.make(~width="100px", ())} title={React.string(name)} />
  //       </Card>
  //     </List.Item>
  //   }}
  // />
}
