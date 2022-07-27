var path = require("path");
var os = require('os')

let _getConfigData = () => {
    const platform = os.platform()

    switch (platform) {
        case 'darwin':
            return {
                forResolveSnapshotPath: "lib/js",
                forResolveTestPath: [
                    "assemble-space/test", "assemble-space/lib/js/test"
                ],
                testPathForConsistencyCheck: "/Users/yang/Github/Meta3D/platform/assemble-space/lib/js/test/step-definitions/assemble_space.steps.bs.js"
            }
        case 'win32':
            return {
                forResolveSnapshotPath: "lib\\js\\",
                forResolveTestPath: [
                    "assemble-space\\test", "assemble-space\\lib\\js\\test"
                ],
                testPathForConsistencyCheck: "D:\\Users\\yang\\Github\\Meta3D\\platform\\assemble-space\\lib\\js\\test\\step-definitions\\assemble_space.steps.bs.js"
            }
        case 'linux':
        default:
            throw new Error("not support")
            break;
    }

}

module.exports = {
    resolveSnapshotPath: (testPath, snapshotExtension) => {
        var testPath = testPath.replace(_getConfigData().forResolveSnapshotPath, "");

        return path.join(
            path.join(path.dirname(testPath), '__snapshots__'),
            path.basename(testPath) + snapshotExtension,
        )
    },
    resolveTestPath: (snapshotFilePath, snapshotExtension) => {
        let [source, target] = _getConfigData().forResolveTestPath
        var snapshotFilePath = snapshotFilePath.replace(source, target);

        return path.resolve(
            path.dirname(snapshotFilePath),
            '..',
            path.basename(snapshotFilePath, snapshotExtension),
        )
    },
    testPathForConsistencyCheck: _getConfigData().testPathForConsistencyCheck
};