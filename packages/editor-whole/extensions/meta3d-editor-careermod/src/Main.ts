import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api, canvasData } from "meta3d-type"
import { state } from "meta3d-editor-whole-protocol/src/state/StateType"
import { configData, service } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { service as eventService, eventSourcingService, eventDataService } from "meta3d-event-protocol/src/service/ServiceType"
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils"
import { skinContribute } from "meta3d-ui-protocol/src/contribute/SkinContributeType"
import { contributeType } from "meta3d-type/src/contribute/ContributeType"
import { uiControlContribute } from "meta3d-ui-protocol/src/contribute/UIControlContributeType"
import { reducePromise } from "meta3d-structure-utils/src/ArrayUtils"
import { elementState } from "meta3d-ui-protocol/src/state/StateType"
import { elementContribute } from "meta3d-ui-protocol/src/contribute/ElementContributeType"
// import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
// import { init, update, render } from "meta3d-whole-utils/src/DirectorAPI"
import { skin } from "meta3d-skin-protocol"
import { inputContribute } from "meta3d-ui-protocol/src/contribute/InputContributeType"

// let _getBackendEnv = (env: string) => {
// 	switch (env) {
// 		case "production":
// 			return "meta3d-production-5eol5gce9a6b9c"
// 		case "local":
// 		default:
// 			return "meta3d-local-9gacdhjl439cff76"
// 	}
// }

// let _registerPipelines = (
// 	meta3dState: meta3dState, api: api,
// ) => {
// 	let engineCoreService = getExn(api.getPackageService<coreService>(
// 		meta3dState,
// 		"meta3d-core-protocol"
// 	)).engineCore(meta3dState)


// 	let { registerPipeline } = engineCoreService

// 	meta3dState = registerPipeline(meta3dState, api.getContribute<pipelineContribute<eventConfig, eventState>>(meta3dState, "meta3d-pipeline-event-protocol"),
// 		null,
// 		[
// 			{
// 				pipelineName: pipelineRootPipeline.Init,
// 				insertElementName: pipelineRootJob.Init,
// 				insertAction: "after"
// 			}
// 		]
// 	)

// 	return meta3dState
// }

// let _prepare = (meta3dState: meta3dState, api: api, isDebug, ecsConfig) => {
// 	meta3dState = getExn(api.getPackageService<coreService>(
// 		meta3dState,
// 		"meta3d-core-protocol"
// 	)).engineBasic(meta3dState).prepare(meta3dState, isDebug)

// 	let engineSceneService = getExn(api.getPackageService<engineSceneService>(
// 		meta3dState,
// 		"meta3d-engine-scene-protocol"
// 	))

// 	meta3dState = engineSceneService.prepare(meta3dState, isDebug, ecsConfig)



// 	meta3dState = _registerPipelines(
// 		meta3dState, api,
// 	)

// 	return meta3dState
// }

let _prepareUIForVisual = (meta3dState: meta3dState, api: api) => {
	let { registerSkin } = getExn(api.getPackageService<uiService>(meta3dState, "meta3d-ui-protocol"))

	meta3dState = api.getAllContributesByType<skinContribute<any>>(meta3dState, contributeType.Skin).reduce<meta3dState>((meta3dState, contribute) => {
		return registerSkin(meta3dState, contribute)
	}, meta3dState)

	return Promise.resolve(meta3dState)
}

// let _prepareForVisual = (meta3dState: meta3dState,
// 	api: api, isDebug
// ) => {
// 	return Promise.resolve(_prepare(meta3dState, api, isDebug,
// 		{
// 			float9Array1: new Float32Array(9),
// 			float32Array1: new Float32Array(16),
// 			transformCount: 10,
// 			geometryCount: 10,
// 			geometryPointCount: 100,
// 			pbrMaterialCount: 10
// 		},
// 	))
// }

// let _prepareAndInitEngine = (meta3dState: meta3dState,
// 	api: api, isDebug
// ) => {
// 	meta3dState = _prepare(meta3dState, api, isDebug,
// 		{
// 			float9Array1: new Float32Array(9),
// 			float32Array1: new Float32Array(16),
// 			transformCount: 100000,
// 			geometryCount: 100000,
// 			geometryPointCount: 10000000,
// 			pbrMaterialCount: 100000
// 		},
// 	)

// 	let engineCoreService = getExn(api.getPackageService<coreService>(
// 		meta3dState,
// 		"meta3d-core-protocol"
// 	)).engineCore(meta3dState)

// 	meta3dState = engineCoreService.init(meta3dState)


// 	return init(api, meta3dState)
// }


let _registerAllUIControls = (meta3dState: meta3dState, api: api): meta3dState => {
	let { registerUIControl } = getExn(api.getPackageService<uiService>(meta3dState, "meta3d-ui-protocol"))


	let uiControlContributes = api.getAllContributesByType<uiControlContribute<any, any, any>>(meta3dState, contributeType.UIControl)

	return uiControlContributes.reduce<meta3dState>((meta3dState, contribute) => {
		return registerUIControl(meta3dState, contribute)
	}, meta3dState)
}

let _initAllUIControls = (meta3dState: meta3dState, api: api): Promise<meta3dState> => {
	let uiControlContributes = api.getAllContributesByType<uiControlContribute<any, any, any>>(meta3dState, contributeType.UIControl)

	return reducePromise<meta3dState, uiControlContribute<any, any, any>>(uiControlContributes, (meta3dState, { init },) => init(meta3dState), meta3dState)
}

let _prepareInputs = (meta3dState: meta3dState, api: api): meta3dState => {
	let { registerInput } = getExn(api.getPackageService<uiService>(meta3dState, "meta3d-ui-protocol"))


	let inputContributes = api.getAllContributesByType<inputContribute<any>>(meta3dState, contributeType.Input)

	meta3dState = inputContributes.reduce<meta3dState>((meta3dState, contribute) => {
		return registerInput(meta3dState, contribute)
	}, meta3dState)

	return meta3dState
}

let _initUI = (meta3dState: meta3dState, api: api, uiService: uiService, isDebug: boolean, canvas: HTMLCanvasElement) => {
	return uiService.init(meta3dState, [api, "meta3d-imgui-renderer-protocol"], true, isDebug, canvas).then(meta3dState => {
		return _registerAllUIControls(meta3dState, api)
	}).then(meta3dState => {
		/*! invoke render so that can invoke loadImage after _initUI 
		* 
		*/
		return uiService.render(meta3dState, ["meta3d-ui-protocol", "meta3d-imgui-renderer-protocol"], 0.)
	})
}

let _initForVisual = (meta3dState: meta3dState, api: api, { isDebug, canvas }) => {
	return _prepareUIForVisual(meta3dState, api).then(meta3dState => {
		let uiService = getExn(api.getPackageService<uiService>(meta3dState, "meta3d-ui-protocol"))

		return _initUI(meta3dState, api, uiService, isDebug, canvas)
			// .then(meta3dState => {
			// 	return _prepareForVisual(meta3dState,
			// 		// uiService.getContext(meta3dState),
			// 		api,
			// 		isDebug
			// 	)
			// })
			.then(meta3dState => {
				meta3dState = _prepareInputs(meta3dState, api)

				return _initAllUIControls(meta3dState, api)
			})
	})
}

// let _registerAllActions = (meta3dState: meta3dState, api: api): meta3dState => {
// 	let { registerAction } = getExn(api.getPackageService<eventService>(meta3dState, "meta3d-event-protocol"))

// 	let actionContributes = api.getAllContributesByType<actionContribute<any, any>>(meta3dState, contributeType.Action)

// 	return actionContributes.reduce<meta3dState>((meta3dState, contribute) => {
// 		return registerAction(meta3dState, contribute)
// 	}, meta3dState)
// }

// let _initAllActions = (meta3dState: meta3dState, api: api): Promise<meta3dState> => {
// 	let actionContributes = api.getAllContributesByType<actionContribute<any, any>>(meta3dState, contributeType.Action)

// 	return reducePromise<meta3dState, actionContribute<any, any>>(actionContributes, (meta3dState, { init },) => init(meta3dState), meta3dState)
// }


let _prepareUIForVisualRun = (meta3dState: meta3dState, api: api) => {
	let { registerSkin, registerElement } = getExn(api.getPackageService<uiService>(meta3dState, "meta3d-ui-protocol"))

	meta3dState = api.getAllContributesByType<skinContribute<any>>(meta3dState, contributeType.Skin).reduce<meta3dState>((meta3dState, contribute) => {
		return registerSkin(meta3dState, contribute)
	}, meta3dState)


	meta3dState = registerElement<elementState>(meta3dState,
		api.getContribute<elementContribute<elementState>>(meta3dState, "meta3d-element-assemble-element-protocol")
	)

	return Promise.resolve(meta3dState)
}

let _initForVisualRun = (meta3dState: meta3dState, api: api, { isDebug, canvas }) => {
	return _prepareUIForVisualRun(meta3dState, api).then(meta3dState => {
		let uiService = getExn(api.getPackageService<uiService>(meta3dState, "meta3d-ui-protocol"))

		// meta3dState = _registerAllActions(meta3dState, api)

		return _initUI(meta3dState, api, uiService, isDebug, canvas)
			// .then(meta3dState => {
			// 	return _initAllActions(meta3dState, api)
			// })
			// .then(meta3dState => {
			// 	return _prepareAndInitEngine(meta3dState,
			// 		api,
			// 		isDebug
			// 	)
			// })
			.then(meta3dState => {
				meta3dState = _prepareInputs(meta3dState, api)

				return _initAllUIControls(meta3dState, api)
			})
	})
}

// let _execAllInitFuncs = (meta3dState, initFuncs, initData) => {
// 	// let _func = (meta3dState, index) => {
// 	// 	if (index < 0) {
// 	// 		return Promise.resolve(meta3dState)
// 	// 	}

// 	// 	let initFunc = getExn(initFuncs.get(index))

// 	// 	return initFunc(meta3dState, initData).then(meta3dState => {
// 	// 		return _func(meta3dState, index - 1)
// 	// 	})
// 	// }

// 	// return _func(meta3dState, initFuncs.count() - 1)

// 	return reducePromise<meta3dState, initFunc>(initFuncs.toArray(), (meta3dState, initFunc) => initFunc(meta3dState, initData), meta3dState)
// }

// let _loopEngine = (meta3dState: meta3dState, api: api) => {
// 	return update(api, meta3dState).then(meta3dState => render(api, meta3dState))
// }

// let _exportEventDataForDebug = (meta3dState: meta3dState, eventSourcingService: eventSourcingService, eventDataService: eventDataService) => {
// 	eventDataService.exportEventData(
// 		eventSourcingService.getAllEventsFromGlobalThis(meta3dState).toArray()
// 	)
// }

let _handleError = (api: api, e: Error, meta3dState: meta3dState) => {
	// // if ((e as any).errorType === "script") {
	// // 	return
	// // }

	// let eventService = getExn(api.getPackageService<eventService>(meta3dState, "meta3d-event-protocol"))

	// _exportEventDataForDebug(
	// 	meta3dState,
	// 	eventService.eventSourcing(meta3dState),
	// 	eventService.eventData(meta3dState),
	// )
}

let _updateForVisual = (meta3dState, api: api, { clearColor, time, skinName }) => {
	let { getSkin, render, clear, setStyle } = getExn(api.getPackageService<uiService>(meta3dState, "meta3d-ui-protocol"))
	// let { triggerCustomGlobalEvent3, createCustomEvent } = getExn(api.getPackageService<eventService>(meta3dState, "meta3d-event-protocol"))

	if (!isNullable(skinName)) {
		let skin = getSkin<skin>(meta3dState, getExn(skinName))
		if (!isNullable(skin)) {
			meta3dState = setStyle(meta3dState, getExn(skin).skin.style)
		}
	}

	meta3dState = clear(meta3dState, [api, "meta3d-imgui-renderer-protocol"], clearColor)

	// return triggerCustomGlobalEvent3(meta3dState,
	// 	"meta3d-event-protocol",
	// 	createCustomEvent(getBeforeRenderEventName(), api.nullable.getEmpty())
	// ).then(meta3dState => {
	// 	return render(meta3dState, ["meta3d-ui-protocol", "meta3d-imgui-renderer-protocol"], time)
	// }).catch(e => {
	// 	_handleError(api, e, meta3dState)
	// 	throw e
	// })
	return render(meta3dState, ["meta3d-ui-protocol", "meta3d-imgui-renderer-protocol"], time)
		.catch(e => {
			_handleError(api, e, meta3dState)
			throw e
		})
}

let _updateForVisualRun = (meta3dState, api: api, { clearColor, time, skinName }) => {
	let { getSkin, render, clear, setStyle } = getExn(api.getPackageService<uiService>(meta3dState, "meta3d-ui-protocol"))
	// let { triggerCustomGlobalEvent3, createCustomEvent } = getExn(api.getPackageService<eventService>(meta3dState, "meta3d-event-protocol"))

	if (!isNullable(skinName)) {
		let skin = getSkin<skin>(meta3dState, getExn(skinName))
		if (!isNullable(skin)) {
			meta3dState = setStyle(meta3dState, getExn(skin).skin.style)
		}
	}

	meta3dState = clear(meta3dState, [api, "meta3d-imgui-renderer-protocol"], clearColor)

	// return triggerCustomGlobalEvent3(meta3dState,
	// 	"meta3d-event-protocol",
	// 	createCustomEvent(getBeforeRenderEventName(), api.nullable.getEmpty())
	// ).then(meta3dState => {
	// 	return render(meta3dState, ["meta3d-ui-protocol", "meta3d-imgui-renderer-protocol"], time)
	// }).then(meta3dState => {
	// 	return sync(meta3dState, api)
	// }).then(meta3dState => {
	// 	return _loopEngine(meta3dState, api)
	// }).catch(e => {
	// 	_handleError(api, e, meta3dState)
	// 	throw e
	// })
	return render(meta3dState, ["meta3d-ui-protocol", "meta3d-imgui-renderer-protocol"], time)
		.catch(e => {
			_handleError(api, e, meta3dState)
			throw e
		})
}

// let _updateForRun = _updateForVisualRun

let _prepareUIForRun = (meta3dState: meta3dState, api: api) => {
	let { registerSkin, registerElement } = getExn(api.getPackageService<uiService>(meta3dState, "meta3d-ui-protocol"))

	meta3dState = api.getAllContributesByType<skinContribute<any>>(meta3dState, contributeType.Skin).reduce<meta3dState>((meta3dState, contribute) => {
		return registerSkin(meta3dState, contribute)
	}, meta3dState)

	meta3dState = api.getAllContributesByType<elementContribute<any>>(meta3dState, contributeType.Element).reduce<meta3dState>((meta3dState, contribute) => {
		return registerElement(meta3dState, contribute)
	}, meta3dState)

	return Promise.resolve(meta3dState)
}

let _createAndInsertCanvas = ({ width, height }: canvasData) => {
	let canvas = document.createElement("canvas") as HTMLCanvasElement;

	canvas.width = width
	canvas.style.width = width + "px"
	canvas.height = height
	canvas.style.height = height + "px"

	let body = document.getElementsByTagName("body")[0];
	body.appendChild(canvas);

	return canvas
}

let _initForRun = (meta3dState: meta3dState, api: api, [_, { isDebug }]: configData, canvas: HTMLCanvasElement) => {
	return _prepareUIForRun(meta3dState, api).then(meta3dState => {
		let uiService = getExn(api.getPackageService<uiService>(meta3dState, "meta3d-ui-protocol"))

		// meta3dState = _registerAllActions(meta3dState, api)

		return _initUI(meta3dState, api, uiService, isDebug, canvas)
			// .then(meta3dState => {
			// 	return _initAllActions(meta3dState, api)
			// })
			// .then(meta3dState => {
			// 	return _prepareAndInitEngine(meta3dState,
			// 		api,
			// 		isDebug
			// 	)
			// })
			.then(meta3dState => {
				meta3dState = _prepareInputs(meta3dState, api)

				return _initAllUIControls(meta3dState, api)
			})
	})
}

// let _loop = (
// 	api: api, meta3dState: meta3dState,
// 	time: number,
// 	configData: configData
// ) => {
// 	let [_, { skinName, clearColor }] = configData

// 	return _updateForRun(meta3dState, api, { clearColor, time, skinName }).then(meta3dState => {
// 		requestAnimationFrame(
// 			(time) => {
// 				_loop(api, meta3dState,
// 					time,
// 					configData)
// 			}
// 		)
// 	})
// }

// let _initBackend = (api: api, meta3dState, env) => {
// 	return api.backend.init(
// 		_getBackendEnv(env)
// 	).then(() => {
// 		return meta3dState
// 	})
// }

export let getExtensionService: getExtensionServiceMeta3D<
	service
> = (api) => {
	return {
		// scene: meta3dState => getExn(api.getPackageService<engineSceneService>(meta3dState, "meta3d-engine-scene-protocol")),
		ui: meta3dState => getExn(api.getPackageService<uiService>(meta3dState, "meta3d-ui-protocol")),
		event: meta3dState => getExn(api.getPackageService<eventService>(meta3dState, "meta3d-event-protocol")),
		// core: meta3dState => getExn(api.getPackageService<coreService>(meta3dState, "meta3d-core-protocol")),
		// asset: meta3dState => getExn(api.getPackageService<assetService>(meta3dState, "meta3d-asset-protocol")),
		// lib: meta3dState => getExn(api.getPackageService<libService>(meta3dState, "meta3d-lib-protocol")),
		// // interact: meta3dState => getExn(api.getPackageService<interactService>(meta3dState, "meta3d-interact-protocol")),

		// addGroup: (meta3dState, scene) => {
		// 	return api.nullable.getExn(api.getPackageService<threeService>(meta3dState, "meta3d-three-protocol")).converter(meta3dState).addGroup(meta3dState, scene)
		// },
		// cleanScene: (meta3dState) => {
		// 	return api.getExtensionService<importSceneService>(meta3dState, "meta3d-import-scene-protocol").cleanScene(meta3dState)
		// },
		// importScene: (meta3dState, sceneGLB) => {
		// 	return api.getExtensionService<importSceneService>(meta3dState, "meta3d-import-scene-protocol").import(meta3dState, sceneGLB)
		// },
		// exportScene: ([onFinishFunc, onErrorFunc], meta3dState) => {
		// 	return api.getExtensionService<exportSceneService>(meta3dState, "meta3d-export-scene-protocol").export([onFinishFunc, onErrorFunc], meta3dState)
		// },
		init: (meta3dState, initData) => {
			switch (initData.target) {
				case "visual":
					return _initForVisual(meta3dState, api, initData)
				case "visualRun":
					return _initForVisualRun(meta3dState, api, initData)
				default:
					throw new Error("error")
			}

			// return _execAllInitFuncs(meta3dState, api.getExtensionState<state>(meta3dState, "meta3d-editor-whole-protocol").initFuncs, initData).then(meta3dState => {
			// 	switch (initData.target) {
			// 		case "visual":
			// 			return _initForVisual(meta3dState, api, initData)
			// 		case "visualRun":
			// 			return _initForVisualRun(meta3dState, api, initData)
			// 		default:
			// 			throw new Error("error")
			// 	}
			// }).then(meta3dState => {
			// 	let env = initData.env

			// 	// meta3dState = api.setExtensionState<state>(meta3dState, "meta3d-editor-whole-protocol", {
			// 	// 	...api.getExtensionState<state>(meta3dState, "meta3d-editor-whole-protocol"),
			// 	// 	env: api.nullable.return(env)
			// 	// })

			// 	return _initBackend(api, meta3dState, env)
			// }).catch(e => {
			// 	_handleError(api, e, meta3dState)
			// 	throw e
			// })
		},
		update: (meta3dState, updateData) => {
			switch (updateData.target) {
				case "visual":
					return _updateForVisual(meta3dState, api, updateData)
				case "visualRun":
					return _updateForVisualRun(meta3dState, api, updateData)
				default:
					throw new Error("error")
			}
		},
		addToInitFuncs: (meta3dState, func) => {
			let state = api.getExtensionState<state>(meta3dState, "meta3d-editor-whole-protocol")

			return api.setExtensionState(meta3dState, "meta3d-editor-whole-protocol", {
				...state,
				initFuncs: state.initFuncs.push(func)
			})
		},
		getPluggablePackageService: (meta3dState, packageProtocolName) => {
			// TODO check packageProtocolName shouldn't be ui, engine-scene, core, ...

			return api.getPackageService(meta3dState, packageProtocolName)
		},
		run: (meta3dState: meta3dState, configData) => {
			let [canvasData, { isDebug, env }] = configData

			let canvas = _createAndInsertCanvas(canvasData)

			return _initForRun(meta3dState, api, configData, canvas)

			// _execAllInitFuncs(meta3dState, api.getExtensionState<state>(meta3dState, "meta3d-editor-whole-protocol").initFuncs, { isDebug, canvas }).then(meta3dState => {
			// 	return _initForRun(meta3dState, api, configData, canvas)
			// }).then(meta3dState => {
			// 	// meta3dState = api.setExtensionState<state>(meta3dState, "meta3d-editor-whole-protocol", {
			// 	// 	...api.getExtensionState<state>(meta3dState, "meta3d-editor-whole-protocol"),
			// 	// 	env: api.nullable.return(env)
			// 	// })

			// 	return _initBackend(api, meta3dState, env)
			// }).catch(e => {
			// 	_handleError(api, e, meta3dState)
			// 	throw e
			// }).then((meta3dState: meta3dState) => {
			// 	_loop(api, meta3dState,
			// 		0,
			// 		configData)
			// })
		},
	}
}

export let createExtensionState: createExtensionStateMeta3D<
	state
> = (meta3dState, api) => {
	return {
		initFuncs: api.immutable.createList(),
		currentAllEvents: api.immutable.createList(),
		// env: api.nullable.getEmpty()
	}
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionProtocolName) => {
	return {
		onRegister: (meta3dState, service) => {
			return meta3dState
		},
		onStart: (meta3dState, service, configData) => {
			service.run(meta3dState, configData)
		},
		onInit: (meta3dState, service, data) => {
			return service.init(meta3dState, data)
		},
		onUpdate: (meta3dState, service, data) => {
			return service.update(meta3dState, data)
		}
	}
}
