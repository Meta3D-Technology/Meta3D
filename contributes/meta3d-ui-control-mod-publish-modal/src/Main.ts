import { state as meta3dState, api, getContribute as getContributeMeta3D } from "meta3d-type"
import { inputFunc, specificData, outputData, uiControlName } from "meta3d-ui-control-mod-publish-modal-protocol"
import { service as eventSourcingService } from "meta3d-event-protocol/src/service/ServiceType"
import { service, uiControlContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { getLanguageTextData } from "meta3d-language-utils/src/Main"
import { languageKey } from "meta3d-language-utils/src/Type"
import { importImage } from "meta3d-file-ts-utils/src/ImportFileUtils"
import { imageBase64 } from "meta3d-ui-control-image-protocol"

let _extractId = (label: string) => {
    return label.split("##")[1]
}

let _loadModIcon = (api: api): Promise<imageBase64> => {
    return new Promise((resolve, reject) => {
        importImage((image: any, result: any) => {
            if (!(image.name.includes(".png") || image.name.includes(".jpg") || image.name.includes(".jpeg"))) {
                reject(new Error("文件后缀名应该是.png或者.jpg或者.jpeg"))
            }

            resolve(api.nullable.return(result))
        }, (event: any, image: any) => {
            reject(new Error(`读取${image.name}错误：${event.target?.error.message}`))
        }, (loaded: number, total: number) => {
            // TODO show progress message
            console.log(`loading ${loaded / total} %`)
        }, () => {
            resolve(api.nullable.getEmpty())
        })
    })
}

let _loadImage = (
    meta3dState: meta3dState,
    api: api,
    image: imageBase64,
): Promise<meta3dState> => {
    let { loadImage } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

    return loadImage(meta3dState, image)
}

export let getContribute: getContributeMeta3D<uiControlContribute<inputFunc, specificData, outputData>> = (api) => {
    api.nullable
    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            _,
            rect,
            {
                label,
                initActionName,
                publishActionName,
                isShowFieldName,
                displayNameCNFieldName,
                displayNameENFieldName,
                modIconBase64FieldName,
                modIconTextureFieldName,
                isPublicFieldName,
                descriptionFieldName,
            }
        ) => {
            let initActionState = api.action.getActionState<any>(meta3dState, initActionName)

            if (api.nullable.isNullable(initActionState) || !initActionState[isShowFieldName]) {
                return Promise.resolve([meta3dState, null])
            }

            let { beginModal, endModal, openModal, closeCurrentModal, text, inputText, inputTextarea, checkbox, button, image } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

            meta3dState = openModal(meta3dState, label)

            let data = beginModal(meta3dState, label)
            meta3dState = data[0]
            let isOpen_ = data[1]

            if (isOpen_) {
                let { trigger } = api.getExtensionService<eventSourcingService>(meta3dState, "meta3d-event-protocol")

                let id = _extractId(label)

                let newDisplayNameCn
                [meta3dState, newDisplayNameCn] = inputText(meta3dState, `${getLanguageTextData(api, meta3dState, initActionState.languageTextData, languageKey.DisplayNameCN)}##${id}_displayNameCN`, initActionState[displayNameCNFieldName], 50, 200)
                if (!api.nullable.isNullable(newDisplayNameCn)) {
                    meta3dState = api.action.setActionState<any>(meta3dState, initActionName, {
                        ...api.action.getActionState<any>(meta3dState, initActionName),
                        [displayNameCNFieldName]: api.nullable.getExn(newDisplayNameCn),
                    })
                }

                let newDisplayNameEn
                [meta3dState, newDisplayNameEn] = inputText(meta3dState, `${getLanguageTextData(api, meta3dState, initActionState.languageTextData, languageKey.DisplayNameEN)}##${id}_displayNameEN`, initActionState[displayNameENFieldName], 50, 200)
                if (!api.nullable.isNullable(newDisplayNameEn)) {
                    meta3dState = api.action.setActionState<any>(meta3dState, initActionName, {
                        ...api.action.getActionState<any>(meta3dState, initActionName),
                        [displayNameENFieldName]: api.nullable.getExn(newDisplayNameEn),
                    })
                }


                let newIsPlublic
                [meta3dState, newIsPlublic] = checkbox(meta3dState, `${getLanguageTextData(api, meta3dState, initActionState.languageTextData, languageKey.IsPublic)}##${id}_isPublic`, initActionState[isPublicFieldName])
                if (!api.nullable.isNullable(newIsPlublic)) {
                    meta3dState = api.action.setActionState<any>(meta3dState, initActionName, {
                        ...api.action.getActionState<any>(meta3dState, initActionName),
                        [isPublicFieldName]: api.nullable.getExn(newIsPlublic),
                    })
                }



                let isUpload
                [meta3dState, isUpload] = button(meta3dState, `${getLanguageTextData(api, meta3dState, initActionState.languageTextData, languageKey.UploadModIcon)}##${id}_uploadModIcon`, [100, 20])

                let promise
                if (isUpload) {
                    promise = _loadModIcon(api).then(modIconBase64 => {
                        if (!api.nullable.isNullable(modIconBase64)) {

                            return _loadImage(
                                meta3dState,
                                api,
                                modIconBase64
                            ).then(modIcon => {
                                return api.action.setActionState<any>(meta3dState, initActionName, {
                                    ...api.action.getActionState<any>(meta3dState, initActionName),
                                    [modIconBase64FieldName]: modIconBase64,
                                    [modIconTextureFieldName]: modIcon,
                                })
                            })
                        }

                        return meta3dState
                    })
                }
                else {
                    promise = Promise.resolve(meta3dState)
                }

                return promise.then(meta3dState => {
                    initActionState = api.action.getActionState<any>(meta3dState, initActionName)

                    if (!api.nullable.isNullable(initActionState[modIconTextureFieldName])) {
                        meta3dState = image(meta3dState, initActionState[modIconTextureFieldName], [50, 50])
                    }


                    let newDescription
                    [meta3dState, newDescription] = inputTextarea(meta3dState, `${getLanguageTextData(api, meta3dState, initActionState.languageTextData, languageKey.Description)}##${id}_description`, [500, 300], 10000, initActionState[descriptionFieldName])
                    if (!api.nullable.isNullable(newDescription)) {
                        meta3dState = api.action.setActionState<any>(meta3dState, initActionName, {
                            ...api.action.getActionState<any>(meta3dState, initActionName),
                            [descriptionFieldName]: api.nullable.getExn(newDescription),
                        })
                    }



                    let isPublish
                    [meta3dState, isPublish] = button(meta3dState, `${getLanguageTextData(api, meta3dState, initActionState.languageTextData, languageKey.PublishToGame)}##${id}_publishToGame`, [100, 20])

                    if (isPublish) {
                        return trigger(meta3dState, "meta3d-event-protocol", publishActionName, api.nullable.getEmpty())
                    }


                    let isCancel
                    [meta3dState, isCancel] = button(meta3dState, `${getLanguageTextData(api, meta3dState, initActionState.languageTextData, languageKey.Cancel)}##${id}_cancel`, [100, 20])

                    if (isCancel) {
                        meta3dState = api.action.setActionState<any>(meta3dState, initActionName, {
                            ...api.action.getActionState<any>(meta3dState, initActionName),
                            [isShowFieldName]: false
                        })
                    }


                    return meta3dState
                }).then(meta3dState => {
                    meta3dState = endModal(meta3dState)

                    return [meta3dState, null]
                })
            }

            return Promise.resolve([meta3dState, null])
        },
        init: (meta3dState) => {
            return Promise.resolve(meta3dState)
        }
    }
}
