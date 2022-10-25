open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")

type values = {account: string, password: string}

@react.component
let make = () => {
  let dispatch = AppStore.useDispatch()

  let _onFinish = values => {
    let {account, password} = values->Obj.magic

    BackendCloudbase.checkUserName(account)->Meta3dBsMost.Most.flatMap(isPass => {
      !isPass
        ? {
            Message.error(. `account已经存在，请重新输入新的account`, 5)

            Meta3dBsMost.Most.empty()
          }
        : {
            BackendCloudbase.registerUser(account, password)->Meta3dBsMost.Most.tap(_ => {
              dispatch(AppStore.UserCenterAction(UserCenterStore.SetUserName(account)))

              RescriptReactRouter.push("/")
            }, _)
          }
    }, _)->Meta3dBsMost.Most.drain->Js.Promise.catch(e => {
      FrontendUtils.ErrorUtils.error(e->Obj.magic, None)->Obj.magic
    }, _)->Obj.magic
  }

  let _onFinishFailed = errorInfo => {
    Message.error(. {j`Failed: ${errorInfo->Obj.magic->Js.Json.stringify}`}, 5)
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
        name="account"
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
