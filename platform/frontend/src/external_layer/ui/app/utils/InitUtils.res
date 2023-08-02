let getBackendEnv = (env: FrontendUtils.EnvType.env) => {
  switch env {
  | #local => "meta3d-production-5eol5gce9a6b9c"
  | #production => "meta3d-production-5eol5gce9a6b9c"
  }
}
