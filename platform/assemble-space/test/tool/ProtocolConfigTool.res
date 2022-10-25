let buildProtocolConfig = (
  ~name="",
  ~version="",
  ~account="",
  ~configStr="",
  (),
): FrontendUtils.CommonType.protocolConfig => {
  name: name,
  version: version,
  account: account,
  configStr: configStr,
}
