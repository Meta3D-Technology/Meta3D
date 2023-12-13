open Antd
%%raw("import 'antd/dist/antd.css'")
open AssembleSpaceType

module Method = {
  // let _getSelectedUIControl = (
  //   id,
  //   selectedUIControls: ElementAssembleStoreType.selectedUIControls,
  // ) => {
  //   selectedUIControls
  //   ->Meta3dCommonlib.ListSt.find(selectedUIControl => selectedUIControl.id === id)
  //   ->Meta3dCommonlib.OptionSt.getExn
  // }

  let rec _convertToUIControls = (
    selectedUIControlInspectorData: ElementAssembleStoreType.selectedUIControlInspectorData,
    selectedUIControls,
  ) => {
    selectedUIControlInspectorData
    ->Meta3dCommonlib.ListSt.map(({
      id,
      children,
      rect,
      isDraw,
      input,
      event,
      specific,
    }): BackendCloudbaseType.uiControl => {
      let {displayName, data} =
        HierachyUtils.findSelectedUIControlData(
          None,
          (
            (data: ElementAssembleStoreType.uiControl) => data.id,
            (data: ElementAssembleStoreType.uiControl) => data.children,
          ),
          selectedUIControls,
          id,
        )->Meta3dCommonlib.OptionSt.getExn

      {
        protocol: {
          name: data.contributePackageData.protocol.name,
          version: data.contributePackageData.protocol.version,
        },
        displayName,
        rect,
        isDraw,
        input: input->Meta3dCommonlib.OptionSt.toNullable,
        event,
        specific,
        children: _convertToUIControls(children, selectedUIControls),
      }
    })
    ->Meta3dCommonlib.ListSt.toArray
  }

  let onFinish = (
    service,
    (setUploadProgress, setIsUploadBegin, setVisible),
    (
      account,
      (
        // elementInspectorData: ElementAssembleStoreType.elementInspectorData,
        selectedUIControls,
        selectedUIControlInspectorData: ElementAssembleStoreType.selectedUIControlInspectorData,
      ),
      customInputs,
      customActions,
    ),
    values,
  ): Js.Promise.t<unit> =>
    {
      let elementName: string = values["elementName"]
      // let elementVersion: string = values["elementVersion"]

      // let {elementStateFields} = elementInspectorData

      // let protocolName = ElementContributeUtils.getElementContributeProtocolName()
      // let protocolVersion = ElementUtils.getElementContributeProtocolVersion()
      // let displayName = elementName
      // let repoLink = ElementContributeUtils.getElementContributeRepoLink()
      // let description = ElementContributeUtils.getElementContributeDescription()

      setIsUploadBegin(_ => true)

      // Meta3dBsMostDefault.Most.mergeArray([
      //   // service.backend.publishElementContribute(.
      //   //   progress => setUploadProgress(_ => progress),
      //   //   account->Meta3dCommonlib.OptionSt.getExn,
      //   //   (
      //   //     elementName,
      //   //     elementVersion,
      //   //     protocolName,
      //   //     protocolVersion,
      //   //     displayName,
      //   //     repoLink,
      //   //     description,
      //   //   ),
      //   //   ElementVisualUtils.generateElementContributeBinaryFile(
      //   //     service,
      //   //     elementName,
      //   //     elementVersion,
      //   //     account->Meta3dCommonlib.OptionSt.getExn,
      //   //     protocolName,
      //   //     protocolVersion,
      //   //     displayName,
      //   //     repoLink,
      //   //     description,
      //   //     ElementContributeUtils.buildElementContributeFileStr(
      //   //       service,
      //   //       elementName,
      //   //       selectedUIControls,
      //   //       selectedUIControlInspectorData,
      //   //       // elementStateFields,
      //   //     ),
      //   //   ),
      //   // ),
      //   service.backend.publishElementAssembleData(.
      //     account->Meta3dCommonlib.OptionSt.getExn,
      //     elementName,
      //     elementVersion,
      //     (
      //       {
      //         // element: elementInspectorData,
      //         uiControls: _convertToUIControls(selectedUIControlInspectorData, selectedUIControls),
      //       }: BackendCloudbaseType.inspectorData
      //     ),
      //   ),
      // ])

      service.backend.findNewestPublishElementAssembleData(. elementName)
      ->Meta3dBsMostDefault.Most.map(elementAssembleData => {
        elementAssembleData
        ->Meta3dCommonlib.NullableSt.map((.
          {elementVersion}: BackendCloudbaseType.elementAssembleData,
        ) => elementVersion->Meta3d.Semver.inc(#patch))
        ->Meta3dCommonlib.NullableSt.getWithDefault("0.0.1")
      }, _)
      ->Meta3dBsMostDefault.Most.flatMap(elementVersion => {
        service.backend.publishElementAssembleData(.
          account->Meta3dCommonlib.OptionSt.getExn,
          elementName,
          elementVersion,
          (
            {
              uiControls: _convertToUIControls(selectedUIControlInspectorData, selectedUIControls),
            }: BackendCloudbaseType.inspectorData
          ),
          customInputs->Meta3dCommonlib.ListSt.toArray,
          customActions->Meta3dCommonlib.ListSt.toArray,
        )
      }, _)
      ->Meta3dBsMostDefault.Most.drain
      ->Js.Promise.then_(_ => {
        setIsUploadBegin(_ => false)
        setVisible(_ => false)

        ()->Js.Promise.resolve
      }, _)
    }->Js.Promise.catch(e => {
      setIsUploadBegin(_ => false)
      service.console.errorWithExn(. e->Error.promiseErrorToExn, None)->Obj.magic
    }, _)

  // let onFinishFailed = (service, errorInfo) => {
  //   ()
  // }

  let useSelector = (
    {
      // elementInspectorData,
      selectedUIControls,
      selectedUIControlInspectorData,
      customInputs,
      customActions,
    }: ElementAssembleStoreType.state,
  ) => {
    (
      // elementInspectorData,
      selectedUIControls,
      selectedUIControlInspectorData,
      customInputs,
      customActions,
    )
  }
}

@react.component
let make = (~service: service, ~account: option<string>) => {
  let (
    // elementInspectorData,
    selectedUIControls,
    selectedUIControlInspectorData,
    customInputs,
    customActions,
  ) = ReduxUtils.ElementAssemble.useSelector(service.react.useSelector, Method.useSelector)

  let (visible, setVisible) = service.react.useState(_ => false)

  let (uploadProgress, setUploadProgress) = service.react.useState(_ => 0)
  let (isUploadBegin, setIsUploadBegin) = service.react.useState(_ => false)

  <>
    <Button
      onClick={_ => {
        setVisible(_ => true)
      }}>
      {React.string(`发布页面`)}
    </Button>
    <Modal
      title={`发布页面`}
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
            onFinish={event => ErrorUtils.showCatchedErrorMessage(() => {
                Method.onFinish(
                  service,
                  (setUploadProgress, setIsUploadBegin, setVisible),
                  (
                    account,
                    (
                      // elementInspectorData,
                      selectedUIControls,
                      selectedUIControlInspectorData,
                    ),
                    customInputs,
                    customActions,
                  ),
                  event->Obj.magic,
                )->ignore
              }, 5->Some)}
            // onFinishFailed={Method.onFinishFailed(service)}
            autoComplete="off">
            <Form.Item
              label={`页面名`}
              name="elementName"
              rules={[
                {
                  required: true,
                  message: `输入页面名`,
                },
              ]}>
              <Input />
            </Form.Item>
            // <Form.Item
            //   label={`页面版本号`}
            //   name="elementVersion"
            //   rules={[
            //     {
            //       required: true,
            //       message: `输入页面版本号`,
            //     },
            //   ]}>
            //   <Input />
            // </Form.Item>
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
