import { stream } from "meta3d-bs-most-protocol/src/service/StreamType"
import { service } from "meta3d-bs-most-protocol/src/service/ServiceType"
// import { pipe } from "meta3d-fp/src/Pipe";

export let ignore = (stream: stream<any>, { map }: service) => {
	return map((_) => { }, stream);
}

// TODO use pipe

let _createGetWorkerDataStream = ({ fromEvent, tap, filter }: service, operateType: string, worker: Worker) => {
	// return pipe(
	// 	fromEvent < MessageEvent, Worker >,
	// 	filter((event) => {
	// 		return event.data.operateType === operateType;
	// 	}),
	// )("message", worker, false);


	return tap(() => {
		//console.log("get worker data! operateType: ", operateType)
	},
		filter((event) => {
			return event.data.operateType === operateType;
		},
			fromEvent<MessageEvent, Worker>("message", worker, false)))
};

export let createGetMainWorkerDataStream = (service: service, tapFunc: (event: MessageEvent) => void, operateType: string, worker: Worker) => {
	let { tap, take } = service

	let stream = _createGetWorkerDataStream(service, operateType, worker)


	// return pipe(
	// 	(operateType: string) => _createGetWorkerDataStream(operateType, worker),
	// 	(stream) => stream.tap(tapFunc).take(1),
	// 	ignore
	// )(operateType);

	return ignore(take(1, tap(tapFunc, stream)), service)
};

export let createGetOtherWorkerDataStream = (service: service, operateType: string, worker: Worker) => {
	// return pipe(
	// 	(operateType: string) => _createGetWorkerDataStream(operateType, worker),
	// 	(stream) => stream.take(1),
	// 	ignore,
	// )(operateType);

	let { take } = service

	let stream = _createGetWorkerDataStream(service, operateType, worker)

	return ignore(take(1, stream), service)
};