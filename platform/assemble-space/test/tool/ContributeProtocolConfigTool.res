let buildProtocolConfig = (
  ~name="",
  ~version="",
  ~username="",
  ~configStr="",
  (),
): FrontendUtils.BackendCloudbaseType.protocolConfig => {
  name: name,
  version: version,
  username: username,
  configStr: configStr,
}
