open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let buildDefaultInputFileStr = () => {
    j`window.Contribute = {
    getContribute: (api) => {
      return {
        inputName: "xxx-input-xxx",
        func: (meta3dState) =>{
            return Promise.resolve(null)
        }
      }
    }
}`
  }

  let buildDefaultActionFileStr = () => {
    j`window.Contribute = {
  getContribute: (api) => {
    return {
      actionName: "xxx-action-xxx",
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

  let _getInputName = inputFileStr => {
    (
      inputFileStr
      ->Js.String.match_(%re("/inputName\:.*\"(.+)\",/im"), _)
      ->Meta3dCommonlib.OptionSt.getExn
    )[1]->Meta3dCommonlib.OptionSt.getExn
  }

  let onFinishCustomInput = (dispatch, values) => {
    dispatch(
      FrontendUtils.ApAssembleStoreType.SetCustomInputs(
        (values->Obj.magic)["fields"]
        ->Meta3dCommonlib.ArraySt.map((data): FrontendUtils.ApAssembleStoreType.customInput => {
          name: data["fileStr"]->_getInputName,
          fileStr: data["fileStr"],
        })
        ->Meta3dCommonlib.ListSt.fromArray,
      ),
    )
  }

  let _getActionName = actionFileStr => {
    (
      actionFileStr
      ->Js.String.match_(%re("/actionName\:.*\"(.+)\",/im"), _)
      ->Meta3dCommonlib.OptionSt.getExn
    )[1]->Meta3dCommonlib.OptionSt.getExn
  }

  let onFinishCustomAction = (dispatch, values) => {
    dispatch(
      FrontendUtils.ApAssembleStoreType.SetCustomActions(
        (values->Obj.magic)["fields"]
        ->Meta3dCommonlib.ArraySt.map((data): FrontendUtils.ApAssembleStoreType.customAction => {
          name: data["fileStr"]->_getActionName,
          fileStr: data["fileStr"],
        })
        ->Meta3dCommonlib.ListSt.fromArray,
      ),
    )
  }

  let onFinishFailedState = (service, errorInfo) => {
    service.console.error(. {j`Failed: ${errorInfo->Obj.magic->Js.Json.stringify}`}, None)
  }

  let useSelector = ({apAssembleState}: FrontendUtils.AssembleSpaceStoreType.state) => {
    let {customInputs, customActions} = apAssembleState

    (customInputs, customActions)
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = FrontendUtils.ReduxUtils.ApAssemble.useDispatch(service.react.useDispatch)

  let (customInputs, customActions) = service.react.useSelector(. Method.useSelector)

  let (visible, setVisible) = service.react.useState(_ => false)

  <>
    <Button
      onClick={_ => {
        setVisible(_ => true)
      }}>
      {React.string(`自定义`)}
    </Button>
    {visible
      ? <Modal
          title={`自定义`}
          visible={visible}
          onOk={() => {
            setVisible(_ => false)
          }}
          onCancel={() => {
            setVisible(_ => false)
          }}
          footer={React.null}>
          {<>
            {service.ui.buildTitle(. ~level=2, ~children={React.string(`自定义Input`)}, ())}
            <Form
              onFinish={values => {
                setVisible(_ => false)

                Method.onFinishCustomInput(dispatch, values)
              }}
              onFinishFailed={values => {
                setVisible(_ => false)

                Method.onFinishFailedState(service, values)
              }}>
              <Form.List
                name="fields"
                initialValue={customInputs->Meta3dCommonlib.ListSt.toArray->Obj.magic}>
                {(fields, {add, remove}) => {
                  <>
                    {fields
                    ->Meta3dCommonlib.ArraySt.map(field => {
                      <Form.Item key={field.key}>
                        // <Form.Item label={`Name`} name={[field.name, "name"]->Obj.magic}>
                        //   <Input />
                        // </Form.Item>
                        <Form.Item
                          // label={`File Str`}
                          label={``}
                          name={[field.name, "fileStr"]->Obj.magic}
                          initialValue={Method.buildDefaultInputFileStr()}>
                          <Input.TextArea />
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
                        {React.string(`加入Input`)}
                      </Button>
                    </Form.Item>
                  </>
                }}
              </Form.List>
              <Form.Item>
                <Button htmlType="submit"> {React.string(`提交`)} </Button>
              </Form.Item>
            </Form>
            {service.ui.buildTitle(. ~level=2, ~children={React.string(`自定义Action`)}, ())}
            <Form
              onFinish={values => {
                setVisible(_ => false)

                Method.onFinishCustomAction(dispatch, values)
              }}
              onFinishFailed={values => {
                setVisible(_ => false)

                Method.onFinishFailedState(service, values)
              }}>
              <Form.List
                name="fields"
                initialValue={customActions->Meta3dCommonlib.ListSt.toArray->Obj.magic}>
                {(fields, {add, remove}) => {
                  <>
                    {fields
                    ->Meta3dCommonlib.ArraySt.map(field => {
                      <Form.Item key={field.key}>
                        // <Form.Item label={`Name`} name={[field.name, "name"]->Obj.magic}>
                        //   <Input />
                        // </Form.Item>
                        <Form.Item
                          label={``}
                          name={[field.name, "fileStr"]->Obj.magic}
                          initialValue={Method.buildDefaultActionFileStr()}>
                          <Input.TextArea />
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
                        {React.string(`加入Action`)}
                      </Button>
                    </Form.Item>
                  </>
                }}
              </Form.List>
              <Form.Item>
                <Button htmlType="submit"> {React.string(`提交`)} </Button>
              </Form.Item>
            </Form>
          </>}
        </Modal>
      : React.null}
  </>
}
