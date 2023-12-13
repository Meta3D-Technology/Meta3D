open Antd
%%raw("import 'antd/dist/antd.css'")
open AssembleSpaceType

module Method = {
  let _generateName = (customNames, prefix) => {
    let rec _func = index => {
      let result = {j`${prefix}${index->IntUtils.intToString}`}

      customNames->Meta3dCommonlib.ListSt.includes(result) ? _func(index->succ) : result
    }

    _func(1)
  }

  let addCustom = (dispatch, buildAddActionFunc, buildDefaultFileStrFunc, prefix, customs) => {
    let name =
      customs
      ->Meta3dCommonlib.ListSt.map((custom: CommonType.custom) => {
        custom.name
      })
      ->_generateName(prefix)

    dispatch(
      buildAddActionFunc(
        (
          {
            name,
            fileStr: buildDefaultFileStrFunc(name),
          }: CommonType.custom
        ),
      ),
    )
  }

  let removeCustom = (dispatch, buildRemoveActionFunc, currentCustomName) => {
    switch currentCustomName {
    | Some(currentCustomName) => dispatch(buildRemoveActionFunc(currentCustomName))
    | None => ()
    }
  }

  let convertToTreeData = customs => {
    customs
    ->Meta3dCommonlib.ListSt.map(({name, fileStr}: CommonType.custom): Tree.treeData => {
      {
        title: name,
        key: name,
        icon: React.null,
        children: [],
      }
    })
    ->Meta3dCommonlib.ListSt.toArray
  }

  let onSelect = (
    (dispatch, setSelectedKeys),
    buildSelectActionFunc,
    setCurrentCustomNameToGlobalFunc,
    selectedKeysValue,
    info: Tree.info,
  ) => {
    setCurrentCustomNameToGlobalFunc(info.node.key)

    setSelectedKeys(_ => selectedKeysValue)

    dispatch(buildSelectActionFunc(info.node.key))
  }
}

@react.component
let make = (
  ~service: service,
  ~buildSelectActionFunc,
  ~buildAddActionFunc,
  ~buildRemoveActionFunc,
  ~buildDefaultFileStrFunc,
  ~setCurrentCustomNameToGlobalFunc,
  ~currentCustomName,
  ~customs,
  ~prefix,
) => {
  let dispatch = ReduxUtils.ElementAssemble.useDispatch(service.react.useDispatch)

  let (selectedKeys, setSelectedKeys) = service.react.useState(_ => [])

  // TODO check: no duplicate name

  <Space direction=#vertical size=#middle>
    <Space direction=#horizontal wrap=true>
      <Button
        icon={<Icon.FileAddOutlined />}
        onClick={_ => {
          Method.addCustom(dispatch, buildAddActionFunc, buildDefaultFileStrFunc, prefix, customs)
        }}
      />
      <Button
        icon={<Icon.DeleteOutlined />}
        onClick={_ => {
          Method.removeCustom(dispatch, buildRemoveActionFunc, currentCustomName)
        }}
      />
    </Space>
    <Tree
      showIcon=false
      autoExpandParent=false
      treeData={customs->Method.convertToTreeData}
      selectedKeys
      onSelect={(selectedKeysValue, info) =>
        Method.onSelect(
          (dispatch, setSelectedKeys),
          buildSelectActionFunc,
          setCurrentCustomNameToGlobalFunc,
          selectedKeysValue,
          info,
        )}
    />
  </Space>
}
