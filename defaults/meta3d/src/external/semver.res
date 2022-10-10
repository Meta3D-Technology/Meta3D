type version = string

type versionRange = string

@module("semver")
external satisfies: (version, versionRange) => bool = ""

@module("semver")
external minVersion: versionRange => version = ""

@module("semver")
external gt: (version, version) => bool = ""
