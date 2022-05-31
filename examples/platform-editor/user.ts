function _getAllExtensionsAndContribute(extensionPacakge) {
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
    publishEditorWithExtensionAndContribute(
        startExtensionIds,
        _getAllExtensionsAndContribute(engineForEditSceneExtensionPacakge).concat(
            _getAllExtensionsAndContribute(engineForRunSceneExtensionPacakge),
            _getAllExtensionsAndContribute(editorExtensionPacakge),
        )
    )
}

function publishEditorWithExtensionAndContribute(
    // e.g. include : some extensions in editor extension package
    startExtensionIds,
    [

    ], [
    ]) {
...
}