import { map } from "./MapType";
import { nullable } from "meta3d-commonlib-ts/src/nullable"

export type service = {
	createMap<K, V>(): map<K, V>,
	mapSet<K, V>(map: map<K, V>, key: K, value: V): map<K, V>,
	mapGet<K, V>(map: map<K, V>, key: K): nullable<V>
};
