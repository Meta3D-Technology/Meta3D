let buildProtocol = (
  ~name,
  ~version,
  ~iconBase64="i1",
  ~account="meta3d",
  ~displayName="d1",
  ~repoLink="",
  ~description="dp1",
  (),
): FrontendUtils.BackendCloudbaseType.protocol => {
  name,
  version,
  iconBase64,
  account,
  displayName,
  repoLink,
  description,
}
