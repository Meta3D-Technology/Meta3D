// export abstract class stream<a> { protected opaque!: a }; /* simulate opaque types */

import { stream } from "./StreamType.gen";

// import type { Stream as stream } from 'most';
// import type {stream} from 'most';

export type service = {
    just<a>(val: a): stream<a>,
    concat<a>(stream1: stream<a>, stream2: stream<a>): stream<a>,
    map<a, b>(func: (v: a) => b, stream: stream<a>): stream<b>,
    flatMap<a, b>(func: (v: a) => stream<b>, stream: stream<a>): stream<b>,
    mergeArray<a>(streams: Array<stream<a>>): stream<a>,
    concatArray<a>(streams: Array<stream<a>>): stream<a>,
    callFunc<a>(func: () => a): stream<a>,
};
