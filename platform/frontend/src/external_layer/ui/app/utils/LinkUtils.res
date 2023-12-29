let openLink = url => {
  switch Window.\"open"(url, "_blank")->Meta3dCommonlib.OptionSt.fromNullable {
  | None => MessageUtils.error({j`请允许浏览器弹窗`}, None)
  | Some(windowProxy) => windowProxy.focus()
  }
}
