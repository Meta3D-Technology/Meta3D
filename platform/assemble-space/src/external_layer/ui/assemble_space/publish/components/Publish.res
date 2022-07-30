open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let publish = () => {
    //TODO implement
    Obj.magic(1)
  }

  let handlePublishError = () => {
    //TODO implement
    Obj.magic(1)
  }


  let _onFinish = values => {
      ()
  }

  let _onFinishFailed = errorInfo => {
    Message.error({j`Failed: ${errorInfo->Obj.magic->Js.Json.stringify}`}, 5)
  }
}

@react.component
let make = (
  ~visible: bool,
  ~service: service,
  ~selectedExtensionsFromShop: selectedExtensionsFromShop,
  ~selectedContributesFromShop: selectedContributesFromShop,
) => {
  let (visible, setVisible) = React.useState(_ => visible)

  <Modal
    title="Publish"
    visible={visible}
    // onOk={
    //     () =>{
    // ()
    //     }
    // }
    // onCancel={
    //     () =>{
    // ()
    //     }
    // }
    footer={React.null}>
    <Form
    //   name="basic"
      labelCol={{
        "span": 8,
      }}
      wrapperCol={{
        "span": 6,
      }}
      initialValues={{
        "remember": true,
      }}
      onFinish={Method._onFinish}
      onFinishFailed={Method._onFinishFailed}
      autoComplete="off">
      <Form.Item
        label="名称"
        name="name"
        rules={[
          {
            required: true,
            message: "输入名称",
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
}
