@genType.import(("most", "Stream"))
type stream<'a>

/* observes a stream */
@module("most")
external observe: ('a => unit, stream<'a>) => Js.Promise.t<unit> =
  "observe"

@module("most")
external forEach: ('a => unit, stream<'a>) => Js.Promise.t<unit> =
  "forEach"

/* Reduce a stream, returning a promise for the ultimate result. */
@module("most")
external reduce: (
  ('accum, 'a) => 'b,
  'b,
  stream<'a>,
) => Js.Promise.t<'b> = "reduce"

/* Start consuming events from stream.
   This can be useful in some cases where you don't want or need to process the terminal events
   --e.g. when all processing has been done via upstream side-effects.
   Most times, however, you'll use observe to consume and process terminal events. */
@module("most")
external drain: stream<'a> => Js.Promise.t<unit> = "drain"

/* Draft ES Observable compatible subscribe.
 Start consuming events from stream by providing an observer object. */
type observer<'a> = {"next": 'a => unit, "error": Js.Exn.t => unit, "complete": unit => unit}

type subscription = {"unsubscribe": unit => unit}

@bs.send.pipe(: stream<'a>)
external subscribe: observer<'a> => subscription = "subscribe"

/* **
 * Stream creation
 * */
/* Creates an already ended stream with no events */
@module("most") external empty: unit => stream<unit> = "empty"

/* Creates a stream containing only x */
@module("most") external just: 'a => stream<'a> = "just"

/* Creates a stream from an array */
@module("most") external from: array<'a> => stream<'a> = "from"

/* The JavaScript version of `unfold` is hard to type safely.
 * It takes an object of the shape { seed, value, done }
 * where done is a boolean whether to complete the stream.
 * When `done` is true, `seed` and `value` are ignored.
 * There are often times when we may complete a stream after
 * exhausting our data source (e.g. the `fromList` function),
 * so we need a way of saying we're done without providing
 * a `value` or a `seed`.
 * We expose an unsafe `_unfold` here, and then below a more
 * typesafe version along with some types to go along with it.
 */
@module("most")
external _unfold: ('a => Js.t<'b>, 'a) => stream<'c> = "unfold"

external unsafeCast: Js.t<'a> => Js.t<'b> = "%identity"

/* Creates a stream from a generating function and a seed */
let unfold = (f: 'a => option<('b, 'a)>): ('a => stream<'b>) =>
  _unfold(x =>
    switch f(x) {
    | None => unsafeCast({"_done": true})
    | Some((value, seed)) => unsafeCast({"value": value, "seed": seed})
    }
  )

/* Creates a stream from a Reason list */
let fromList = list => unfold(curList =>
    switch curList {
    | list{} => None
    | list{x, ...rest} => Some((x, rest))
    }
  , list)

/* Creates a stream from a promise that completes once the promise resolves */
@module("most")
external fromPromise: Js.Promise.t<'a> => stream<'a> = "fromPromise"

/* Create an infinite stream containing events that arrive every period milliseconds,
 and whose value is undefined. */
@module("most") external periodic: int => stream<unit> = "periodic"

/* Create a stream that contains no events and never ends */
@module("most") external never: unit => stream<'a> = "never"

/* Build an infinite stream by computing successive items iteratively.
 Conceptually, the stream will contain: [initial, f(initial), f(f(initial)), ...] */
@module("most")
external iterate: ('a => 'a, 'a) => stream<'a> = "iterate"

/* Same as `iterate`, but the function may return a promise.
 This allows one to build asynchronous streams of future values */
@module("most")
external iteratePromise: (
  'a => Js.Promise.t<'a>,
  'a,
) => stream<'a> = "iterate"

/* Create a stream of events from a DOM EventTarget */
@module("most")
external fromEvent: (
  string,
  Dom.eventTarget,
  bool,
) => stream<Dom.event> = "fromEvent"

/* Concatenates two streams together */
@bs.send.pipe(: stream<'a>)
external concat: stream<
  'a,
> => stream<'a> = "concat"

/* Appends an element to the start of a stream */
@module("most")
external startWith: (
  'a,
  stream<'a>,
) => stream<'a> = "startWith"

/* **
 * Error handling
 * */
/* Recover from a stream failure by calling a function to create a new stream. */
@module("most")
external recoverWith: (
  Js.Exn.t => stream<'a>,
  stream<'a>,
) => stream<'a> = "recoverWith"

/* Create a stream in the error state. */
@module("most")
external throwError: Js.Exn.t => stream<unit> = "throwError"

/* **
 * Transforming
 * */
/* Create a new stream by applying f to each event of the input stream. */
@module("most")
external map: (
  'a => 'b,
  stream<'a>,
) => stream<'b> = "map"

/* Create a new stream by replacing each event of the input stream with x */
@module("most")
external constant: (
  'a,
  stream<'b>,
) => stream<'a> = "constant"

/* Create a new stream containing incrementally accumulated results, starting with the provided initial value. */
@module("most")
external scan: (
  ('accum, 'a) => 'b,
  'accum,
  stream<'a>,
) => stream<'b> = "scan"

/* Transform each event in stream into a stream, and then merge it into the resulting stream. */
@module("most")
external flatMap: (
  'a => stream<'b>,
  stream<'a>,
) => stream<'b> = "flatMap"

/* Replace the end signal with a new stream returned by f. */
@module("most")
external continueWith: (
  'a => stream<'b>,
  stream<'a>,
) => stream<'b> = "continueWith"

/* Transform each event in stream into a stream, and then concatenate it onto the end of the resulting stream. */
@module("most")
external concatMap: (
  'a => stream<'b>,
  stream<'a>,
) => stream<'b> = "concatMap"

/* Apply the latest function in a stream of functions to the latest value in stream */
@module("most")
external ap: (
  stream<'a => 'b>,
  stream<'a>,
) => stream<'b> = "ap"

/* Materialize event timestamps, transforming Stream<X> into Stream<{ time:number, value:X }> */
@module("most")
external timestamp: stream<
  'a,
> => stream<{
  "time": int,
  "value": 'a,
}> = "timestamp"

/* Perform a side-effect for each event in stream. */
@module("most")
external tap: (
  'a => unit,
  stream<'a>,
) => stream<'a> = "tap"

/* **
 * Filtering
 * */
/* Create a stream containing only events for which the predicate returns true. */
@module("most")
external filter: (
  'a => bool,
  stream<'a>,
) => stream<'a> = "filter"

/* Create a new stream with adjacent repeated events removed. */
@module("most")
external skipRepeats: stream<
  'a,
> => stream<'a> = "skipRepeats"

/* Create a new stream with adjacent repeated events removed, using the provided comparison function */
@module("most")
external skipRepeatsWith: (
  ('a, 'a) => bool,
  stream<'a>,
) => stream<'a> = "skipRepeatsWith"

/* **
 * Slicing
 * */
/* Create a new stream containing only events where start <= index < end,
    where index is the ordinal index of an event in stream.
   If stream contains fewer than start events, the returned stream will be empty. */
@module("most")
external slice: (
  int,
  int,
  stream<'a>,
) => stream<'a> = "slice"

/* Create a new stream containing at most n events from stream.
 If stream contains fewer than n events, the returned stream will be effectively equivalent to stream. */
@module("most")
external take: (
  int,
  stream<'a>,
) => stream<'a> = "take"

/* Create a new stream that omits the first n events from stream.
 If stream contains fewer than n events, the returned stream will be empty. */
@module("most")
external skip: (
  int,
  stream<'a>,
) => stream<'a> = "skip"

/* Create a new stream containing all events until predicate returns false. */
@module("most")
external takeWhile: (
  'a => bool,
  stream<'a>,
) => stream<'a> = "takeWhile"

/* Create a new stream containing all events after predicate returns false. */
@module("most")
external skipWhile: (
  'a => bool,
  stream<'a>,
) => stream<'a> = "skipWhile"

/* Create a new stream containing all events before and including when the predicate returns true. */
@module("most")
external skipAfter: (
  'a => bool,
  stream<'a>,
) => stream<'a> = "skipAfter"

/* Create a new stream containing all events until endSignal emits an event. */
@module("most")
external until: (
  stream<'b>,
  stream<'a>,
) => stream<'a> = "until"

/* Create a new stream containing all events after startSignal emits its first event. */
@module("most")
external since: (
  stream<'b>,
  stream<'a>,
) => stream<'a> = "since"

/* Create a new stream containing only events that occur during a dynamic time window. */
@module("most")
external during: (
  stream<stream<'ending>>,
  stream<'a>,
) => stream<'a> = "during"

/* **
 * Combining
 * */
/* Create a new stream containing events from stream1 and stream2. */
@module("most")
external merge: (
  stream<'a>,
  stream<'a>,
) => stream<'a> = "merge"

/* Array form of merge. Create a new stream containing all events from all streams in the array. */
@module("most")
external mergeArray: array<
  stream<'a>,
> => stream<'a> = "mergeArray"

/* Create a new stream that emits the set of latest event values from all input streams
 whenever a new event arrives on any input stream. */
@module("most")
external combine: (
  ('a, 'b) => 'c,
  stream<'a>,
  stream<'b>,
) => stream<'c> = "combine"

/* Array form of combine. Create a new stream that emits the set of latest event values
 from all input streams whenever a new event arrives on any input stream. */
/* NOTE: This is not included yet due to the variadic callback requirement... */
/* external combineArray : (array 'a => 'b) => array (stream 'a) => stream 'a = "combineArray" [@@bs.module "most"]; */
/* Create a new stream by combining sampled values from many input streams. */
@module("most")
external sample1: (
  'a => 'b,
  stream<'sample>,
  stream<'a>,
) => stream<'b> = "sample"

@module("most")
external sample2: (
  ('a, 'a) => 'b,
  stream<'sample>,
  stream<'a>,
  stream<'a>,
) => stream<'b> = "sample"

@module("most")
external sample3: (
  ('a, 'a, 'a) => 'b,
  stream<'sample>,
  stream<'a>,
  stream<'a>,
  stream<'a>,
) => stream<'b> = "sample"

@module("most")
external sample4: (
  ('a, 'a, 'a, 'a) => 'b,
  stream<'sample>,
  stream<'a>,
  stream<'a>,
  stream<'a>,
  stream<'a>,
) => stream<'b> = "sample"

@module("most")
external sample5: (
  ('a, 'a, 'a, 'a, 'a) => 'b,
  stream<'sample>,
  stream<'a>,
  stream<'a>,
  stream<'a>,
  stream<'a>,
  stream<'a>,
) => stream<'b> = "sample"

@module("most")
external sample6: (
  ('a, 'a, 'a, 'a, 'a, 'a) => 'b,
  stream<'sample>,
  stream<'a>,
  stream<'a>,
  stream<'a>,
  stream<'a>,
  stream<'a>,
  stream<'a>,
) => stream<'b> = "sample"

/* When an event arrives on asampler, emit the latest event value from a stream of values. */
@module("most")
external sampleWith: (
  stream<'sample>,
  stream<'a>,
) => stream<'a> = "sample1"

@module("most")
external zip: (
  ('a, 'b) => 'c,
  stream<'a>,
  stream<'b>,
) => stream<'c> = "zip"

/* **
 * Combining higher-order streams
 * */
/* Given a higher-order stream, return a new stream that adopts the behavior of
 (ie emits the events of) the most recent inner stream. */
@module("most")
external switchLatest: stream<
  stream<'a>,
> => stream<'a> = "switchLatest"

/* Given a higher-order stream, return a new stream that merges all the inner streams as they arrive. */
@module("most")
external join: stream<
  stream<'a>,
> => stream<'a> = "join"

/* Given a higher-order stream, return a new stream that merges inner streams as they arrive
   up to the specified concurrency. Once concurrency number of streams are being merged,
   newly arriving streams will be merged after an existing one ends. */
@module("most")
external mergeConcurrently: (
  int,
  stream<stream<'a>>,
) => stream<'a> = "mergeConcurrently"

/* **
 * Awaiting promises
 * */
/* Given a stream of promises, ie Stream<Promise<X>>,
   return a new stream containing the fulfillment values, ie Stream<X>.
   Event times may be delayed. However, event order is always preserved,
   regardless of promise fulfillment order.
   To create a stream that merges promises in fulfillment order,
   use `flatMap(fromPromise, stream)`.
   If a promise rejects, the stream will be in an error state
   with the rejected promise's reason as its error.
   See recoverWith for error recovery. */
@module("most")
external awaitPromises: stream<
  Js.Promise.t<'a>,
> => stream<'a> = "awaitPromises"

/* **
 * Rate limiting streams
 */
/* Wait for a burst of events to subside and emit only the last event in the burst.
   If the stream ends while there is a pending debounced event (e.g. via `until`),
   the pending event will be emitted just before the stream ends. */
@module("most")
external debounce: (
  int,
  stream<'a>,
) => stream<'a> = "debounce"

/* Limit the rate of events to at most one per throttlePeriod. */
@module("most")
external throttle: (
  int,
  stream<'a>,
) => stream<'a> = "throttle"

/* **
 * Delaying streams
 * */
/* Timeshift a stream by a delay time in milliseconds. */
@module("most")
external delay: (
  int,
  stream<'a>,
) => stream<'a> = "delay"

/* **
 * Sharing streams
 * */
/* Returns a stream equivalent to the original, but which can be shared more efficiently among multiple consumers. */
@module("most")
external multicast: stream<
  'a,
> => stream<'a> = "multicast"

/* **
 *  Subjects!
 * */
module Subject = {
  type t<'a>
  @module("most-subject") external make: unit => t<'a> = "async"
  external asStream: t<'a> => stream<'a> = "%identity"
  @module("most-subject") external next: ('a, t<'a>) => t<'a> = "next"
  @module("most-subject")
  external error: (Js.Exn.t, t<'a>) => t<Js.Exn.t> = "error"
  @send external complete: t<'a> => t<'a> = "complete"
  @module("most-subject")
  external completeWith: ('a, t<'a>) => t<'a> = "complete"
}
