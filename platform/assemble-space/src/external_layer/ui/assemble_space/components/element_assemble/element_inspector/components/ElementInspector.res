open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  // let _getActions = SelectedContributesForElementUtils.getActions

  // let getProtocolConfigActions = (
  //   service,
  //   selectedContributes: FrontendUtils.ApAssembleStoreType.selectedContributes,
  // ) => {
  //   selectedContributes
  //   ->_getActions
  //   ->Meta3dCommonlib.ListSt.map(({protocolConfigStr}) => {
  //     protocolConfigStr
  //     ->Meta3dCommonlib.OptionSt.getExn
  //     ->service.meta3d.serializeActionProtocolConfigLib(. _)
  //     ->service.meta3d.getActions(. _)
  //   })
  // }

  // let getUniqueRoles = (
  //   protocolConfigActions: list<Meta3dType.ActionProtocolConfigType.actions>,
  // ) => {
  //   protocolConfigActions
  //   ->Meta3dCommonlib.ListSt.reduce([], (roles, actions) => {
  //     Js.Array.concat(actions->Meta3dCommonlib.ArraySt.map(({role}) => role), roles)
  //   })
  //   ->Meta3dCommonlib.ArraySt.removeDuplicateItemsWithBuildKeyFunc((. item) => item)
  // }

  // let setRole = (dispatch, role: string) => {
  //   dispatch(
  //     FrontendUtils.ElementAssembleStoreType.SetRole(
  //       FrontendUtils.SelectUtils.isEmptySelectOptionValue(role) ? None : Some(role),
  //     ),
  //   )
  // }

  // let getUniqueActionNamesByRole = (
  //   protocolConfigActions: list<Meta3dType.ActionProtocolConfigType.actions>,
  //   role,
  // ) => {
  //   protocolConfigActions
  //   ->Meta3dCommonlib.ListSt.reduce([], (actionNames, actions) => {
  //     Js.Array.concat(
  //       actions
  //       ->Meta3dCommonlib.ArraySt.filter(action => action.role === role)
  //       ->Meta3dCommonlib.ArraySt.map(({name}) => name),
  //       actionNames,
  //     )
  //   })
  //   ->Meta3dCommonlib.ArraySt.removeDuplicateItemsWithBuildKeyFunc((. item) => item)
  // }

  let onFinishState = (dispatch, values) => {
    dispatch(
      FrontendUtils.ElementAssembleStoreType.SetElementStateFields(
        (values->Obj.magic)["fields"]->Meta3dCommonlib.ListSt.fromArray,
      ),
    )
  }

  let onFinishFailedState = (service, errorInfo) => {
    service.console.error(. {j`Failed: ${errorInfo->Obj.magic->Js.Json.stringify}`}, None)
  }

  // let _removeEmptyData = (handlers: FrontendUtils.ElementAssembleStoreType.handlers) => {
  //   handlers->Meta3dCommonlib.ListSt.filter(({actionName, updatedElementStateFieldName}) => {
  //     !(
  //       FrontendUtils.SelectUtils.isEmptySelectOptionValue(actionName) ||
  //       FrontendUtils.SelectUtils.isEmptySelectOptionValue(updatedElementStateFieldName)
  //     )
  //   })
  // }

  // let onFinishReducerHandlers = (dispatch, values) => {
  //   dispatch(
  //     FrontendUtils.ElementAssembleStoreType.SetHandlers(
  //       (values->Obj.magic)["handlers"]->Meta3dCommonlib.ListSt.fromArray->_removeEmptyData,
  //     ),
  //   )
  // }

  // let onFinishFailedReducerHandlers = onFinishFailedState

  let useSelector = (
    {apAssembleState, elementAssembleState}: FrontendUtils.AssembleSpaceStoreType.state,
  ) => {
    let {selectedContributes} = apAssembleState
    let {isShowElementInspector, elementInspectorData} = elementAssembleState

    (selectedContributes, (isShowElementInspector, elementInspectorData))
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = FrontendUtils.ReduxUtils.ElementAssemble.useDispatch(service.react.useDispatch)

  let (
    selectedContributes,
    (isShowElementInspector, elementInspectorData),
  ) = service.react.useSelector(. Method.useSelector)

  // let protocolConfigActions = Method.getProtocolConfigActions(service, selectedContributes)

  // let {elementStateFields, reducers} = elementInspectorData
  let {elementStateFields} = elementInspectorData

  isShowElementInspector
    ? <Space direction=#vertical size=#middle>
        {service.ui.buildTitle(. ~level=2, ~children={React.string(`State`)}, ())}
        <Form
          name="dynamic_form_item"
          onFinish={Method.onFinishState(dispatch)}
          onFinishFailed={Method.onFinishFailedState(service)}>
          <Form.List
            name="fields"
            initialValue={elementStateFields
            // ->Meta3dCommonlib.ListSt.map((
            //   {name, type_, defaultValue}: FrontendUtils.ElementAssembleStoreType.elementStateFieldData,
            // ) => {
            //   {
            //     "name": name,
            //     "type_": type_,
            //     "defaultValue": defaultValue,
            //   }
            // })
            ->Meta3dCommonlib.ListSt.toArray
            ->Obj.magic}>
            {(fields, {add, remove}) => {
              <>
                {fields
                ->Meta3dCommonlib.ArraySt.map(field => {
                  <Form.Item key={field.key}>
                    <Form.Item label={`Name`} name={[field.name, "name"]->Obj.magic}>
                      <Input />
                    </Form.Item>
                    <Form.Item label={`Type`} name={[field.name, "type_"]->Obj.magic}>
                      <Select>
                        <Select.Option value={`int`}> {React.string(`int`)} </Select.Option>
                        <Select.Option value={`string`}> {React.string(`string`)} </Select.Option>
                        <Select.Option value={`bool`}> {React.string(`bool`)} </Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label={`Default Value`} name={[field.name, "defaultValue"]->Obj.magic}>
                      <Input />
                    </Form.Item>
                    <Icon.MinusCircleOutlined onClick={_ => remove(. field.name)} />
                  </Form.Item>
                })
                ->React.array}
                <Form.Item>
                  <Button
                    onClick={_ => {
                      add(.)
                    }}>
                    {React.string(`Add Field`)}
                  </Button>
                  // <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            }}
          </Form.List>
          <Form.Item>
            <Button _type=#primary htmlType="submit"> {React.string(`Submit`)} </Button>
          </Form.Item>
        </Form>
        // {service.ui.buildTitle(. ~level=2, ~children={React.string(`Reducer`)}, ())}
        // <Space direction=#horizontal>
        //   {service.ui.buildText(. ~children={React.string(`Role: `)})}
        //   {FrontendUtils.SelectUtils.buildSelect(
        //     Method.setRole(dispatch),
        //     reducers.role->Meta3dCommonlib.OptionSt.getWithDefault(
        //       FrontendUtils.SelectUtils.buildEmptySelectOptionValue(),
        //     ),
        //     protocolConfigActions->Method.getUniqueRoles,
        //   )}
        // </Space>
        // {switch reducers.role {
        // | None => React.null
        // | Some(role) =>
        //   <Form
        //   // name="dynamic_form_item"
        //     onFinish={Method.onFinishReducerHandlers(dispatch)}
        //     onFinishFailed={Method.onFinishFailedReducerHandlers(service)}>
        //     <Form.List
        //       name="handlers"
        //       initialValue={reducers.handlers->Meta3dCommonlib.ListSt.toArray->Obj.magic}>
        //       {(fields, {add, remove}) => {
        //         <>
        //           {fields
        //           ->Meta3dCommonlib.ArraySt.map(field => {
        //             <Form.Item key={field.key}>
        //               <Form.Item label={`Action Name`} name={[field.name, "actionName"]->Obj.magic}>
        //                 {FrontendUtils.SelectUtils.buildSelect(
        //                   _ => (),
        //                   FrontendUtils.SelectUtils.buildEmptySelectOptionValue(),
        //                   protocolConfigActions->Method.getUniqueActionNamesByRole(role),
        //                 )}
        //               </Form.Item>
        //               <Form.Item
        //               // label=`Updated Element State Field Name`
        //                 label={`Field Name`}
        //                 name={[field.name, "updatedElementStateFieldName"]->Obj.magic}>
        //                 {FrontendUtils.SelectUtils.buildSelect(
        //                   _ => (),
        //                   FrontendUtils.SelectUtils.buildEmptySelectOptionValue(),
        //                   elementStateFields
        //                   ->Meta3dCommonlib.ListSt.map(({name}) => name)
        //                   ->Meta3dCommonlib.ListSt.toArray,
        //                 )}
        //               </Form.Item>
        //               <Icon.MinusCircleOutlined onClick={_ => remove(. field.name)} />
        //             </Form.Item>
        //           })
        //           ->React.array}
        //           <Form.Item>
        //             <Button
        //               onClick={_ => {
        //                 add(.)
        //               }}>
        //               {React.string(`Add Field`)}
        //             </Button>
        //             // <Form.ErrorList errors={errors} />
        //           </Form.Item>
        //         </>
        //       }}
        //     </Form.List>
        //     <Form.Item>
        //       <Button _type=#primary htmlType="submit"> {React.string(`Submit`)} </Button>
        //     </Form.Item>
        //   </Form>
        // }}
      </Space>
    : React.null
}
