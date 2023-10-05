import { state as meta3dState, api } from "meta3d-type"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { state as eventState } from "meta3d-event-protocol/src/state/StateType"
import { contributeType } from "meta3d-type/src/contribute/ContributeType"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
import { updateData } from "meta3d-element-assemble-visual-run-protocol/src/service/ServiceType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { skin } from "meta3d-skin-protocol"
import { isNullable, getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { service as runEngineService } from "meta3d-editor-run-engine-sceneview-protocol/src/service/ServiceType"
import { service as eventDataService } from "meta3d-event-data-protocol/src/service/ServiceType"
import { service as eventSourcingService } from "meta3d-event-sourcing-protocol/src/service/ServiceType"

let _invokeActionInit = (meta3dState: meta3dState, actionContributes: Array<actionContribute<any, any>>) => {
	let _func = (meta3dState: meta3dState, index: number): Promise<meta3dState> => {
		if (index >= actionContributes.length) {
			return Promise.resolve(meta3dState)
		}

		return actionContributes[index].init(meta3dState).then(meta3dState => {
			return _func(meta3dState, index + 1)
		})
	}

	return _func(meta3dState, 0)
}

export let prepareActions = (meta3dState: meta3dState, api: api): Promise<meta3dState> => {
	let { registerAction } = api.getExtensionService<eventService>(meta3dState, "meta3d-event-protocol")

	let eventState = api.getExtensionState<eventState>(meta3dState, "meta3d-event-protocol")


	let actionContributes = api.getAllContributesByType<actionContribute<any, any>>(meta3dState, contributeType.Action)

	eventState = actionContributes.reduce<eventState>((eventState, contribute) => {
		return registerAction(eventState, contribute)
	}, eventState)

	return _invokeActionInit(meta3dState, actionContributes).then(meta3dState => {
		meta3dState = api.setExtensionState(meta3dState, "meta3d-event-protocol", eventState)

		return meta3dState
	})
}

export let update = (meta3dState: meta3dState, api: api, { clearColor, time, skinName }: updateData) => {
	let { getSkin, render, clear, setStyle } = api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol")

	let uiState = api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol")

	if (!isNullable(skinName)) {
		let skin = getSkin<skin>(uiState, skinName)
		if (!isNullable(skin)) {
			meta3dState = setStyle(meta3dState, getExn(skin).skin.style)
		}
	}


	meta3dState = clear(meta3dState, [api, "meta3d-imgui-renderer-protocol"], clearColor)

	let runEngineService = api.getExtensionService<runEngineService>(
		meta3dState,
		"meta3d-editor-run-engine-sceneview-protocol"
	)

	return render(meta3dState, ["meta3d-ui-protocol", "meta3d-imgui-renderer-protocol"], time)
		.then(meta3dState => {
			return runEngineService.sync(meta3dState)
		})
		.then(meta3dState => {
			return runEngineService.loopEngine(meta3dState)
		})
}

// export let exportEventDataForDebug = (meta3dState: meta3dState, api: api) => {
export let exportEventDataForDebug = (eventSourcingService:eventSourcingService, eventDataService:eventDataService) => {
	eventDataService.exportEventData(
		eventSourcingService. getAllEventsFromGlobalThis().toArray()
	)
}