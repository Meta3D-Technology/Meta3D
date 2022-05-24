function _getAllExtensionsAndContributePoints(extensionPacakge) {
    //TODO implement
    return {} as any
}

function publishEditorWithExtensionPackage(
    startExtensionIds,
    engineForEditSceneExtensionPacakge
    engineForRunSceneExtensionPacakge
    // may contain two event extension with different extension name for edit, run scene engine!
    editorExtensionPacakge,
    ...
) {
    publishEditorWithExtensionAndContributePoints(
        startExtensionIds,
        _getAllExtensionsAndContributePoints(engineForEditSceneExtensionPacakge).concat(
            _getAllExtensionsAndContributePoints(engineForRunSceneExtensionPacakge),
            _getAllExtensionsAndContributePoints(editorExtensionPacakge),
        )
    )
}

function publishEditorWithExtensionAndContributePoints(
    // e.g. include : some extensions in editor extension package
    startExtensionIds,
    [

    ], [
    ]) {
...
}