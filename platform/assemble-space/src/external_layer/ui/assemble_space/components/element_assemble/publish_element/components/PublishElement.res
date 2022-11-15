open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let _getSelectedUIControlName = (
    id,
    selectedUIControls: FrontendUtils.ElementAssembleStoreType.selectedUIControls,
  ) => {
    (
      selectedUIControls
      ->Meta3dCommonlib.ListSt.find(selectedUIControl => selectedUIControl.id === id)
      ->Meta3dCommonlib.OptionSt.getExn
    ).name
  }

  let onFinish = (
    service,
    (setUploadProgress, setIsUploadBegin, setVisible),
    (
      account,
      (
        elementInspectorData: FrontendUtils.ElementAssembleStoreType.elementInspectorData,
        selectedUIControls,
        selectedUIControlInspectorData: FrontendUtils.ElementAssembleStoreType.selectedUIControlInspectorData,
      ),
    ),
    values,
  ): Js.Promise.t<unit> =>
    {
      let elementName: string = values["elementName"]
      let elementVersion: string = values["elementVersion"]

      let {elementStateFields, reducers} = elementInspectorData

      let protocolName = ElementContributeUtils.getElementContributeProtocolName()
      let protocolVersion = ElementContributeUtils.getElementContributeProtocolVersion()

      setIsUploadBegin(_ => true)

      Meta3dBsMost.Most.mergeArray([
        service.backend.publishElementContribute(.
          progress => setUploadProgress(_ => progress),
          account->Meta3dCommonlib.OptionSt.getExn,
          (elementName, elementVersion, protocolName, protocolVersion),
          ElementVisualUtils.generateElementContributeBinaryFile(
            service,
            elementName,
            protocolName,
            protocolVersion,
            ElementContributeUtils.buildElementContributeFileStr(
              service,
              elementName,
              selectedUIControls,
              selectedUIControlInspectorData,
              (elementStateFields, reducers),
            ),
          ),
        ),
        service.backend.publishElementAssembleData(.
          account->Meta3dCommonlib.OptionSt.getExn,
          elementName,
          elementVersion,
          (
            {
              element: elementInspectorData,
              uiControls: selectedUIControlInspectorData
              ->Meta3dCommonlib.ListSt.map(({
                id,
                rect,
                isDraw,
                skin,
                event,
                specific,
              }): FrontendUtils.BackendCloudbaseType.uiControl => {
                name: _getSelectedUIControlName(id, selectedUIControls),
                rect: rect,
                isDraw: isDraw,
                skin: skin,
                event: event,
                specific: specific,
              })
              ->Meta3dCommonlib.ListSt.toArray,
            }: FrontendUtils.BackendCloudbaseType.inspectorData
          ),
        ),
      ])
      ->Meta3dBsMost.Most.drain
      ->Js.Promise.then_(_ => {
        setIsUploadBegin(_ => false)
        setVisible(_ => false)

        ()->Js.Promise.resolve
      }, _)
    }->Js.Promise.catch(e => {
      setIsUploadBegin(_ => false)
      service.console.errorWithExn(. e->FrontendUtils.Error.promiseErrorToExn, None)->Obj.magic
    }, _)

  // let onFinishFailed = (service, errorInfo) => {
  //   ()
  // }

  let useSelector = (
    {
      elementInspectorData,
      selectedUIControls,
      selectedUIControlInspectorData,
    }: FrontendUtils.ElementAssembleStoreType.state,
  ) => {
    (elementInspectorData, selectedUIControls, selectedUIControlInspectorData)
  }
}

@react.component
let make = (~service: service, ~account: option<string>) => {
  let (
    elementInspectorData,
    selectedUIControls,
    selectedUIControlInspectorData,
  ) = ReduxUtils.ElementAssemble.useSelector(service.react.useSelector, Method.useSelector)

  let (visible, setVisible) = service.react.useState(_ => false)

  let (uploadProgress, setUploadProgress) = service.react.useState(_ => 0)
  let (isUploadBegin, setIsUploadBegin) = service.react.useState(_ => false)

  <>
    <Button
      onClick={_ => {
        setVisible(_ => true)
      }}>
      {React.string(`发布Element`)}
    </Button>
    <Modal
      title=`发布Element`
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
          // labelCol={{
          //   "span": 8,
          // }}
          // wrapperCol={{
          //   "span": 6,
          // }}
            initialValues={{
              "remember": true,
            }}
            onFinish={event => FrontendUtils.ErrorUtils.showCatchedErrorMessage(() => {
                Method.onFinish(
                  service,
                  (setUploadProgress, setIsUploadBegin, setVisible),
                  (
                    account,
                    (elementInspectorData, selectedUIControls, selectedUIControlInspectorData),
                  ),
                  event->Obj.magic,
                )->ignore
              }, 5->Some)}
            // onFinishFailed={Method.onFinishFailed(service)}
            autoComplete="off">
            <Form.Item
              label=`Element名`
              name="elementName"
              rules={[
                {
                  required: true,
                  message: `输入Element名`,
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              label=`Element版本号`
              name="elementVersion"
              rules={[
                {
                  required: true,
                  message: `输入Element版本号`,
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
  </>
}
