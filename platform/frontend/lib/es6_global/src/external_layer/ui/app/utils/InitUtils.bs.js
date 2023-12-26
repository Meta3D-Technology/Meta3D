


function getBackendEnv(env) {
  if (env === "production") {
    return "meta3d-production-5eol5gce9a6b9c";
  } else {
    return "meta3d-local-9gacdhjl439cff76";
  }
}

export {
  getBackendEnv ,
}
/* No side effect */
