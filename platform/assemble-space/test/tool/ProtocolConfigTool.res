let buildProtocolConfig = (
  ~name="",
  ~version="",
  ~username="",
  ~configStr="",
  (),
): FrontendUtils.CommonType.protocolConfig => {
  name: name,
  version: version,
  username: username,
  configStr: configStr,
}
