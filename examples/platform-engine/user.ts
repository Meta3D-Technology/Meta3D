function buildExtensionPackage([
    [engineAPIExtensionId, ... ],
    [extensionId1, extensionConfig1: {
        isDebug:true,
    }], [extensionId2, ... ]
], [
    [contributePointId1, belongedExtensionName1, contributePointConfig1,],
    [contributePointId2, ...],
]) {
    build extension and contribute points together to one binary file!
}