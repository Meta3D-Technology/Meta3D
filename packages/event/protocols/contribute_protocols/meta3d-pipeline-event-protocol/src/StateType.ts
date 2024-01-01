import { allPipelineData as allPipelineDataType } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { mostService } from "meta3d-core-protocol/src/service/ServiceType"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"

export const pipelineName = "Event"

export enum pipeline {
	Init = "init",
}

export enum job {
	InitEvent = "event_init_event_meta3d",
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
]

export type state = {
	mostService: mostService,
	eventService: eventService,
}

export type states = {
	[pipelineName]: state
}
