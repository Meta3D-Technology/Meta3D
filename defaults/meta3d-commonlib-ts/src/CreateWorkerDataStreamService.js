// import { pipe } from "meta3d-fp/src/Pipe";
export function ignore(stream, { map }) {
    return map((_) => { }, stream);
}
// TODO use pipe
function _createGetWorkerDataStream({ fromEvent, tap, filter }, operateType, worker) {
    // return pipe(
    // 	fromEvent < MessageEvent, Worker >,
    // 	filter((event) => {
    // 		return event.data.operateType === operateType;
    // 	}),
    // )("message", worker, false);
    return tap(() => {
        console.log("get worker data! operateType: ", operateType);
    }, filter((event) => {
        return event.data.operateType === operateType;
    }, fromEvent("message", worker, false)));
}
;
export function createGetMainWorkerDataStream(service, tapFunc, operateType, worker) {
    let { tap, take } = service;
    let stream = _createGetWorkerDataStream(service, operateType, worker);
    // return pipe(
    // 	(operateType: string) => _createGetWorkerDataStream(operateType, worker),
    // 	(stream) => stream.tap(tapFunc).take(1),
    // 	ignore
    // )(operateType);
    return ignore(take(1, tap(tapFunc, stream)), service);
}
;
export function createGetOtherWorkerDataStream(service, operateType, worker) {
    // return pipe(
    // 	(operateType: string) => _createGetWorkerDataStream(operateType, worker),
    // 	(stream) => stream.take(1),
    // 	ignore,
    // )(operateType);
    let { take } = service;
    let stream = _createGetWorkerDataStream(service, operateType, worker);
    return ignore(take(1, stream), service);
}
;
//# sourceMappingURL=CreateWorkerDataStreamService.js.map