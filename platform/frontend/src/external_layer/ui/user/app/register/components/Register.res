open Antd
%%raw("import 'antd/dist/antd.css'")

type values = {username: string, password: string}

@react.component
let make = () => {
  let dispatch = AppStore.useDispatch()

  let _onFinish = values => {
    let {username, password} = values->Obj.magic

    BackendCloudbase.checkUserName(username)->Meta3dBsMost.Most.flatMap(isPass => {
      !isPass
        ? {
            Message.error(`username已经存在，请重新输入新的username`)

            Meta3dBsMost.Most.empty()
          }
        : {
            BackendCloudbase.registerUser(username, password)->Meta3dBsMost.Most.tap(_ => {
              dispatch(AppStore.UserCenterAction(UserCenterStore.SetUserName(username)))

              RescriptReactRouter.push("/")
            }, _)
          }
    }, _)->Meta3dBsMost.Most.drain->Js.Promise.catch(e => {
      BackendCloudbase.error(~message=Message.message, ~e, ())-> Obj.magic
    }, _)->Obj.magic
  }

  let _onFinishFailed = errorInfo => {
    Message.error({j`Failed: ${errorInfo->Obj.magic->Js.Json.stringify}`})
  }

  <>
    <Nav />
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
      onFinish={_onFinish}
      onFinishFailed={_onFinishFailed}
      autoComplete="off">
      <Form.Item
        label=`用户名`
        name="username"
        rules={[
          {
            required: true,
            message: `输入用户名`,
          },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item
        label=`密码`
        name="password"
        rules={[
          {
            required: true,
            message: `输入密码`,
          },
        ]}>
        // <Input.Password />
        <Input _type="password" />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          "offset": 8,
          "span": 16,
        }}>
        <Button htmlType="submit"> {React.string(`注册`)} </Button>
      </Form.Item>
    </Form>
  </>
}
