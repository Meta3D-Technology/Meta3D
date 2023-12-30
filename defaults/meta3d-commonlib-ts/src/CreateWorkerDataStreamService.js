"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGetOtherWorkerDataStream = exports.createGetMainWorkerDataStream = exports.ignore = void 0;
// import { pipe } from "meta3d-fp/src/Pipe";
let ignore = (stream, { map }) => {
    return map((_) => { }, stream);
};
exports.ignore = ignore;
// TODO use pipe
let _createGetWorkerDataStream = ({ fromEvent, tap, filter }, operateType, worker) => {
    // return pipe(
    // 	fromEvent < MessageEvent, Worker >,
    // 	filter((event) => {
    // 		return event.data.operateType === operateType;
    // 	}),
    // )("message", worker, false);
    return tap(() => {
        //console.log("get worker data! operateType: ", operateType)
    }, filter((event) => {
        return event.data.operateType === operateType;
    }, fromEvent("message", worker, false)));
};
let createGetMainWorkerDataStream = (service, tapFunc, operateType, worker) => {
    let { tap, take } = service;
    let stream = _createGetWorkerDataStream(service, operateType, worker);
    // return pipe(
    // 	(operateType: string) => _createGetWorkerDataStream(operateType, worker),
    // 	(stream) => stream.tap(tapFunc).take(1),
    // 	ignore
    // )(operateType);
    return (0, exports.ignore)(take(1, tap(tapFunc, stream)), service);
};
exports.createGetMainWorkerDataStream = createGetMainWorkerDataStream;
let createGetOtherWorkerDataStream = (service, operateType, worker) => {
    // return pipe(
    // 	(operateType: string) => _createGetWorkerDataStream(operateType, worker),
    // 	(stream) => stream.take(1),
    // 	ignore,
    // )(operateType);
    let { take } = service;
    let stream = _createGetWorkerDataStream(service, operateType, worker);
    return (0, exports.ignore)(take(1, stream), service);
};
exports.createGetOtherWorkerDataStream = createGetOtherWorkerDataStream;
//# sourceMappingURL=CreateWorkerDataStreamService.js.map