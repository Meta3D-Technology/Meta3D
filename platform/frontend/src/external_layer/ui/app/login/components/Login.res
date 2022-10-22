open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")

type values = {username: string, password: string}

@react.component
let make = (~service: FrontendUtils.FrontendType.service) => {
  let dispatch = AppStore.useDispatch()

  let _login = () => {
    MetamaskExtend.ethereum->Meta3dCommonlib.NullableSt.isNullable
      ? {
          Message.error(. {j`请开启MetaMask钱包`}, 5)
        }
      : {
          let accountRef = ref(Obj.magic(1))

          let {request} = MetamaskExtend.ethereum->Meta3dCommonlib.NullableSt.unsafeGet

          request({
            method: #eth_requestAccounts,
          })
          ->Meta3dBsMost.Most.fromPromise
          ->Meta3dBsMost.Most.map(accounts => accounts[0], _)
          ->Meta3dBsMost.Most.flatMap(account => {
            accountRef := account

            service.backend.handleLogin(account)
          }, _)
          ->Meta3dBsMost.Most.tap(_ => {
            dispatch(AppStore.UserCenterAction(UserCenterStore.SetAccount(accountRef.contents)))

            RescriptReactRouter.push("/")
          }, _)
          ->Meta3dBsMost.Most.drain
          ->Js.Promise.catch(e => {
            Message.error(.
              e->Obj.magic->Js.Exn.message->Meta3dCommonlib.OptionSt.getExn->Obj.magic,
              None,
            )
          }, _)
        }
  }

  // let _onFinish = values => {
  //   let {username, password} = values->Obj.magic

  //   BackendCloudbase.isLoginSuccess(username, password)
  //   ->Meta3dBsMost.Most.tap(((isSuccess, failMsg)) => {
  //     !isSuccess
  //       ? {
  //           Message.error(. Meta3dCommonlib.NullableSt.getExn(failMsg), 5)

  //           ()
  //         }
  //       : {
  //           dispatch(AppStore.UserCenterAction(UserCenterStore.SetUserName(username)))

  //           RescriptReactRouter.push("/")
  //         }
  //   }, _)
  //   ->Meta3dBsMost.Most.drain
  //   ->Obj.magic
  // }

  // let _onFinishFailed = errorInfo => {
  //   Message.error(. {j`Failed: ${errorInfo->Obj.magic->Js.Json.stringify}`}, 5)
  // }

  <>
    <Nav />
    <Button
      onClick={_ => {
        _login()->ignore
      }}>
      {React.string(`使用MetaMask钱包登录`)}
    </Button>
    <h1>
      <a href="https://zhuanlan.zhihu.com/p/112285438" target="_blank">
        {React.string(`如何开启MetaMask钱包？`)}
      </a>
    </h1>
  </>
}
