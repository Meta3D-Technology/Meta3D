// import type { List, Map } from 'immutable';
import type { List } from 'immutable';
// import { eventData, singleInputData, outsideImmutableData, outsideImmutableDataId } from '../service/ServiceType';
import { eventData, singleInputData} from '../service/ServiceType';

export type events = List<eventData<Array<singleInputData>>>

export type state = {
    events: events,
    needReplaceAllEvents: events,
    needBackwardEvents: events,
    // outsideImmutableData: Map<outsideImmutableDataId, outsideImmutableData>,
}