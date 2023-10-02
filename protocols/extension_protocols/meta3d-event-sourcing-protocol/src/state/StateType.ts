import type { List, Map } from 'immutable';
import { eventData, singleInputData, outsideData, outsideDataId } from '../service/ServiceType';

export type events = List<eventData<Array<singleInputData>>>

export type state = {
    events: events,
    outsideData: Map<outsideDataId, outsideData>,
}