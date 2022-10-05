open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let onFinish = (dispatch, values) => {
    dispatch(
      FrontendUtils.UIViewStoreType.SetElementStateFields(
        (values->Obj.magic)["fields"]->Meta3dCommonlib.ListSt.fromArray,
      ),
    )
  }

  let onFinishFailed = (service, errorInfo) => {
    service.console.error(. {j`Failed: ${errorInfo->Obj.magic->Js.Json.stringify}`}, None)
  }

  let useSelector = (
    {isShowElementInspector, elementInspectorData}: FrontendUtils.UIViewStoreType.state,
  ) => {
    (isShowElementInspector, elementInspectorData.elementStateFields)
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = ReduxUtils.UIView.useDispatch(service.react.useDispatch)

  let (isShowElementInspector, elementStateFields) = ReduxUtils.UIView.useSelector(
    service.react.useSelector,
    Method.useSelector,
  )

  isShowElementInspector
    ? <>
        <h1> {React.string(`State`)} </h1>
        <Form
          name="dynamic_form_item"
          onFinish={Method.onFinish(dispatch)}
          onFinishFailed={Method.onFinishFailed(service)}>
          <Form.List
            name="fields"
            initialValue={elementStateFields
            ->Meta3dCommonlib.ListSt.map((
              {name, type_, defaultValue}: FrontendUtils.UIViewStoreType.elementStateFieldData,
            ) => {
              {
                "name": name,
                "type_": type_,
                "defaultValue": defaultValue,
              }
            })
            ->Meta3dCommonlib.ListSt.toArray
            ->Obj.magic}>
            {(fields, {add, remove}) => {
              <>
                {fields
                ->Meta3dCommonlib.ArraySt.map(field => {
                  <Form.Item key={field.key}>
                    <Form.Item label=`Name` name={[field.name, "name"]->Obj.magic}>
                      <Input />
                    </Form.Item>
                    <Form.Item label=`Type` name={[field.name, "type_"]->Obj.magic}>
                      <Select>
                        <Select.Option value={`int`}> {React.string(`int`)} </Select.Option>
                        <Select.Option value={`string`}> {React.string(`string`)} </Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label=`Default Value` name={[field.name, "defaultValue"]->Obj.magic}>
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
          <Form.Item> <Button htmlType="submit"> {React.string(`Submit`)} </Button> </Form.Item>
        </Form>
      </>
    : React.null
}
