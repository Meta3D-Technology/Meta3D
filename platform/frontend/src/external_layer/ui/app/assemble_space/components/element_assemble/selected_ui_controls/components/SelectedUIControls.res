open Antd
%%raw("import 'antd/dist/antd.css'")
open AssembleSpaceType

module Method = {
  let getRootKey = () => "root"

  let _selectUIControl = (service, dispatch, id) => {
    id === getRootKey()
      ? {
          dispatch(ElementAssembleStoreType.SelectRootUIControl)
        }
      : dispatch(
          ElementAssembleStoreType.SelectSelectedUIControl(
            (service.meta3d.hasChildren, service.meta3d.serializeUIControlProtocolConfigLib),
            id,
          ),
        )
  }

  let rec convertToTreeData = selectedUIControls => {
    selectedUIControls
    ->Meta3dCommonlib.ListSt.map((
      {
        id,
        protocolIconBase64,
        displayName,
        children,
      }: ElementAssembleStoreType.uiControl,
    ): Tree.treeData => {
      {
        title: displayName,
        key: id,
        icon: <Image
          preview=false src={protocolIconBase64} width=20 height=20
        />,
        children: convertToTreeData(children),
      }
    })
    ->Meta3dCommonlib.ListSt.toArray
  }

  let addRootTreeNode = allTreeData => {
    [
      (
        {
          title: "root",
          key: getRootKey(),
          children: allTreeData,
          icon: React.null,
        }: Tree.treeData
      ),
    ]
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

  let unselectUIControl = (dispatch, isDebug, selectedKeys) => {
    Meta3dCommonlib.Contract.requireCheck(() => {
      open Meta3dCommonlib.Contract
      open Operators
      test(Meta3dCommonlib.Log.buildAssertMessage(~expect=j`only has one`, ~actual=j`not`), () => {
        selectedKeys->Meta3dCommonlib.ArraySt.length == 1
      })
    }, isDebug)

    dispatch(
      ElementAssembleStoreType.UnSelectUIControlAndChildren(
        selectedKeys->Meta3dCommonlib.ArraySt.getExn(0),
      ),
    )
  }

  let useSelector = (
    {apAssembleState, elementAssembleState}: AssembleSpaceStoreType.state,
  ) => {
    let {apInspectorData} = apAssembleState
    let {selectedUIControls} = elementAssembleState

    (apInspectorData.isDebug, selectedUIControls)
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = ReduxUtils.ElementAssemble.useDispatch(service.react.useDispatch)

  let (expandedKeys, setExpandedKeys) = service.react.useState(_ => [Method.getRootKey()])
  let (selectedKeys, setSelectedKeys) = service.react.useState(_ => [])
  let (autoExpandParent, setAutoExpandParent) = service.react.useState(_ => true)

  let (isDebug, selectedUIControls) = service.react.useSelector(. Method.useSelector)

  <Space direction=#vertical size=#middle>
    <Space direction=#horizontal wrap=true>
      <Button
        icon={<Icon.DeleteOutlined />}
        onClick={_ => {
          Method.unselectUIControl(dispatch, isDebug, selectedKeys)
        }}
      />
    </Space>
    <Tree
      showIcon=true
      treeData={selectedUIControls->Method.convertToTreeData->Method.addRootTreeNode}
      expandedKeys
      onExpand={expandedKeysValue =>
        Method.onExpand((setExpandedKeys, setAutoExpandParent), expandedKeysValue)}
      selectedKeys
      onSelect={(selectedKeysValue, info) =>
        Method.onSelect(service, (dispatch, setSelectedKeys), selectedKeysValue, info)}
    />
  </Space>

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
