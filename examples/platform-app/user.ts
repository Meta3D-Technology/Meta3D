function _getAllExtensionsAndContributePoints(extensionPacakge) {
    //TODO implement
    return {} as any
}

function publishAppWithExtensionPackage(
    startExtensionIds,
    engineExtensionPacakge
    scene1ExtensionPacakge,
    scene2ExtensionPacakge,
    ...

) {
    publishAppWithExtensionAndContributePoints(
        startExtensionIds,
        _getAllExtensionsAndContributePoints(engineExtensionPacakge).concat(
            _getAllExtensionsAndContributePoints(scene1ExtensionPacakge),
            _getAllExtensionsAndContributePoints(scene2ExtensionPacakge)
        )
    )
}

function publishAppWithExtensionAndContributePoints(
    // e.g. scene1ExtensionPacakge, include :
    // [createScene1ExtensionId, ... ],
    //// [work plugin for scene1, ... ],
    startExtensionIds,
    [
        [createScene1ExtensionId, ... ],
        [createScene2ExtensionId, ... ],
        [engineAPIExtensionId, ... ],

        //// init, loop engine
        //// [startEngineExtensionId, ... ],

        [extensionId1, extensionName1, extensionConfig1: {
            isDebug:true,
        }], [extensionId2, ... ]
    ], [
        //         // e.g. init pipeline: scene1Init
        //         [work plugin for scene1, ... ],
        // // e.g. init pipeline: scene2Init
        // [work plugin for scene2, ... ],

        [work plugin for all scenes, ... ],


[contributePointId1, belongedExtensionName1, contributePointConfig1,],
    [contributePointId2, ...],
    ]) {
    let meta3dState = prepareMeta3D()

    let extensionBinary1 = getExtensionBinary(extensionId1)
    let extensionBinary2 = getExtensionBinary(extensionId2)

    /*register all extensions*/


    meta3dState =
        registerExtension(
            meta3dState,

            // _getExtensionName(extensionId1),
            extensionName1,

            _getGetExtensionServiceFunc(extensionId1),
            TODO handle dependency map:
            pass by user,
            _getCreateExtensionStateFunc(extensionId1)()
        )

            ...

    /*register all contribute points to extension*/
    ...



    /*start extensions of startExtensionIds in concat order*/

    exec start extensions

        (contribute points not need exec!)
}