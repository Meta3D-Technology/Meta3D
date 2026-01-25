import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-mod-career-publish-to-game-protocol"
import { eventName, inputData } from "meta3d-action-mod-career-publish-to-game-protocol/src/EventType"
// import { nullable, strictNullable } from "meta3d-commonlib-ts/src/nullable"
// import { readAccount } from "meta3d-user-utils/src/Main"
import { actionName as addCareerFeatureActionName, characterType, state as addCareerFeatureState } from "meta3d-action-mod-career-add-careerfeature-protocol"
import { actionName as selectCharacterTypeActionName, state as selectCharacterTypeState } from "meta3d-action-mod-career-selectcharactertype-protocol"
import { actionName as loadModPreviewActionName, state as loadModPreviewState } from "meta3d-action-mod-career-load-modpreview-protocol"
import { actionName as loadCareerPreviewActionName, state as loadCareerPreviewState } from "meta3d-action-mod-career-load-careerpreview-protocol"

//TODO duplicate
let _isCharacterTypeEqual = (characterType1: characterType, characterType2: characterType) => {
    if (characterType1 == characterType.GiantessOrLittleMan
        || characterType2 == characterType.GiantessOrLittleMan
    ) {
        return true
    }

    return characterType1 == characterType2
}

// let _base64ToUint8Array = (base64String) => {
//     // 移除 data URL 前缀
//     const base64 = base64String.replace(/^data:image\/\w+;base64,/, '');

//     // 解码 Base64
//     const binaryString = atob(base64);

//     // 使用 TextEncoder 转换为字节
//     const encoder = new TextEncoder();
//     return encoder.encode(binaryString);
// }
let _base64ToUint8Array = (base64String) => {
    if (base64String.length == 0) {
        return Promise.resolve(new Uint8Array())
    }

    // 获取 Base64 数据（移除前缀）
    const base64Data = base64String.split(',')[1] || base64String;

    // 将 Base64 转为 Blob，再转为 ArrayBuffer
    // const response = await fetch(`data:image/jpeg;base64,${base64Data}`);
    // const arrayBuffer = await response.arrayBuffer();

    // 转为 Uint8Array
    // return new Uint8Array(arrayBuffer);

    return fetch(`data:image/jpeg;base64,${base64Data}`).then(response => response.arrayBuffer()).then(arrayBuffer => new Uint8Array(arrayBuffer))
}

let _buildFeatures = (features) => {
    return JSON.stringify(features.reduce((object, { name, values }) => {
        object[name] = values.count() == 1 ? values.first() : values.toArray()

        return object
    }, {}))
}

let _buildDistFileContent = (state, characterType, features) => {
    return `
    (() => { 
    // let _getTextData = () => {
    //     return {
    //         "Chinese": {
    //             "Title": "测试2" 
    //         },
    //         "English": {
    //             "Title": "Test2"
    //         }
    //     };
    // };

    window.Mod = {
        createBlockState: (api) => {
            return {};
        },
        getBlockService: (api) => {
            return {
                getCareerData: (api, state) => {
                    return {
                        // title: api.getLanguageDataByData(state, _getTextData(), "Title"),
                        title: "${state.displayName_cn}",
                        iconId: "${_buildIconId(state)}",
                        needGem: 2000,
                        getCareerFeatureData: (state) => api.MutableRecordUtils.createFromObject(${_buildFeatures(features)}),
                    };
                },
                getCharacterType: () => ${characterType}
            };
        }
    };
})();
    `
}

let _buildUniqueName = (state: state) => {
    // return `${state.author}_${state.displayName_cn}_${state.displayName_en}`
    return `${state.author}_${state.displayName_cn}`
}

let _buildIconId = (state: state) => {
    return `${_buildUniqueName(state)}_icon`
}

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState) => {
                    let characterType_ = api.action.getActionState<selectCharacterTypeState>(meta3dState, selectCharacterTypeActionName).characterType
                    let features = api.action.getActionState<addCareerFeatureState>(meta3dState, addCareerFeatureActionName).allSelectedCareerFeatureData.filter(d => {
                        return _isCharacterTypeEqual(d.characterType, characterType_)
                    })

                    let assetIconBase64 = api.action.getActionState<loadModPreviewState>(meta3dState, loadModPreviewActionName).preview
                    let careerIconBase64 = api.action.getActionState<loadCareerPreviewState>(meta3dState, loadCareerPreviewActionName).preview

                    let state = api.action.getActionState<state>(meta3dState, actionName)

                    console.log("publish mod")

                    return _base64ToUint8Array(assetIconBase64).then(uint8Array => {
                        return api.backend.publishMod(
                            // "local",
                            ` {
    "name": "${_buildUniqueName(state)}",
    "mod": {
        "protocolName": "career-protocol",
        "author": "${state.author}",
        "displayName_cn": "${state.displayName_cn}",
        "displayName_en": "${state.displayName_en}",
        "repoLink": "${state.repoLink}",
        "isPublic": ${state.isPublic},
        "dependentMods": [
        ]
    }
                        }`,
                            `${state.readme}`,
                            _buildDistFileContent(state, characterType_, features),
                            [
                                [
                                    `./${_buildIconId(state)}.png`,
                                    uint8Array
                                ],
                            ],
                            careerIconBase64
                        ).then(_ => {
                            console.log("publish success")

                            // meta3dState = api.action.setActionState<state>(meta3dState, actionName, {
                            //     ...state,
                            //     version: state.version + 1
                            // })

                            return meta3dState
                        })
                    })
                }, (meta3dState) => {
                    return Promise.resolve(meta3dState)
                }))
            })
        },
        handler: (meta3dState, uiData) => {
            return new Promise<meta3dState>((resolve, reject) => {
                let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

                resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                    name: eventName,
                    isOnlyRead: true,
                    inputData: []
                }))
            })
        },
        createState: () => {
            return {
                isShowModal: false,
                displayName_cn: "",
                displayName_en: "",
                repoLink: "",
                isPublic: false,
                author: "",
                readme: "",
                // version: "0.0.1",
            }
        }
    }
}
