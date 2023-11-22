import type { List, Map } from 'immutable';

export type service = {
	createList<T>(): List<T>,
	createMap<K, V>(): Map<K, V>,
}
