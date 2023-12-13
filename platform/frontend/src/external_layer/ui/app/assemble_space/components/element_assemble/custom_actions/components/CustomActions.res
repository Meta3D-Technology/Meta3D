open Antd
%%raw("import 'antd/dist/antd.css'")
open AssembleSpaceType

module Method = {
  let _buildDefaultActionFileStr = actionName => {
    j`window.Contribute = {
  getContribute: (api) => {
    return {
      actionName: "${actionName}",
      init: (meta3dState) => {
        let eventSourcingService = api.getPackageService(meta3dState, "meta3d-editor-whole-protocol").event(meta3dState).eventSourcing(meta3dState)

        return new Promise((resolve, reject) => {
          resolve(eventSourcingService.on(meta3dState, "", 0, (meta3dState) => {
            return Promise.resolve(meta3dState)
          }, (meta3dState) => {
            return Promise.resolve(meta3dState)
          }))
        })
      },
      handler: (meta3dState, uiData) => {
        return new Promise((resolve, reject) => {
          let eventSourcingService = api.getPackageService(meta3dState, "meta3d-editor-whole-protocol").event(meta3dState).eventSourcing(meta3dState)

          resolve(eventSourcingService.addEvent(meta3dState, {
            name: "",
            inputData: []
          }))
        })
      },
      createState: () => {
        return null
      }
    }
  }
}`
  }

  let _generateActionName = customActionNames => {
    let rec _func = index => {
      let result = {j`Action${index->IntUtils.intToString}`}

      customActionNames->Meta3dCommonlib.ListSt.includes(result) ? _func(index->succ) : result
    }

    _func(1)
  }

  let addCustomAction = (dispatch, customActions) => {
    let actionName =
      customActions
      ->Meta3dCommonlib.ListSt.map(({name}: ElementAssembleStoreType.customAction) => {
        name
      })
      ->_generateActionName

    dispatch(
      ElementAssembleStoreType.AddCustomAction(
        (
          {
            name: actionName,
            fileStr: _buildDefaultActionFileStr(actionName),
          }: ElementAssembleStoreType.customAction
        ),
      ),
    )
  }

  let convertToTreeData = customActions => {
    customActions
    ->Meta3dCommonlib.ListSt.map((
      {name, fileStr}: ElementAssembleStoreType.customAction,
    ): Tree.treeData => {
      {
        title: name,
        key: name,
        icon: React.null,
        children: [],
      }
    })
    ->Meta3dCommonlib.ListSt.toArray
  }

  let onSelect = ((dispatch, setSelectedKeys), selectedKeysValue, info: Tree.info) => {
    CodeEditUtils.setCurrentCustomActionNameToGlobal(info.node.key)

    setSelectedKeys(_ => selectedKeysValue)

    dispatch(ElementAssembleStoreType.SelectCustomAction(info.node.key))
  }

  let useSelector = ({elementAssembleState}: AssembleSpaceStoreType.state) => {
    let {customActions} = elementAssembleState

    customActions
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = ReduxUtils.ElementAssemble.useDispatch(service.react.useDispatch)

  let (selectedKeys, setSelectedKeys) = service.react.useState(_ => [])

  let customActions = service.react.useSelector(. Method.useSelector)

  // TODO check: no duplicate name

  <Space direction=#vertical size=#middle>
    <Space direction=#horizontal wrap=true>
      <Button
        icon={<Icon.FileAddOutlined />}
        onClick={_ => {
          Method.addCustomAction(dispatch, customActions)
        }}
      />
    </Space>
    <Tree
      showIcon=false
      autoExpandParent=false
      treeData={customActions->Method.convertToTreeData}
      // expandedKeys
      // onExpand={expandedKeysValue =>
      //   Method.onExpand((setExpandedKeys, setAutoExpandParent), expandedKeysValue)}
      selectedKeys
      onSelect={(selectedKeysValue, info) =>
        Method.onSelect((dispatch, setSelectedKeys), selectedKeysValue, info)}
    />
  </Space>
}
