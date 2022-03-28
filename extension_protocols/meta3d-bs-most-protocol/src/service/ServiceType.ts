import { stream } from "./StreamType.gen";

// type eventTarget = any

// type event = any

export type service = {
    tap<a>(func: (v: a) => void, stream: stream<a>): stream<a>,
    filter<a>(func: (v: a) => boolean, stream: stream<a>): stream<a>,
    take<a>(count: number, stream: stream<a>): stream<a>,
    fromEvent<event, eventTarget>(eventName: string, eventTarget: eventTarget, _3: boolean): stream<event>,
    just<a>(val: a): stream<a>,
    concat<a>(stream1: stream<a>, stream2: stream<a>): stream<a>,
    map<a, b>(func: (v: a) => b, stream: stream<a>): stream<b>,
    flatMap<a, b>(func: (v: a) => stream<b>, stream: stream<a>): stream<b>,
    mergeArray<a>(streams: Array<stream<a>>): stream<a>,
    concatArray<a>(streams: Array<stream<a>>): stream<a>,
    callFunc<a>(func: () => a): stream<a>,
    drain<a>(stream: stream<a>): Promise<void>
};
