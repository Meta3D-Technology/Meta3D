open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let clickPublishButton = setVisible => {
    setVisible(_ => true)
  }

  let _getExtensionNewName = (newName, data: Meta3d.ExtensionFileType.extensionFileData) => {
    newName->Meta3dCommonlib.OptionSt.getWithDefault(data.extensionPackageData.name)
  }

  let _getContributeNewName = (newName, data: Meta3d.ExtensionFileType.contributeFileData) => {
    newName->Meta3dCommonlib.OptionSt.getWithDefault(data.contributePackageData.name)
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

    let appBinaryFile = service.meta3d.generateApp(.
      service.meta3d.convertAllFileData(.
        selectedExtensions->Meta3dCommonlib.ArraySt.map((
          {data}: FrontendUtils.AssembleSpaceStoreType.extension,
        ) => data),
        selectedContributes->Meta3dCommonlib.ArraySt.map((
          {data}: FrontendUtils.AssembleSpaceStoreType.contribute,
        ) => data),
        (
          selectedExtensions->Meta3dCommonlib.ArraySt.map(({newName, data}) =>
            _getExtensionNewName(newName, data)
          ),
          selectedExtensions
          ->Meta3dCommonlib.ArraySt.filter(({isStart}) => isStart)
          ->Meta3dCommonlib.ArraySt.map(({newName, data}) => _getExtensionNewName(newName, data)),
          selectedContributes->Meta3dCommonlib.ArraySt.map(({newName, data}) =>
            _getContributeNewName(newName, data)
          ),
        ),
      ),
    )

    service.backend.publishApp(. appBinaryFile, appName, username->Meta3dCommonlib.OptionSt.getExn)
    ->Meta3dBsMost.Most.drain
    ->Js.Promise.then_(_ => {
      setVisible(_ => false)

      ()->Js.Promise.resolve
    }, _)
  }

  let onFinishFailed = (service, errorInfo) => {
    ()
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

  let (visible, setVisible) = service.react.useState(_ => false)

  <>
    <Button
      onClick={_ => {
        Method.clickPublishButton(setVisible)
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
          }, 20->Some)}
        onFinishFailed={Method.onFinishFailed(service)}
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
