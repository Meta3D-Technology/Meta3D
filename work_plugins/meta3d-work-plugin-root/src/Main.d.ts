import { workPluginContribute } from "meta3d-engine-core-protocol/src/contribute_points/work/WorkPluginContributeType";
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"

type state = any

type states = any

type config = mostService

export function getWorkPluginContribute(mostService: mostService): workPluginContribute<state, states>