let buildProtocolConfig = (
  ~name="",
  ~version="",
  ~account="",
  ~configStr="",
  (),
): CommonType.protocolConfig => {
  name: name,
  version: version,
  account: account,
  configStr: configStr,
}
