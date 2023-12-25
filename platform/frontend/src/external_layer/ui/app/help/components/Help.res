open Antd
%%raw("import 'antd/dist/reset.css'")

@react.component
let make = (
  //   ~setOpenCreateFromScratchPhase1TourFunc,
  ~guideTarget: React.ref<Js.Nullable.t<'a>>,
) => {
  let dispatch = AppStore.useDispatch()
  let dispatchForElementAssembleStore = ReduxUtils.ElementAssemble.useDispatch(
    ReactUtils.useDispatchForAssembleSpaceStore,
  )

  let {release} = AppStore.useSelector(({userCenterState}: AppStoreType.state) => userCenterState)

  <>
    <Card key={"0"}>
      <Tooltip placement=#right title={j`来点个star吧，感恩~`}>
        <iframe
          src="https://ghbtns.com/github-btn.html?user=Meta3D-Technology&repo=Meta3D&type=star&count=true&size=large"
          // frameborder="0"
          style={ReactDOM.Style.make(~borderWidth="0px", ())}
          scrolling="0"
          width="170"
          height="30"
          title="GitHub"
        />
      </Tooltip>
    </Card>
    <Card key={"1"}>
      <section ref={guideTarget->Obj.magic}>
        <Tooltip title={j`打开“从头创建新的编辑器”的引导`}>
          <Button
            _type=#primary
            onClick={_ => {
              // setOpenCreateFromScratchPhase1TourFunc(_ => false)

              GuideUtils.startCreateFromScratchTour(dispatch, dispatchForElementAssembleStore)

              RescriptReactRouter.push("/CreateFromScratchGuideBeginInUserCenter")
            }}>
            {React.string(`打开新人引导`)}
          </Button>
        </Tooltip>
        <Tooltip title={j`当您执行某些操作时，会打开对应的帮助文档`}>
          <Button
            _type=#default
            onClick={_ => {
              GuideUtils.markIsFinishShowInput(false)
              GuideUtils.markIsFinishShowAction(false)

              MessageUtils.success({j`成功`}, None)
            }}>
            {React.string(`打开帮助文档`)}
          </Button>
        </Tooltip>
      </section>
    </Card>
    <Card
      key={"2"}
      // title={<span>
      //   <a
      //     href={"https://qm.qq.com/cgi-bin/qm/qr?k=SaSgwsyiccUjc3Mx3Jqliv9HJnHxL-WI&jump_from=webapi&authKey=+EQRAdLQ80spfX++pA3UB4erf6cxC+Mo4jH6bfovhdE7MOvI5WBUljCZ6roGaNZh"}>
      //     {React.string(`点这里`)}
      //   </a>
      //   {React.string(`加QQ群`)}
      // </span>}
    >
      <span>
        <a
          href={"http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=r1Z4Z5uToIO1dISsXvdJvQOtFr3IoPJx&authKey=Ft1KpywYZrlO4yUGQj5jCliI4DaVf4hkM5jiiZtm195Ei4bSNiwo1SHEogLcrc%2Fp&noverify=0&group_code=568338939"}
          target="_blank">
          {React.string(`点这里`)}
        </a>
        {React.string(`加QQ群`)}
      </span>
    </Card>
    <Card key={"3"}>
      <span>
        <a href={"https://meta3d-website.4everland.app/docs/%E7%AE%80%E4%BB%8B"} target="_blank">
          {React.string(`文档`)}
        </a>
        {React.string(``)}
      </span>
    </Card>
    <Card key={"4"}>
      <span>
        <a href={"https://github.com/Meta3D-Technology/Meta3D/issues/new/choose"} target="_blank">
          {React.string(`Github`)}
        </a>
        {React.string(`上提Issue`)}
      </span>
    </Card>
    <Card key={"5"}>
      <span>
        <a href={"https://github.com/Meta3D-Technology/Meta3D/discussions"} target="_blank">
          {React.string(`论坛`)}
        </a>
        {React.string(`上寻求帮助`)}
      </span>
    </Card>
    {switch release {
    | None => React.null
    | Some({version, releaseDateUntilNow}) =>
      <>
        <Typography.Title level=5> {React.string({j`Meta3D ${version}`})} </Typography.Title>
        <Typography.Title level=5>
          {React.string(
            releaseDateUntilNow == 0
              ? {j`今天`}
              : j`${releaseDateUntilNow->IntUtils.intToString}天前` ++ {j`更新`},
          )}
        </Typography.Title>
      </>
    }}
  </>
}
