open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  //   let reset = dispatch => {
  //     dispatch(FrontendUtils.UIViewStoreType.Reset)
  //   }

  //   let useEffectOnce = dispatch => {
  //     reset(dispatch)

  //     ((), None)
  //   }

}

@react.component
let make = (~service: service) => {
  //   let dispatch = ReduxUtils.UIView.useDispatch(service.react.useDispatch)

  //   service.react.useEffectOnce(() => Method.useEffectOnce(dispatch))

  <Layout />
}
