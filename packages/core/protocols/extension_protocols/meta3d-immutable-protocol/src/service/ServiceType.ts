import type { List, Map } from 'immutable';

export type service = {
	createList<T>(): List<T>,
	createListOfData<T>(data: Array<T>): List<T>,
	createMap<K, V>(): Map<K, V>,
	createMapOfData<K extends string, V>(data: Record<K, V>): Map<K, V>,
}
