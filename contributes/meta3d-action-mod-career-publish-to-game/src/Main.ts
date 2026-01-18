import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-mod-career-publish-to-game-protocol"
import { eventName, inputData } from "meta3d-action-mod-career-publish-to-game-protocol/src/EventType"
// import { nullable, strictNullable } from "meta3d-commonlib-ts/src/nullable"
// import { readAccount } from "meta3d-user-utils/src/Main"

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
    // 获取 Base64 数据（移除前缀）
    const base64Data = base64String.split(',')[1] || base64String;

    // 将 Base64 转为 Blob，再转为 ArrayBuffer
    // const response = await fetch(`data:image/jpeg;base64,${base64Data}`);
    // const arrayBuffer = await response.arrayBuffer();

    // 转为 Uint8Array
    // return new Uint8Array(arrayBuffer);

    return fetch(`data:image/jpeg;base64,${base64Data}`).then(response => response.arrayBuffer()).then(arrayBuffer => new Uint8Array(arrayBuffer))
}

let _buildDistFileContent = () => {
    return `
    (() => { 
    let _getTextData = () => {
        return {
            "Chinese": {
                "Title": "测试1" 
            },
            "English": {
                "Title": "Test1"
            }
        };
    };

    window.Mod = {
        createBlockState: (api) => {
            return {};
        },
        getBlockService: (api) => {
            return {
                getCareerData: (api, state) => {
                    return {
                        title: api.getLanguageDataByData(state, _getTextData(), "Title"),
                        iconId: "career_test1_icon",
                        needGem: 2000,
                        getCareerFeatureData: (state) => api.MutableRecordUtils.createFromObject({
                            [api.getCareerFeatureName(api, state, "career-feature-increasefullhp")]: 2.0,
                            [api.getCareerFeatureName(api, state, "career-feature-increasedamagebycoin")]: 1.0
                        }),
                    };
                },
                getCharacterType: () => 1
            };
        }
    };
})();
    `
}

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState,) => {
                    const assetIconBase64 = `data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjAtYzA2MCA2MS4xMzQ3NzcsIDIwMTAvMDIvMTItMTc6MzI6MDAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzUgTWFjaW50b3NoIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkE4OThCRDQzNTg1MjExRTBBMTY4QzIzN0YzNTY3QTJGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkE4OThCRDQ0NTg1MjExRTBBMTY4QzIzN0YzNTY3QTJGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N0MyQjM1MjY1ODRGMTFFMEExNjhDMjM3RjM1NjdBMkYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTg5OEJENDI1ODUyMTFFMEExNjhDMjM3RjM1NjdBMkYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYG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`
                    console.log("publish mod")

                    return _base64ToUint8Array(assetIconBase64).then(uint8Array => {
                        return api.backend.publishMod(
                            // "local",
                            ` {
    "name": "career-test2",
    "version": "0.0.7",
    "mod": {
        "protocolName": "career-protocol",
        "author": "Official",
        "displayName_cn": "职业（测试2-1）",
        "displayName_en": "Career(Test 2-1)",
        "repoLink": "",
        "isPublic": false,
        "dependentMods": [
            "career-feature-increasefullhp",
            "career-feature-increasedamagebycoin",
            "career-feature-reducedamagebutincreasewhendamaged"
        ]
    }
                        }`,
                            `readme`,
                            _buildDistFileContent(),
                            [
                                [
                                    "./career_test1_icon.jpg",
                                    uint8Array
                                ]
                            ],
                            `data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjAtYzA2MCA2MS4xMzQ3NzcsIDIwMTAvMDIvMTItMTc6MzI6MDAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzUgTWFjaW50b3NoIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjdDMkIzNTI0NTg0RjExRTBBMTY4QzIzN0YzNTY3QTJGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjdDMkIzNTI1NTg0RjExRTBBMTY4QzIzN0YzNTY3QTJGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N0MyQjM1MjI1ODRGMTFFMEExNjhDMjM3RjM1NjdBMkYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6N0MyQjM1MjM1ODRGMTFFMEExNjhDMjM3RjM1NjdBMkYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYG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`
                        ).then(_ => {
                            console.log("publish success")
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
        createState: () => null
    }
}
