import type { List, Map } from 'immutable';
import { eventData, singleInputData, outsideImmutableData, outsideImmutableDataId } from '../service/ServiceType';

export type events = List<eventData<Array<singleInputData>>>

export type state = {
    events: events,
    needReplaceAllEvents: events,
    needBackwardEvents: events,
    outsideImmutableData: Map<outsideImmutableDataId, outsideImmutableData>,
}