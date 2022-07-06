var path = require("path");

module.exports = {
    resolveSnapshotPath: (testPath, snapshotExtension) => {
        var testPath = testPath.replace("lib/js/", "");

        return path.join(
            path.join(path.dirname(testPath), '__snapshots__'),
            path.basename(testPath) + snapshotExtension,
        )
    },
    resolveTestPath: (snapshotFilePath, snapshotExtension) => {
        var snapshotFilePath = snapshotFilePath.replace("assemble-space/test", "assemble-space/lib/js/test");

        return path.resolve(
            path.dirname(snapshotFilePath),
            '..',
            path.basename(snapshotFilePath, snapshotExtension),
        )
    },
    testPathForConsistencyCheck: "/Users/yang/Github/Meta3D/platform/assemble-space/lib/js/test/step-definitions/assemble_space.steps.bs.js"
};