import type { List, Map } from 'immutable';
import { eventData, singleInputData, outsideData, outsideDataId } from '../service/ServiceType';

export type state = {
    events: List<eventData<Array<singleInputData>>>,
    outsideData: Map<outsideDataId, outsideData>
}