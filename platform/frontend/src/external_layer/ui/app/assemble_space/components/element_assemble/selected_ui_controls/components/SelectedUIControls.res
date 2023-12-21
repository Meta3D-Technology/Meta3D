open Antd
%%raw("import 'antd/dist/reset.css'")
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

  let _findLabel = (
    id,
    selectedUIControlInspectorData: ElementAssembleStoreType.selectedUIControlInspectorData,
  ): option<string> => {
    (
      HierachyUtils.findSelectedUIControlData(
        None,
        (
          (data: ElementAssembleStoreType.uiControlInspectorData) => data.id,
          (data: ElementAssembleStoreType.uiControlInspectorData) => data.children,
        ),
        selectedUIControlInspectorData,
        id,
      )
      ->Meta3dCommonlib.OptionSt.getExn
    ).specific
    ->Meta3dCommonlib.ArraySt.find(({name}) => name == "label")
    ->Meta3dCommonlib.OptionSt.map(({value}) =>
      SpecificUtils.getSpecificDataValue(value)->Obj.magic
    )
  }

  let rec convertToTreeData = (
    service: service,
    selectedUIControls,
    selectedUIControlInspectorData: ElementAssembleStoreType.selectedUIControlInspectorData,
  ) => {
    selectedUIControls
    ->Meta3dCommonlib.ListSt.map((
      {id, protocolIconBase64, displayName, children}: ElementAssembleStoreType.uiControl,
    ): Tree.treeData => {
      {
        title: <Space direction=#horizontal wrap=true>
          {service.ui.buildText(.
            ~_type=#default,
            ~children={
              React.string(
                _findLabel(
                  id,
                  selectedUIControlInspectorData,
                )->Meta3dCommonlib.OptionSt.getWithDefault(displayName),
              )
            },
            (),
          )}
        </Space>,
        key: id,
        icon: <Image preview=false src={protocolIconBase64} width=20 height=20 />,
        children: convertToTreeData(service, children, selectedUIControlInspectorData),
      }
    })
    ->Meta3dCommonlib.ListSt.toArray
  }

  let addRootTreeNode = allTreeData => {
    [
      (
        {
          title: {
            React.string({j`root`})
          },
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
    // Meta3dCommonlib.Contract.requireCheck(() => {
    //   open Meta3dCommonlib.Contract
    //   open Operators
    //   test(Meta3dCommonlib.Log.buildAssertMessage(~expect=j`only has one`, ~actual=j`not`), () => {
    //     selectedKeys->Meta3dCommonlib.ArraySt.length == 1
    //   })
    // }, isDebug)

    selectedKeys->Meta3dCommonlib.ArraySt.length == 0
      ? ()
      : {
          dispatch(
            ElementAssembleStoreType.UnSelectUIControlAndChildren(
              selectedKeys->Meta3dCommonlib.ArraySt.getExn(0),
            ),
          )

          dispatch(ElementAssembleStoreType.SelectRootUIControl)
        }
  }

  // let getUIControls = SelectedContributesForElementUtils.getUIControls

  // let _convertSpecificType = (
  //   specific: Meta3dType.UIControlProtocolConfigType.uiControlSpecificDataFields,
  // ): ElementAssembleStoreType.specific => {
  //   specific->Meta3dCommonlib.ArraySt.map(({
  //     value,
  //     name,
  //     type_,
  //   }): ElementAssembleStoreType.specificData => {
  //     {
  //       name,
  //       type_,
  //       value: value->CommonType.SpecicFieldDataValue,
  //     }
  //   })
  // }

  // let _getScenViewUIControlProtocolName = () => "meta3d-ui-control-scene-view-protocol"

  // let _checkShouldOnlyHasOneSceneViewUIControlAtMost = (
  //   protocolName,
  //   selectedUIControls: ElementAssembleStoreType.selectedUIControls,
  // ) => {
  //   protocolName === _getScenViewUIControlProtocolName()
  //     ? {
  //         selectedUIControls
  //         ->Meta3dCommonlib.ListSt.filter(uiControl => {
  //           uiControl.data.contributePackageData.protocol.name === protocolName
  //         })
  //         ->Meta3dCommonlib.ListSt.length !== 0
  //           ? Some({j`只能有1个Scene View UI Control`})
  //           : None
  //       }
  //     : None
  // }

  // let selectUIControl = (
  //   service,
  //   dispatch,
  //   selectedUIControls,
  //   selectedContributes,
  //   protocolIconBase64,
  //   protocolConfigStr,
  //   displayName,
  //   data: Meta3d.ExtensionFileType.contributeFileData,
  //   parentUIControlId,
  // ) => {
  //   let protocolConfigStr = protocolConfigStr->Meta3dCommonlib.OptionSt.getExn

  //   switch _checkShouldOnlyHasOneSceneViewUIControlAtMost(
  //     data.contributePackageData.protocol.name,
  //     selectedUIControls,
  //   ) {
  //   | Some(errorMessage) => service.console.error(. errorMessage, None)
  //   | None =>
  //     dispatch(
  //       ElementAssembleStoreType.SelectUIControl(
  //         protocolIconBase64,
  //         protocolConfigStr,
  //         displayName,
  //         data,
  //         parentUIControlId,
  //         service.meta3d.getUIControlSpecificDataFields(.
  //           service.meta3d.serializeUIControlProtocolConfigLib(. protocolConfigStr),
  //         )->_convertSpecificType,
  //       ),
  //     )
  //   }
  // }

  let useSelector = ({apAssembleState, elementAssembleState}: AssembleSpaceStoreType.state) => {
    let {apInspectorData} = apAssembleState
    let {
      selectedUIControls,
      selectedUIControlInspectorData,
      parentUIControlId,
    } = elementAssembleState

    (apInspectorData.isDebug, selectedUIControls, selectedUIControlInspectorData)
  }
}

@react.component
let make = (
  ~service: service,
  ~handleWhenShowUIControlsFunc,
  ~handleWhenSelectUIControlFunc,
  ~handleWhenSelectTreeNodeFunc,
  ~selectedContributes,
  ~addUIControlButtonTarget: React.ref<Js.Nullable.t<'a>>,
  ~selectSceneViewUIControlTarget: React.ref<Js.Nullable.t<'a>>,
  ~rootTarget: React.ref<Js.Nullable.t<'a>>,
  ~selectGameViewUIControlTarget: React.ref<Js.Nullable.t<'a>>,
) => {
  let dispatch = ReduxUtils.ElementAssemble.useDispatch(service.react.useDispatch)

  let (expandedKeys, setExpandedKeys) = service.react.useState(_ => [Method.getRootKey()])
  let (selectedKeys, setSelectedKeys) = service.react.useState(_ => [])
  let (autoExpandParent, setAutoExpandParent) = service.react.useState(_ => true)
  let (isShowUIControls, setIsShowUIControls) = service.react.useState(_ => false)

  let (isDebug, selectedUIControls, selectedUIControlInspectorData) = service.react.useSelector(.
    Method.useSelector,
  )

  <>
    <Space direction=#vertical size=#middle>
      <Space direction=#horizontal wrap=true>
        <Button
          ref={addUIControlButtonTarget}
          icon={<Icon.FileAddOutlined />}
          onClick={_ => {
            setIsShowUIControls(_ => true)
          }}
        />
        <Button
          icon={<Icon.DeleteOutlined />}
          onClick={_ => {
            Method.unselectUIControl(dispatch, isDebug, selectedKeys)
          }}
        />
      </Space>
      <section ref={rootTarget->Obj.magic}>
        <Tree
          showIcon=true
          treeData={selectedUIControls
          ->Method.convertToTreeData(service, _, selectedUIControlInspectorData)
          ->Method.addRootTreeNode}
          expandedKeys
          onExpand={expandedKeysValue =>
            Method.onExpand((setExpandedKeys, setAutoExpandParent), expandedKeysValue)}
          selectedKeys
          onSelect={(selectedKeysValue, info: Tree.info) => {
            Method.onSelect(service, (dispatch, setSelectedKeys), selectedKeysValue, info)

            handleWhenSelectTreeNodeFunc(info.node.title)
          }}
        />
      </section>
    </Space>
    <Modal
      title={`UI Controls`}
      visible={isShowUIControls}
      onOk={() => {
        setIsShowUIControls(_ => false)
      }}
      onCancel={() => {
        setIsShowUIControls(_ => false)
      }}
      footer={React.null}>
      // <List
      //   grid={{gutter: 16, column: 2}}
      //   dataSource={selectedContributes->Method.getUIControls->Meta3dCommonlib.ListSt.toArray}
      //   renderItem={({id, protocolIconBase64, protocolConfigStr, data}) => {
      //     let displayName = data.contributePackageData.displayName

      //     <List.Item>
      //       <Card
      //         key={id}
      //         onClick={_ => {
      //           ErrorUtils.showCatchedErrorMessage(() => {
      //             Method.selectUIControl(
      //               service,
      //               dispatch,
      //               selectedUIControls,
      //               selectedContributes,
      //               protocolIconBase64,
      //               protocolConfigStr,
      //               displayName,
      //               data,
      //               parentUIControlId,
      //             )

      //             setIsShowUIControls(_ => false)
      //           }, 5->Some)
      //         }}
      //         bodyStyle={ReactDOM.Style.make(~padding="0px", ())}
      //         cover={<Image preview=false src={protocolIconBase64} width=50 height=50 />}>
      //         <Card.Meta
      //           title={<span
      //             style={ReactDOM.Style.make(
      //               ~whiteSpace="normal",
      //               ~wordWrap="break-word",
      //               ~wordBreak="break-all",
      //               (),
      //             )}>
      //             {React.string(displayName)}
      //           </span>}
      //         />
      //       </Card>
      //     </List.Item>
      //   }}
      // />
      <UIControls
        service
        handleWhenShowUIControlsFunc
        handleWhenSelectUIControlFunc
        setIsShowUIControls
        selectedContributes
        selectSceneViewUIControlTarget
        selectGameViewUIControlTarget
      />
    </Modal>
  </>

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
