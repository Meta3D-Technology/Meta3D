open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let _isSelectedNothing = (selectedExtensions, selectedContributes) => {
    selectedExtensions->Meta3dCommonlib.ArraySt.length == 0 &&
      selectedContributes->Meta3dCommonlib.ArraySt.length == 0
  }

  let getStartExtensionNeedConfigData = (
    service,
    selectedExtensions: FrontendUtils.ApAssembleStoreType.selectedExtensions,
  ) => {
    switch selectedExtensions->Meta3dCommonlib.ListSt.find(({isStart}) => {
      isStart
    }) {
    | None =>
      // service.console.error(. {j`can't find start extension`}, None)
      // []

      Meta3dCommonlib.Result.fail({j`can't find start extension`})
    | Some({protocolConfigStr}) =>
      switch protocolConfigStr {
      | None =>
        // service.console.error(. {j`start extension should has protocolConfigStr`}, None)
        // []
        Meta3dCommonlib.Result.fail({j`start extension should has protocolConfigStr`})
      | Some(protocolConfigStr) =>
        service.meta3d.getNeedConfigData(.
          service.meta3d.serializeStartExtensionProtocolConfigLib(. protocolConfigStr),
        )->Meta3dCommonlib.Result.succeed
      }
    }
  }

  let _buildConfigData = (
    values,
    startExtensionNeedConfigData: Meta3dType.StartExtensionProtocolConfigType.needConfigData,
  ) => {
    startExtensionNeedConfigData->Meta3dCommonlib.ArraySt.reduceOneParam((. map, {name, type_}) => {
      let value = (values->Obj.magic)[j`configData_${name}`->Obj.magic]

      map->Meta3dCommonlib.ImmutableHashMap.set(
        name,
        switch type_ {
        | #bool => BoolUtils.stringToBool(value)
        | #int => IntUtils.stringToInt(value)->Obj.magic
        | #string => value->Obj.magic
        },
      )
    }, Meta3dCommonlib.ImmutableHashMap.createEmpty())

    // ->Obj.magic->Js.Json.stringify
  }

  let onFinish = (
    service,
    (setUploadProgress, setIsUploadBegin, setVisible),
    (
      account,
      selectedExtensions,
      selectedContributes,
      canvasData: FrontendUtils.ApAssembleStoreType.canvasData,
    ),
    values,
  ): Js.Promise.t<unit> => {
    let appName = values["appName"]

    let selectedExtensions = selectedExtensions->Meta3dCommonlib.ListSt.toArray
    let selectedContributes = selectedContributes->Meta3dCommonlib.ListSt.toArray

    _isSelectedNothing(selectedExtensions, selectedContributes)
      ? {
          service.console.error(. {j`请至少选择一个扩展或者贡献`}, None)

          ()->Js.Promise.resolve
        }
      : {
          getStartExtensionNeedConfigData(
            service,
            selectedExtensions->Meta3dCommonlib.ListSt.fromArray,
          )->Meta3dCommonlib.Result.either(
            startExtensionNeedConfigData => {
              let appBinaryFile = AppUtils.generateApp(
                service,
                selectedExtensions,
                selectedContributes,
                (
                  (
                    {
                      width: canvasData.width,
                      height: canvasData.height,
                    }: Meta3dType.Index.canvasData
                  ),
                  _buildConfigData(values, startExtensionNeedConfigData)->Obj.magic,
                )->Meta3dCommonlib.NullableSt.return,
              )

              setIsUploadBegin(_ => true)

              service.backend.publishApp(.
                progress => setUploadProgress(_ => progress),
                appBinaryFile,
                appName,
                account->Meta3dCommonlib.OptionSt.getExn,
              )
              ->Meta3dBsMost.Most.drain
              ->Js.Promise.then_(_ => {
                setIsUploadBegin(_ => false)
                setVisible(_ => false)

                ()->Js.Promise.resolve
              }, _)
              ->Js.Promise.catch(e => {
                setIsUploadBegin(_ => false)
                service.console.error(.
                  e->Obj.magic->Js.Exn.message->Meta3dCommonlib.OptionSt.getExn->Obj.magic,
                  None,
                )->Obj.magic
              }, _)
            },
            failMessage => {
              service.console.error(. failMessage, None)

              ()->Js.Promise.resolve
            },
          )
        }
  }

  // let onFinishFailed = (service, errorInfo) => {
  //   ()
  // }

  let useSelector = (
    {selectedExtensions, selectedContributes, canvasData}: FrontendUtils.ApAssembleStoreType.state,
  ) => {
    (selectedExtensions, selectedContributes, canvasData)
  }
}

@react.component
let make = (~service: service, ~account: option<string>) => {
  let (selectedExtensions, selectedContributes, canvasData) = ReduxUtils.ApAssemble.useSelector(
    service.react.useSelector,
    Method.useSelector,
  )

  let (visible, setVisible) = service.react.useState(_ => false)

  let (uploadProgress, setUploadProgress) = service.react.useState(_ => 0)
  let (isUploadBegin, setIsUploadBegin) = service.react.useState(_ => false)

  <>
    <Button
      onClick={_ => {
        setVisible(_ => true)
      }}>
      {React.string(`发布`)}
    </Button>
    {visible
      ? <Modal
          title=`发布应用`
          visible={visible}
          onOk={() => {
            setVisible(_ => false)
          }}
          onCancel={() => {
            setVisible(_ => false)
          }}
          footer={React.null}>
          {isUploadBegin
            ? <p> {React.string({j`${uploadProgress->Js.Int.toString}% uploading...`})} </p>
            : <Form
                labelCol={{
                  "span": 8,
                }}
                wrapperCol={{
                  "span": 6,
                }}
                initialValues={{
                  "remember": true,
                }}
                onFinish={event => FrontendUtils.ErrorUtils.showCatchedErrorMessage(() => {
                    Method.onFinish(
                      service,
                      (setUploadProgress, setIsUploadBegin, setVisible),
                      (account, selectedExtensions, selectedContributes, canvasData),
                      event->Obj.magic,
                    )->ignore
                  }, 5->Some)}
                // onFinishFailed={Method.onFinishFailed(service)}
                autoComplete="off">
                <Form.Item
                  label=`应用名`
                  name="appName"
                  rules={[
                    {
                      required: true,
                      message: `输入应用名`,
                    },
                  ]}>
                  <Input />
                </Form.Item>
                <h1> {React.string(`Config Data`)} </h1>
                {Method.getStartExtensionNeedConfigData(
                  service,
                  selectedExtensions,
                )->Meta3dCommonlib.Result.either(
                  startExtensionNeedConfigData => {
                    startExtensionNeedConfigData
                    ->Meta3dCommonlib.ArraySt.map((
                      item: Meta3dType.StartExtensionProtocolConfigType.configData,
                    ) => {
                      <Form.Item label={item.name} name={j`configData_${item.name}`}>
                        {switch item.type_ {
                        | #bool =>
                          <Select>
                            <Select.Option value={`true`}> {React.string(`true`)} </Select.Option>
                            <Select.Option value={`false`}> {React.string(`false`)} </Select.Option>
                          </Select>
                        | #int
                        | #string =>
                          <Input />
                        }}
                      </Form.Item>
                    })
                    ->React.array
                  },
                  failMessage => {
                    React.null
                  },
                )}
                <Form.Item
                  wrapperCol={{
                    "offset": 8,
                    "span": 16,
                  }}>
                  <Button htmlType="submit"> {React.string(`发布`)} </Button>
                </Form.Item>
              </Form>}
        </Modal>
      : React.null}
  </>
}
