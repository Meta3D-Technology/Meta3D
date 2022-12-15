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
    (setUploadProgress, setIsUploadBegin, setVisible),
    (account, selectedExtensions, selectedContributes),
    values,
  ): Js.Promise.t<unit> => {
    let packageName = values["packageName"]

    let selectedExtensions = selectedExtensions->Meta3dCommonlib.ListSt.toArray
    let selectedContributes = selectedContributes->Meta3dCommonlib.ListSt.toArray

    _isSelectedNothing(selectedExtensions, selectedContributes)
      ? {
          service.console.error(. {j`请至少选择一个扩展或者贡献`}, None)

          ()->Js.Promise.resolve
        }
      : {
          let packageBinaryFile = PackageUtils.generatePackage(
            service,
            selectedExtensions,
            selectedContributes,
          )

          setIsUploadBegin(_ => true)

          service.backend.publishPackage(.
            progress => setUploadProgress(_ => progress),
            packageBinaryFile,
            packageName,
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
            service.console.errorWithExn(.
              e->FrontendUtils.Error.promiseErrorToExn,
              None,
            )->Obj.magic
          }, _)
        }
  }

  // let onFinishFailed = (service, errorInfo) => {
  //   ()
  // }

  let useSelector = (
    {selectedExtensions, selectedContributes}: FrontendUtils.PackageAssembleStoreType.state,
  ) => {
    (selectedExtensions, selectedContributes)
  }
}

@react.component
let make = (~service: service, ~account: option<string>) => {
  let (selectedExtensions, selectedContributes) = ReduxUtils.PackageAssemble.useSelector(
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
          title={`发布包`}
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
                      (
                        account,
                        selectedExtensions,
                        selectedContributes,
                        // canvasData,
                        // apInspectorData,
                      ),
                      event->Obj.magic,
                    )->ignore
                  }, 5->Some)}
                // onFinishFailed={Method.onFinishFailed(service)}
                autoComplete="off">
                <Form.Item
                  label={`包名`}
                  name="packageName"
                  rules={[
                    {
                      required: true,
                      message: `输入包名`,
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
              </Form>}
        </Modal>
      : React.null}
  </>
}
