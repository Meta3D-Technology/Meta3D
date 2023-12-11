let getBackendEnv = (env: EnvType.env) => {
  switch env {
  | #local => "meta3d-production-5eol5gce9a6b9c"
  | #production => "meta3d-production-5eol5gce9a6b9c"
  }
}
