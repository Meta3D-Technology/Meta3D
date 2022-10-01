open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let _isSelectedNothing = (selectedExtensions, selectedContributes) => {
    selectedExtensions->Meta3dCommonlib.ArraySt.length == 0 &&
      selectedContributes->Meta3dCommonlib.ArraySt.length == 0
  }

  let onFinish = (
    service,
    setVisible,
    (username, selectedExtensions, selectedContributes),
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
          let appBinaryFile = AppUtils.generateApp(service, selectedExtensions, selectedContributes)

          service.backend.publishApp(.
            appBinaryFile,
            appName,
            username->Meta3dCommonlib.OptionSt.getExn,
          )
          ->Meta3dBsMost.Most.drain
          ->Js.Promise.then_(_ => {
            setVisible(_ => false)

            ()->Js.Promise.resolve
          }, _)
        }
  }

  // let onFinishFailed = (service, errorInfo) => {
  //   ()
  // }

  let useSelector = (
    {selectedExtensions, selectedContributes}: FrontendUtils.ApViewStoreType.state,
  ) => {
    (selectedExtensions, selectedContributes)
  }
}

@react.component
let make = (~service: service, ~username: option<string>) => {
  let (selectedExtensions, selectedContributes) = ReduxUtils.ApView.useSelector(
    service.react.useSelector,
    Method.useSelector,
  )

  let (visible, setVisible) = service.react.useState(_ => false)

  <>
    <Button
      onClick={_ => {
        setVisible(_ => true)
      }}>
      {React.string(`发布`)}
    </Button>
    <Modal
      title=`发布应用`
      visible={visible}
      onOk={() => {
        setVisible(_ => false)
      }}
      onCancel={() => {
        setVisible(_ => false)
      }}
      footer={React.null}>
      <Form
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
              setVisible,
              (username, selectedExtensions, selectedContributes),
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
        <Form.Item
          wrapperCol={{
            "offset": 8,
            "span": 16,
          }}>
          <Button htmlType="submit"> {React.string(`发布`)} </Button>
        </Form.Item>
      </Form>
    </Modal>
  </>
}
