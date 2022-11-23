/* observes a Meta3dBsMostProtocol.StreamType.stream */
@module("most")
external observe: ('a => unit, Meta3dBsMostProtocol.StreamType.stream<'a>) => Js.Promise.t<unit> =
  "observe"

@module("most")
external forEach: ('a => unit, Meta3dBsMostProtocol.StreamType.stream<'a>) => Js.Promise.t<unit> =
  "forEach"

/* Reduce a Meta3dBsMostProtocol.StreamType.stream, returning a promise for the ultimate result. */
@module("most")
external reduce: (
  ('accum, 'a) => 'b,
  'b,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
) => Js.Promise.t<'b> = "reduce"

/* Start consuming events from Meta3dBsMostProtocol.StreamType.stream.
   This can be useful in some cases where you don't want or need to process the terminal events
   --e.g. when all processing has been done via upstream side-effects.
   Most times, however, you'll use observe to consume and process terminal events. */
@module("most")
external drain: Meta3dBsMostProtocol.StreamType.stream<'a> => Js.Promise.t<unit> = "drain"

/* Draft ES Observable compatible subscribe.
 Start consuming events from Meta3dBsMostProtocol.StreamType.stream by providing an observer object. */
type observer<'a> = {"next": 'a => unit, "error": Js.Exn.t => unit, "complete": unit => unit}

type subscription = {"unsubscribe": unit => unit}

@bs.send.pipe(: Meta3dBsMostProtocol.StreamType.stream<'a>)
external subscribe: observer<'a> => subscription = "subscribe"

/* **
 * Stream creation
 * */
/* Creates an already ended Meta3dBsMostProtocol.StreamType.stream with no events */
@module("most") external empty: unit => Meta3dBsMostProtocol.StreamType.stream<unit> = "empty"

/* Creates a Meta3dBsMostProtocol.StreamType.stream containing only x */
@module("most") external just: 'a => Meta3dBsMostProtocol.StreamType.stream<'a> = "just"

/* Creates a Meta3dBsMostProtocol.StreamType.stream from an array */
@module("most") external from: array<'a> => Meta3dBsMostProtocol.StreamType.stream<'a> = "from"

/* The JavaScript version of `unfold` is hard to type safely.
 * It takes an object of the shape { seed, value, done }
 * where done is a boolean whether to complete the Meta3dBsMostProtocol.StreamType.stream.
 * When `done` is true, `seed` and `value` are ignored.
 * There are often times when we may complete a Meta3dBsMostProtocol.StreamType.stream after
 * exhausting our data source (e.g. the `fromList` function),
 * so we need a way of saying we're done without providing
 * a `value` or a `seed`.
 * We expose an unsafe `_unfold` here, and then below a more
 * typesafe version along with some types to go along with it.
 */
@module("most")
external _unfold: ('a => Js.t<'b>, 'a) => Meta3dBsMostProtocol.StreamType.stream<'c> = "unfold"

external unsafeCast: Js.t<'a> => Js.t<'b> = "%identity"

/* Creates a Meta3dBsMostProtocol.StreamType.stream from a generating function and a seed */
let unfold = (f: 'a => option<('b, 'a)>): ('a => Meta3dBsMostProtocol.StreamType.stream<'b>) =>
  _unfold(x =>
    switch f(x) {
    | None => unsafeCast({"_done": true})
    | Some((value, seed)) => unsafeCast({"value": value, "seed": seed})
    }
  )

/* Creates a Meta3dBsMostProtocol.StreamType.stream from a Reason list */
let fromList = list => unfold(curList =>
    switch curList {
    | list{} => None
    | list{x, ...rest} => Some((x, rest))
    }
  , list)

/* Creates a Meta3dBsMostProtocol.StreamType.stream from a promise that completes once the promise resolves */
@module("most")
external fromPromise: Js.Promise.t<'a> => Meta3dBsMostProtocol.StreamType.stream<'a> = "fromPromise"

/* Create an infinite Meta3dBsMostProtocol.StreamType.stream containing events that arrive every period milliseconds,
 and whose value is undefined. */
@module("most") external periodic: int => Meta3dBsMostProtocol.StreamType.stream<unit> = "periodic"

/* Create a Meta3dBsMostProtocol.StreamType.stream that contains no events and never ends */
@module("most") external never: unit => Meta3dBsMostProtocol.StreamType.stream<'a> = "never"

/* Build an infinite Meta3dBsMostProtocol.StreamType.stream by computing successive items iteratively.
 Conceptually, the Meta3dBsMostProtocol.StreamType.stream will contain: [initial, f(initial), f(f(initial)), ...] */
@module("most")
external iterate: ('a => 'a, 'a) => Meta3dBsMostProtocol.StreamType.stream<'a> = "iterate"

/* Same as `iterate`, but the function may return a promise.
 This allows one to build asynchronous streams of future values */
@module("most")
external iteratePromise: (
  'a => Js.Promise.t<'a>,
  'a,
) => Meta3dBsMostProtocol.StreamType.stream<'a> = "iterate"

/* Create a Meta3dBsMostProtocol.StreamType.stream of events from a DOM EventTarget */
@module("most")
external fromEvent: (
  string,
  Dom.eventTarget,
  bool,
) => Meta3dBsMostProtocol.StreamType.stream<Dom.event> = "iteratePromise"

/* Concatenates two streams together */
@bs.send.pipe(: Meta3dBsMostProtocol.StreamType.stream<'a>)
external concat: Meta3dBsMostProtocol.StreamType.stream<
  'a,
> => Meta3dBsMostProtocol.StreamType.stream<'a> = "concat"

/* Appends an element to the start of a Meta3dBsMostProtocol.StreamType.stream */
@module("most")
external startWith: (
  'a,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
) => Meta3dBsMostProtocol.StreamType.stream<'a> = "startWith"

/* **
 * Error handling
 * */
/* Recover from a Meta3dBsMostProtocol.StreamType.stream failure by calling a function to create a new Meta3dBsMostProtocol.StreamType.stream. */
@module("most")
external recoverWith: (
  Js.Exn.t => Meta3dBsMostProtocol.StreamType.stream<'a>,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
) => Meta3dBsMostProtocol.StreamType.stream<'a> = "recoverWith"

/* Create a Meta3dBsMostProtocol.StreamType.stream in the error state. */
@module("most")
external throwError: Js.Exn.t => Meta3dBsMostProtocol.StreamType.stream<unit> = "throwError"

/* **
 * Transforming
 * */
/* Create a new Meta3dBsMostProtocol.StreamType.stream by applying f to each event of the input Meta3dBsMostProtocol.StreamType.stream. */
@module("most")
external map: (
  'a => 'b,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
) => Meta3dBsMostProtocol.StreamType.stream<'b> = "map"

/* Create a new Meta3dBsMostProtocol.StreamType.stream by replacing each event of the input Meta3dBsMostProtocol.StreamType.stream with x */
@module("most")
external constant: (
  'a,
  Meta3dBsMostProtocol.StreamType.stream<'b>,
) => Meta3dBsMostProtocol.StreamType.stream<'a> = "constant"

/* Create a new Meta3dBsMostProtocol.StreamType.stream containing incrementally accumulated results, starting with the provided initial value. */
@module("most")
external scan: (
  ('accum, 'a) => 'b,
  'accum,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
) => Meta3dBsMostProtocol.StreamType.stream<'b> = "scan"

/* Transform each event in Meta3dBsMostProtocol.StreamType.stream into a Meta3dBsMostProtocol.StreamType.stream, and then merge it into the resulting Meta3dBsMostProtocol.StreamType.stream. */
@module("most")
external flatMap: (
  'a => Meta3dBsMostProtocol.StreamType.stream<'b>,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
) => Meta3dBsMostProtocol.StreamType.stream<'b> = "flatMap"

/* Replace the end signal with a new Meta3dBsMostProtocol.StreamType.stream returned by f. */
@module("most")
external continueWith: (
  'a => Meta3dBsMostProtocol.StreamType.stream<'b>,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
) => Meta3dBsMostProtocol.StreamType.stream<'b> = "continueWith"

/* Transform each event in Meta3dBsMostProtocol.StreamType.stream into a Meta3dBsMostProtocol.StreamType.stream, and then concatenate it onto the end of the resulting Meta3dBsMostProtocol.StreamType.stream. */
@module("most")
external concatMap: (
  'a => Meta3dBsMostProtocol.StreamType.stream<'b>,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
) => Meta3dBsMostProtocol.StreamType.stream<'b> = "concatMap"

/* Apply the latest function in a Meta3dBsMostProtocol.StreamType.stream of functions to the latest value in Meta3dBsMostProtocol.StreamType.stream */
@module("most")
external ap: (
  Meta3dBsMostProtocol.StreamType.stream<'a => 'b>,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
) => Meta3dBsMostProtocol.StreamType.stream<'b> = "ap"

/* Materialize event timestamps, transforming Stream<X> into Stream<{ time:number, value:X }> */
@module("most")
external timestamp: Meta3dBsMostProtocol.StreamType.stream<
  'a,
> => Meta3dBsMostProtocol.StreamType.stream<{
  "time": int,
  "value": 'a,
}> = "timestamp"

/* Perform a side-effect for each event in Meta3dBsMostProtocol.StreamType.stream. */
@module("most")
external tap: (
  'a => unit,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
) => Meta3dBsMostProtocol.StreamType.stream<'a> = "tap"

/* **
 * Filtering
 * */
/* Create a Meta3dBsMostProtocol.StreamType.stream containing only events for which the predicate returns true. */
@module("most")
external filter: (
  'a => bool,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
) => Meta3dBsMostProtocol.StreamType.stream<'a> = "filter"

/* Create a new Meta3dBsMostProtocol.StreamType.stream with adjacent repeated events removed. */
@module("most")
external skipRepeats: Meta3dBsMostProtocol.StreamType.stream<
  'a,
> => Meta3dBsMostProtocol.StreamType.stream<'a> = "skipRepeats"

/* Create a new Meta3dBsMostProtocol.StreamType.stream with adjacent repeated events removed, using the provided comparison function */
@module("most")
external skipRepeatsWith: (
  ('a, 'a) => bool,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
) => Meta3dBsMostProtocol.StreamType.stream<'a> = "skipRepeatsWith"

/* **
 * Slicing
 * */
/* Create a new Meta3dBsMostProtocol.StreamType.stream containing only events where start <= index < end,
    where index is the ordinal index of an event in Meta3dBsMostProtocol.StreamType.stream.
   If Meta3dBsMostProtocol.StreamType.stream contains fewer than start events, the returned Meta3dBsMostProtocol.StreamType.stream will be empty. */
@module("most")
external slice: (
  int,
  int,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
) => Meta3dBsMostProtocol.StreamType.stream<'a> = "slice"

/* Create a new Meta3dBsMostProtocol.StreamType.stream containing at most n events from Meta3dBsMostProtocol.StreamType.stream.
 If Meta3dBsMostProtocol.StreamType.stream contains fewer than n events, the returned Meta3dBsMostProtocol.StreamType.stream will be effectively equivalent to Meta3dBsMostProtocol.StreamType.stream. */
@module("most")
external take: (
  int,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
) => Meta3dBsMostProtocol.StreamType.stream<'a> = "take"

/* Create a new Meta3dBsMostProtocol.StreamType.stream that omits the first n events from Meta3dBsMostProtocol.StreamType.stream.
 If Meta3dBsMostProtocol.StreamType.stream contains fewer than n events, the returned Meta3dBsMostProtocol.StreamType.stream will be empty. */
@module("most")
external skip: (
  int,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
) => Meta3dBsMostProtocol.StreamType.stream<'a> = "skip"

/* Create a new Meta3dBsMostProtocol.StreamType.stream containing all events until predicate returns false. */
@module("most")
external takeWhile: (
  'a => bool,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
) => Meta3dBsMostProtocol.StreamType.stream<'a> = "takeWhile"

/* Create a new Meta3dBsMostProtocol.StreamType.stream containing all events after predicate returns false. */
@module("most")
external skipWhile: (
  'a => bool,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
) => Meta3dBsMostProtocol.StreamType.stream<'a> = "skipWhile"

/* Create a new Meta3dBsMostProtocol.StreamType.stream containing all events before and including when the predicate returns true. */
@module("most")
external skipAfter: (
  'a => bool,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
) => Meta3dBsMostProtocol.StreamType.stream<'a> = "skipAfter"

/* Create a new Meta3dBsMostProtocol.StreamType.stream containing all events until endSignal emits an event. */
@module("most")
external until: (
  Meta3dBsMostProtocol.StreamType.stream<'b>,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
) => Meta3dBsMostProtocol.StreamType.stream<'a> = "until"

/* Create a new Meta3dBsMostProtocol.StreamType.stream containing all events after startSignal emits its first event. */
@module("most")
external since: (
  Meta3dBsMostProtocol.StreamType.stream<'b>,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
) => Meta3dBsMostProtocol.StreamType.stream<'a> = "since"

/* Create a new Meta3dBsMostProtocol.StreamType.stream containing only events that occur during a dynamic time window. */
@module("most")
external during: (
  Meta3dBsMostProtocol.StreamType.stream<Meta3dBsMostProtocol.StreamType.stream<'ending>>,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
) => Meta3dBsMostProtocol.StreamType.stream<'a> = "during"

/* **
 * Combining
 * */
/* Create a new Meta3dBsMostProtocol.StreamType.stream containing events from stream1 and stream2. */
@module("most")
external merge: (
  Meta3dBsMostProtocol.StreamType.stream<'a>,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
) => Meta3dBsMostProtocol.StreamType.stream<'a> = "merge"

/* Array form of merge. Create a new Meta3dBsMostProtocol.StreamType.stream containing all events from all streams in the array. */
@module("most")
external mergeArray: array<
  Meta3dBsMostProtocol.StreamType.stream<'a>,
> => Meta3dBsMostProtocol.StreamType.stream<'a> = "mergeArray"

/* Create a new Meta3dBsMostProtocol.StreamType.stream that emits the set of latest event values from all input streams
 whenever a new event arrives on any input Meta3dBsMostProtocol.StreamType.stream. */
@module("most")
external combine: (
  ('a, 'b) => 'c,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
  Meta3dBsMostProtocol.StreamType.stream<'b>,
) => Meta3dBsMostProtocol.StreamType.stream<'c> = "combine"

/* Array form of combine. Create a new Meta3dBsMostProtocol.StreamType.stream that emits the set of latest event values
 from all input streams whenever a new event arrives on any input Meta3dBsMostProtocol.StreamType.stream. */
/* NOTE: This is not included yet due to the variadic callback requirement... */
/* external combineArray : (array 'a => 'b) => array (Meta3dBsMostProtocol.StreamType.stream 'a) => Meta3dBsMostProtocol.StreamType.stream 'a = "combineArray" [@@bs.module "most"]; */
/* Create a new Meta3dBsMostProtocol.StreamType.stream by combining sampled values from many input streams. */
@module("most")
external sample1: (
  'a => 'b,
  Meta3dBsMostProtocol.StreamType.stream<'sample>,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
) => Meta3dBsMostProtocol.StreamType.stream<'b> = "sample"

@module("most")
external sample2: (
  ('a, 'a) => 'b,
  Meta3dBsMostProtocol.StreamType.stream<'sample>,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
) => Meta3dBsMostProtocol.StreamType.stream<'b> = "sample"

@module("most")
external sample3: (
  ('a, 'a, 'a) => 'b,
  Meta3dBsMostProtocol.StreamType.stream<'sample>,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
) => Meta3dBsMostProtocol.StreamType.stream<'b> = "sample"

@module("most")
external sample4: (
  ('a, 'a, 'a, 'a) => 'b,
  Meta3dBsMostProtocol.StreamType.stream<'sample>,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
) => Meta3dBsMostProtocol.StreamType.stream<'b> = "sample"

@module("most")
external sample5: (
  ('a, 'a, 'a, 'a, 'a) => 'b,
  Meta3dBsMostProtocol.StreamType.stream<'sample>,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
) => Meta3dBsMostProtocol.StreamType.stream<'b> = "sample"

@module("most")
external sample6: (
  ('a, 'a, 'a, 'a, 'a, 'a) => 'b,
  Meta3dBsMostProtocol.StreamType.stream<'sample>,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
) => Meta3dBsMostProtocol.StreamType.stream<'b> = "sample"

/* When an event arrives on asampler, emit the latest event value from a Meta3dBsMostProtocol.StreamType.stream of values. */
@module("most")
external sampleWith: (
  Meta3dBsMostProtocol.StreamType.stream<'sample>,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
) => Meta3dBsMostProtocol.StreamType.stream<'a> = "sample1"

@module("most")
external zip: (
  ('a, 'b) => 'c,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
  Meta3dBsMostProtocol.StreamType.stream<'b>,
) => Meta3dBsMostProtocol.StreamType.stream<'c> = "zip"

/* **
 * Combining higher-order streams
 * */
/* Given a higher-order Meta3dBsMostProtocol.StreamType.stream, return a new Meta3dBsMostProtocol.StreamType.stream that adopts the behavior of
 (ie emits the events of) the most recent inner Meta3dBsMostProtocol.StreamType.stream. */
@module("most")
external switchLatest: Meta3dBsMostProtocol.StreamType.stream<
  Meta3dBsMostProtocol.StreamType.stream<'a>,
> => Meta3dBsMostProtocol.StreamType.stream<'a> = "switchLatest"

/* Given a higher-order Meta3dBsMostProtocol.StreamType.stream, return a new Meta3dBsMostProtocol.StreamType.stream that merges all the inner streams as they arrive. */
@module("most")
external join: Meta3dBsMostProtocol.StreamType.stream<
  Meta3dBsMostProtocol.StreamType.stream<'a>,
> => Meta3dBsMostProtocol.StreamType.stream<'a> = "join"

/* Given a higher-order Meta3dBsMostProtocol.StreamType.stream, return a new Meta3dBsMostProtocol.StreamType.stream that merges inner streams as they arrive
   up to the specified concurrency. Once concurrency number of streams are being merged,
   newly arriving streams will be merged after an existing one ends. */
@module("most")
external mergeConcurrently: (
  int,
  Meta3dBsMostProtocol.StreamType.stream<Meta3dBsMostProtocol.StreamType.stream<'a>>,
) => Meta3dBsMostProtocol.StreamType.stream<'a> = "mergeConcurrently"

/* **
 * Awaiting promises
 * */
/* Given a Meta3dBsMostProtocol.StreamType.stream of promises, ie Stream<Promise<X>>,
   return a new Meta3dBsMostProtocol.StreamType.stream containing the fulfillment values, ie Stream<X>.
   Event times may be delayed. However, event order is always preserved,
   regardless of promise fulfillment order.
   To create a Meta3dBsMostProtocol.StreamType.stream that merges promises in fulfillment order,
   use `flatMap(fromPromise, Meta3dBsMostProtocol.StreamType.stream)`.
   If a promise rejects, the Meta3dBsMostProtocol.StreamType.stream will be in an error state
   with the rejected promise's reason as its error.
   See recoverWith for error recovery. */
@module("most")
external awaitPromises: Meta3dBsMostProtocol.StreamType.stream<
  Js.Promise.t<'a>,
> => Meta3dBsMostProtocol.StreamType.stream<'a> = "awaitPromises"

/* **
 * Rate limiting streams
 */
/* Wait for a burst of events to subside and emit only the last event in the burst.
   If the Meta3dBsMostProtocol.StreamType.stream ends while there is a pending debounced event (e.g. via `until`),
   the pending event will be emitted just before the Meta3dBsMostProtocol.StreamType.stream ends. */
@module("most")
external debounce: (
  int,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
) => Meta3dBsMostProtocol.StreamType.stream<'a> = "debounce"

/* Limit the rate of events to at most one per throttlePeriod. */
@module("most")
external throttle: (
  int,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
) => Meta3dBsMostProtocol.StreamType.stream<'a> = "throttle"

/* **
 * Delaying streams
 * */
/* Timeshift a Meta3dBsMostProtocol.StreamType.stream by a delay time in milliseconds. */
@module("most")
external delay: (
  int,
  Meta3dBsMostProtocol.StreamType.stream<'a>,
) => Meta3dBsMostProtocol.StreamType.stream<'a> = "delay"

/* **
 * Sharing streams
 * */
/* Returns a Meta3dBsMostProtocol.StreamType.stream equivalent to the original, but which can be shared more efficiently among multiple consumers. */
@module("most")
external multicast: Meta3dBsMostProtocol.StreamType.stream<
  'a,
> => Meta3dBsMostProtocol.StreamType.stream<'a> = "multicast"

/* **
 *  Subjects!
 * */
module Subject = {
  type t<'a>
  @module("most-subject") external make: unit => t<'a> = "async"
  external asStream: t<'a> => Meta3dBsMostProtocol.StreamType.stream<'a> = "%identity"
  @module("most-subject") external next: ('a, t<'a>) => t<'a> = "next"
  @module("most-subject")
  external error: (Js.Exn.t, t<'a>) => t<Js.Exn.t> = "error"
  @send external complete: t<'a> => t<'a> = "complete"
  @module("most-subject")
  external completeWith: ('a, t<'a>) => t<'a> = "complete"
}
