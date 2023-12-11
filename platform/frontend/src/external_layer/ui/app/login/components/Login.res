open Antd
%%raw("import 'antd/dist/antd.css'")

type values = {account: string}

@react.component
let make = (~service: FrontendType.service) => {
  let dispatch = AppStore.useDispatch()

  let (isLoginBegin, setIsLoginBegin) = React.useState(_ => false)

  let _login = () => {
    MetamaskExtend.ethereum->Meta3dCommonlib.NullableSt.isNullable
      ? {
          setIsLoginBegin(_ => false)
          service.console.error(. {j`请开启MetaMask钱包`}, 2->Some)
        }
      : {
          setIsLoginBegin(_ => true)

          let accountRef = ref(Obj.magic(1))

          let {request} = MetamaskExtend.ethereum->Meta3dCommonlib.NullableSt.unsafeGet

          request({
            method: #eth_requestAccounts,
          })
          ->Meta3dBsMostDefault.Most.fromPromise
          ->Meta3dBsMostDefault.Most.map(accounts => accounts[0], _)
          ->Meta3dBsMostDefault.Most.flatMap(account => {
            accountRef := account

            service.backend.handleLoginForWeb3(account)
          }, _)
          ->Meta3dBsMostDefault.Most.tap(_ => {
            dispatch(
              AppStoreType.UserCenterAction(
                UserCenterStoreType.SetAccount(accountRef.contents),
              ),
            )

            RescriptReactRouter.push("/")
          }, _)
          ->Meta3dBsMostDefault.Most.drain
          ->Js.Promise.then_(_ => {
            setIsLoginBegin(_ => false)

            ()->Js.Promise.resolve
          }, _)
          ->Js.Promise.catch(e => {
            service.console.errorWithExn(.
              e->Error.promiseErrorToExn,
              None,
            )->Obj.magic
          }, _)
          ->ignore
        }
  }

  let _onFinish = values => {
    let {account} = values->Obj.magic

    setIsLoginBegin(_ => true)

    service.backend.isLoginSuccess(account)->Meta3dBsMostDefault.Most.tap(((isSuccess, failMsg)) => {
      !isSuccess
        ? {
            setIsLoginBegin(_ => false)

            service.console.error(. Meta3dCommonlib.NullableSt.getExn(failMsg), 2->Some)

            ()
          }
        : {
            dispatch(
              AppStoreType.UserCenterAction(
                UserCenterStoreType.SetAccount(account),
              ),
            )

            RescriptReactRouter.push("/")

            setIsLoginBegin(_ => false)
          }
    }, _)->Meta3dBsMostDefault.Most.drain->Obj.magic
  }

  let _onFinishFailed = (service: FrontendType.service, errorInfo) => {
    service.console.error(. {j`Failed: ${errorInfo->Obj.magic->Js.Json.stringify}`}, 2->Some)
  }

  <Layout>
    <Layout.Header>
      <Nav currentKey="1" />
    </Layout.Header>
    <Layout.Content>
      <Space direction=#vertical size=#large>
        <Typography.Paragraph>
          <Typography.Title> {React.string({j`使用用户名登录`})} </Typography.Title>
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
            onFinish={_onFinish}
            onFinishFailed={_onFinishFailed(service)}
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
              <Button _type=#primary htmlType="submit"> {React.string(`登录`)} </Button>
              <Button
                onClick={_ => {
                  RescriptReactRouter.push("/Register")
                }}>
                {React.string(`注册`)}
              </Button>
            </Form.Item>
          </Form>
        </Typography.Paragraph>
        <Typography.Paragraph>
          <Typography.Title>
            {React.string({`或者使用MetaMask钱包登录`})}
          </Typography.Title>
          <Button
            _type=#primary
            onClick={_ => {
              _login()->ignore
            }}>
            {React.string(`使用MetaMask钱包登录`)}
          </Button>
          <Typography.Link href="https://zhuanlan.zhihu.com/p/112285438" target=#_blank>
            {React.string(`如何开启MetaMask钱包？`)}
          </Typography.Link>
        </Typography.Paragraph>
      </Space>
      {isLoginBegin ? <p> {React.string({j`loging...`})} </p> : React.null}
    </Layout.Content>
  </Layout>
}
