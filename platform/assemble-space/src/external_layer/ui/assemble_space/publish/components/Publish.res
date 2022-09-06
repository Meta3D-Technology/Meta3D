open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let onFinish = (
    service,
    setVisible,
    (username, selectedExtensions, selectedContributes),
    values,
  ) => {
    let name = values["name"]

    let selectedExtensions = selectedExtensions->Meta3dCommonlib.ListSt.toArray
    let selectedContributes = selectedContributes->Meta3dCommonlib.ListSt.toArray

    FrontendUtils.ErrorUtils.showCatchedErrorMessage(() => {
      let appBinaryFile = Meta3d.Main.generateApp(
        Meta3d.Main.convertAllFileDataForApp(
          selectedExtensions->Meta3dCommonlib.ArraySt.map((
            {data}: FrontendUtils.AssembleSpaceStoreType.extension,
          ) => data),
          selectedContributes->Meta3dCommonlib.ArraySt.map((
            {data}: FrontendUtils.AssembleSpaceStoreType.contribute,
          ) => data),
          (
            selectedExtensions->Meta3dCommonlib.ArraySt.map(({newName}) =>
              newName->Meta3dCommonlib.OptionSt.getExn
            ),
            selectedExtensions
            ->Meta3dCommonlib.ArraySt.filter(({isStart}) => isStart)
            ->Meta3dCommonlib.ArraySt.map(({newName}) => newName->Meta3dCommonlib.OptionSt.getExn),
            selectedContributes->Meta3dCommonlib.ArraySt.map(({newName}) =>
              newName->Meta3dCommonlib.OptionSt.getExn
            ),
          ),
        ),
      )

      service.backend.publishApp(appBinaryFile, name, username->Meta3dCommonlib.OptionSt.getExn)
      ->Meta3dBsMost.Most.drain
      ->Js.Promise.then_(_ => {
        setVisible(_ => false)

        ()->Js.Promise.resolve
      }, _)
    }, 20)
  }

  let onFinishFailed = errorInfo => {
    Message.error({j`Failed: ${errorInfo->Obj.magic->Js.Json.stringify}`}, 5)
  }

  let useSelector = (
    {selectedExtensions, selectedContributes}: FrontendUtils.AssembleSpaceStoreType.state,
  ) => {
    (selectedExtensions, selectedContributes)
  }
}

@react.component
let make = (~service: service, ~username: option<string>) => {
  let (selectedExtensions, selectedContributes) = service.react.useSelector(Method.useSelector)

  let (visible, setVisible) = React.useState(_ => false)

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
      // name="basic"
        labelCol={{
          "span": 8,
        }}
        wrapperCol={{
          "span": 6,
        }}
        initialValues={{
          "remember": true,
        }}
        onFinish={event =>
          Method.onFinish(
            service,
            setVisible,
            (username, selectedExtensions, selectedContributes),
            event->Obj.magic,
          )}
        onFinishFailed={Method.onFinishFailed}
        autoComplete="off">
        <Form.Item
          label=`用户名`
          name="name"
          rules={[
            {
              required: true,
              message: `输入用户名`,
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
