open Antd
%%raw("import 'antd/dist/reset.css'")
open AssembleSpaceType

module Method = {
  let _isSelectedNothing = (selectedPackages, selectedExtensions, selectedContributes) => {
    selectedPackages->Meta3dCommonlib.ArraySt.length == 0 &&
    selectedExtensions->Meta3dCommonlib.ArraySt.length == 0 &&
    selectedContributes->Meta3dCommonlib.ArraySt.length == 0
  }

  let _check = (selectedPackages, selectedExtensions, selectedContributes) => {
    _isSelectedNothing(selectedPackages, selectedExtensions, selectedContributes)
      ? Meta3dCommonlib.Result.fail({j`请至少选择一个包或者扩展或者贡献`})
      : selectedContributes->SelectedContributesForElementUtils.hasUIControl ||
        selectedContributes->SelectedContributesForElementUtils.hasAction
      ? Meta3dCommonlib.Result.fail({j`不能选择UI Control 或者Action`})
      : !(
        selectedExtensions->Meta3dCommonlib.ArraySt.includesByFunc((
          {isEntry}: PackageAssembleStoreType.extension,
        ) => isEntry)
      )
      ? Meta3dCommonlib.Result.fail({j`找不到入口扩展`})
      : Meta3dCommonlib.Result.succeed()
  }

  let onFinish = (
    service,
    (setUploadProgress, setIsUploadBegin, setVisible),
    (account, selectedPackages, selectedExtensions, selectedContributes),
    values,
  ): Js.Promise.t<unit> => {
    let packageName = values["packageName"]
    // let packageVersion = values["packageVersion"]
    let packageDescription = values["packageDescription"]

    let selectedPackages = selectedPackages->Meta3dCommonlib.ListSt.toArray
    let selectedExtensions = selectedExtensions->Meta3dCommonlib.ListSt.toArray
    let selectedContributes = selectedContributes->Meta3dCommonlib.ListSt.toArray

    _check(
      selectedPackages,
      selectedExtensions,
      selectedContributes,
    )->Meta3dCommonlib.Result.either(
      () => {
        let (
          entryExtensionProtocolName,
          entryExtensionProtocolVersion,
          entryExtensionProtocolVersionRange,
          entryExtensionProtocolIconBase64,
          entryExtensionProtocolDisplayName,
          entryExtensionProtocolRepoLink,
          entryExtensionProtocolDescription,
          entryExtensionProtocolConfigStr,
        ) = PackageUtils.getEntryExtensionProtocolData(selectedExtensions)

        service.backend.findNewestPublishPackage(.
          progress => (),
          entryExtensionProtocolName,
          packageName,
        )
        ->Meta3dBsMostDefault.Most.map(data => {
          data
          ->Meta3dCommonlib.NullableSt.map((. (_, _, packageVersion, _, _)) =>
            packageVersion->Meta3d.Semver.inc(#patch)
          )
          ->Meta3dCommonlib.NullableSt.getWithDefault("0.0.1")
        }, _)
        ->Meta3dBsMostDefault.Most.flatMap(packageVersion => {
          let packageBinaryFile = PackageUtils.generatePackage(
            service,
            selectedPackages,
            selectedExtensions,
            selectedContributes,
            (
              {
                name: entryExtensionProtocolName,
                version: entryExtensionProtocolVersion,
                iconBase64: entryExtensionProtocolIconBase64,
              },
              PackageUtils.getEntryExtensionName(selectedExtensions),
              packageVersion,
              packageName,
              entryExtensionProtocolConfigStr->Meta3dCommonlib.OptionSt.getWithDefault(""),
            ),
          )

          setIsUploadBegin(_ => true)

          service.backend.publishPackage(.
            progress => setUploadProgress(_ => progress),
            packageBinaryFile,
            (
              entryExtensionProtocolName,
              entryExtensionProtocolVersion,
              entryExtensionProtocolVersionRange,
              entryExtensionProtocolIconBase64,
              entryExtensionProtocolDisplayName,
              entryExtensionProtocolRepoLink,
              entryExtensionProtocolDescription,
              entryExtensionProtocolConfigStr->Meta3dCommonlib.OptionSt.toNullable,
              PackageUtils.getEntryExtensionName(selectedExtensions),
            ),
            (packageName, packageVersion, packageDescription),
            account->Meta3dCommonlib.OptionSt.getExn,
          )
        }, _)
        ->Meta3dBsMostDefault.Most.drain
        ->Js.Promise.then_(_ => {
          setIsUploadBegin(_ => false)
          setVisible(_ => false)

          ()->Js.Promise.resolve
        }, _)
        ->Js.Promise.catch(e => {
          setIsUploadBegin(_ => false)
          service.console.errorWithExn(. e->Error.promiseErrorToExn, None)->Obj.magic
        }, _)
      },
      failMessage => {
        service.console.error(. failMessage, None)

        ()->Js.Promise.resolve
      },
    )
  }

  // let onFinishFailed = (service, errorInfo) => {
  //   ()
  // }

  let useSelector = (
    {
      selectedPackages,
      selectedExtensions,
      selectedContributes,
    }: PackageAssembleStoreType.state,
  ) => {
    (selectedPackages, selectedExtensions, selectedContributes)
  }
}

@react.component
let make = (~service: service, ~account: option<string>) => {
  let (
    selectedPackages,
    selectedExtensions,
    selectedContributes,
  ) = ReduxUtils.PackageAssemble.useSelector(
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
                onFinish={event => MessageUtils.showCatchedErrorMessage(() => {
                    Method.onFinish(
                      service,
                      (setUploadProgress, setIsUploadBegin, setVisible),
                      (
                        account,
                        selectedPackages,
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
                // <Form.Item
                //   label={`包版本号`}
                //   name="packageVersion"
                //   rules={[
                //     {
                //       required: true,
                //       message: `输入包版本号`,
                //     },
                //   ]}>
                //   <Input />
                // </Form.Item>
                <Form.Item
                  label={`包介绍`}
                  name="packageDescription"
                  rules={[
                    {
                      required: true,
                      message: `输入包介绍`,
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
