type version = string

type versionRange = string

type release = [#major | #premajor | #minor | #preminor | #patch | #prepatch | #prerelease]

@module("semver")
external satisfies: (version, versionRange) => bool = "satisfies"

@module("semver")
external minVersion: versionRange => version = "minVersion"

@module("semver")
external gt: (version, version) => bool = "gt"

@module("semver")
external gte: (version, version) => bool = "gte"

@module("semver")
external eq: (version, version) => bool = "eq"

@module("semver")
external inc: (version, release) => version = "inc"
