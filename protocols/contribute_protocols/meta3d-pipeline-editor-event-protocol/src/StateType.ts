import { allPipelineData as allPipelineDataType } from "meta3d-engine-core-sceneview-protocol/src/contribute/work/PipelineContributeType"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"

export const pipelineName = "Editor_Event"

export enum pipeline {
	Init = "init",
	Update = "update"
}

export enum job {
	InitEvent = "event_init_event_meta3d",
	BindEventOne = "bind_event_once_meta3d"
}

export const allPipelineData: allPipelineDataType = [
	{
		name: pipeline.Init,
		groups: [
			{
				name: "first_event_meta3d",
				link: "concat",
				elements: [
					{
						"name": job.InitEvent,
						"type_": "job"
					},
				]
			}
		],
		first_group: "first_event_meta3d"
	},
	{
		name: pipeline.Update,
		groups: [
			{
				name: "first_event_meta3d",
				link: "concat",
				elements: [
					{
						"name": job.BindEventOne,
						"type_": "job"
					},
				]
			}
		],
		first_group: "first_event_meta3d"
	}
]

export type state = {
	mostService: mostService,
	eventService: eventService,
	isBinded: boolean
}

export type states = {
	[pipelineName]: state
}
