open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")

type values = {account: string}

@react.component
let make = (~service: FrontendUtils.FrontendType.service) => {
  let dispatch = AppStore.useDispatch()

  let _onFinish = values => {
    let {account} = values->Obj.magic

    service.backend.checkUserName(account)->Meta3dBsMost.Most.flatMap(isPass => {
      !isPass
        ? {
            service.console.error(.
              `用户名已经存在，请重新输入新的用户名`,
              2->Some,
            )

            Meta3dBsMost.Most.empty()
          }
        : {
            service.backend.registerUser(account)->Meta3dBsMost.Most.tap(_ => {
              dispatch(AppStore.UserCenterAction(UserCenterStore.SetAccount(account)))

              RescriptReactRouter.push("/")
            }, _)
          }
    }, _)->Meta3dBsMost.Most.drain->Js.Promise.catch(e => {
      service.console.errorWithExn(. e->FrontendUtils.Error.promiseErrorToExn, None)->Obj.magic
    }, _)->Obj.magic
  }

  let _onFinishFailed = errorInfo => {
    service.console.error(. {j`Failed: ${errorInfo->Obj.magic->Js.Json.stringify}`}, 2->Some)
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
        label={`用户名`}
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
        wrapperCol={{
          "offset": 8,
          "span": 16,
        }}>
        <Button htmlType="submit"> {React.string(`注册`)} </Button>
      </Form.Item>
    </Form>
  </>
}
