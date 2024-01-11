open Antd
%%raw("import 'antd/dist/reset.css'")

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
            Meta3dUserUtils.Main.saveAccount(accountRef.contents)

            dispatch(
              AppStoreType.UserCenterAction(UserCenterStoreType.SetAccount(accountRef.contents)),
            )

            RescriptReactRouter.push("/")
          }, _)
          ->Meta3dBsMostDefault.Most.drain
          ->Js.Promise.then_(_ => {
            setIsLoginBegin(_ => false)

            ()->Js.Promise.resolve
          }, _)
          ->Js.Promise.catch(e => {
            service.console.errorWithExn(. e->Error.promiseErrorToExn, None)->Obj.magic
          }, _)
          ->ignore
        }
  }

  let _onFinish = values => {
    let {account} = values->Obj.magic

    setIsLoginBegin(_ => true)

    service.backend.isLoginSuccess(account)
    ->Meta3dBsMostDefault.Most.tap(((isSuccess, failMsg)) => {
      !isSuccess
        ? {
            setIsLoginBegin(_ => false)

            service.console.error(. Meta3dCommonlib.NullableSt.getExn(failMsg), 2->Some)

            ()
          }
        : {
            LoginUtils.login(dispatch, account)

            setIsLoginBegin(_ => false)
          }
    }, _)
    ->Meta3dBsMostDefault.Most.drain
    ->Obj.magic
  }

  let _onFinishFailed = (service: FrontendType.service, errorInfo) => {
    service.console.error(. {j`Failed: ${errorInfo->Obj.magic->Js.Json.stringify}`}, 2->Some)
  }

  let _finishGuide = () => {
    GuideUtils.markFinishFirstLogin()
    RescriptReactRouter.push("/Login")
  }

  let _afterChange = currentSlide => {
    // _finishGuide()
    ()
  }

  let _getCaroselStyle = () => {
    ReactDOM.Style.make(
      ~margin="10px",
      ~height="500px",
      // ~color="#ffffff",
      // ~lineHeight="500px",
      ~textAlign="center",
      ~background="#364d79",
      (),
    )
  }

  <>
    {GuideUtils.readIsFinishFirstLogin()
      ? <Layout>
          // <Layout.Header>
          //   <Nav currentKey="1" account=None />
          // </Layout.Header>
          <Layout.Content>
            <Space direction=#vertical size=#large>
              <Typography.Paragraph>
                <Typography.Title>
                  {React.string({j`只需要邮箱即可登录`})}
                </Typography.Title>
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
                    label={`邮箱`}
                    name="account"
                    rules={[
                      {
                        _type: #email->Meta3dCommonlib.NullableSt.return,
                        required: true,
                        message: `请输入正确的邮箱`,
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
                      {React.string(`快速注册`)}
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
            {isLoginBegin ? <Loading text={j`加载中，请稍候`} /> : React.null}
          </Layout.Content>
        </Layout>
      : <>
          <Carousel
            style={_getCaroselStyle()}
            dots=true
            autoplay=true
            autoplaySpeed=15000
            afterChange={_afterChange}>
            <Space direction=#vertical>
              <Typography.Title level=2>
                {React.string({
                  j`Meta3D是开源Web3D低代码平台，快速搭建Web3D编辑器，共建开放互助的web3d生态`
                })}
              </Typography.Title>
              <Typography.Text _type=#warning>
                {React.string({
                  j`目前处于内测阶段，完全免费`
                })}
              </Typography.Text>
            </Space>
            <section>
              <Row align=#middle justify=#center>
                <Space direction=#vertical>
                  <Typography.Title level=2>
                    {React.string({
                      j`加入UI Control`
                    })}
                  </Typography.Title>
                  <img src="/static/image/gif/add_ui_control.gif" />
                </Space>
              </Row>
            </section>
            <section>
              <Row align=#middle justify=#center>
                <Space direction=#vertical>
                  <Typography.Title level=2>
                    {React.string({
                      j`加入Action脚本`
                    })}
                  </Typography.Title>
                  <img src="/static/image/gif/add_action.gif" />
                </Space>
              </Row>
            </section>
            <section>
              <Row align=#middle justify=#center>
                <Space direction=#vertical>
                  <Typography.Title level=2>
                    {React.string({
                      j`发布编辑器`
                    })}
                  </Typography.Title>
                  <img src="/static/image/gif/publish.gif" />
                </Space>
              </Row>
            </section>
            <section>
              <Row align=#middle justify=#center>
                <Space direction=#vertical>
                  <Typography.Title level=2>
                    {React.string({
                      j`导入编辑器`
                    })}
                  </Typography.Title>
                  <img src="/static/image/gif/import.gif" />
                </Space>
              </Row>
            </section>
            <section>
              <Row align=#middle justify=#center>
                <Space direction=#vertical>
                  <Typography.Title level=2>
                    {React.string({
                      j`运行“完整的编辑器”模板`
                    })}
                  </Typography.Title>
                  <img src="/static/image/gif/run_complete_editor.gif" />
                </Space>
              </Row>
            </section>
          </Carousel>
          <Row align=#middle justify=#center>
            <Space direction=#horizontal>
              <Button
                _type=#primary
                onClick={_ => {
                  _finishGuide()
                }}>
                {React.string(`登录`)}
              </Button>
              <Button
                _type=#default
                onClick={_ => {
                  LinkUtils.openLink({j`https://meta3d-website.4everland.app/`})
                }}>
                {React.string(`了解详情`)}
              </Button>
            </Space>
          </Row>
        </>}
  </>
}
