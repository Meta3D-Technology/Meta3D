function _getAllExtensionsAndContribute(extensionPacakge) {
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
    publishAppWithExtensionAndContribute(
        startExtensionIds,
        _getAllExtensionsAndContribute(engineExtensionPacakge).concat(
            _getAllExtensionsAndContribute(scene1ExtensionPacakge),
            _getAllExtensionsAndContribute(scene2ExtensionPacakge)
        )
    )
}

function publishAppWithExtensionAndContribute(
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

        // [extensionId1, extensionName1, extensionConfig1: {
        [extensionName1, extensionGetServiceFunc, extensionCreateExtensionStateFunc, extensionConfig1: {
            isDebug:true,
        }], [extensionId2, ... ]
    ], [
        //         // e.g. init pipeline: scene1Init
        //         [work plugin for scene1, ... ],
        // // e.g. init pipeline: scene2Init
        // [work plugin for scene2, ... ],

        [work plugin for all scenes, ... ],


// [contributePointId1, belongedExtensionName1, contributePointConfig1,],
// [contributeName1 in protocol, contributeGetContributeFunc1],
[contributeName1, contributeGetContributeFunc1],
    ]) {
    let meta3dState = prepareMeta3D()

    let extensionBinary1 = getExtensionBinary(extensionId1)
    let extensionBinary2 = getExtensionBinary(extensionId2)

    /*register all extensions*/


    meta3dState =
        registerExtension(
            meta3dState,

            extensionName1,

            extensionGetServiceFunc,

            TODO handle dependency map:
            pass by user,

            extensionCreateExtensionStateFunc()
        )

            ...

    // /*register all contribute points to extension*/

    // /* register all contribute to contribute name in protocol */
    // meta3dState =
    //     registerContribute(
    //         meta3dState,
    //         contributeName1,
    //         contributeGetContributeFunc1,
    //         // contributeConfig1
    //     )

    /* register all contribute to contribute name */
    meta3dState =
        registerContribute(
            meta3dState,
            contributeName1,
            contributeGetContributeFunc1,
            // contributeConfig1
        )



    /*start extensions of startExtensionIds in concat order*/

    start extensions

        (contribute not need start!)
}