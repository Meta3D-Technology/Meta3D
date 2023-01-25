type version = string

type versionRange = string

@module("semver")
external satisfies: (version, versionRange) => bool = "satisfies"

@module("semver")
external minVersion: versionRange => version = "minVersion"

@module("semver")
external gt: (version, version) => bool = "gt"

@module("semver")
external eq: (version, version) => bool = "eq"
