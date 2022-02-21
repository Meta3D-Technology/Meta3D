/* observes a Meta3dBsMostProtocol.ServiceType.stream */
@bs.module("most")
external observe: ('a => unit, Meta3dBsMostProtocol.ServiceType.stream<'a>) => Js.Promise.t<unit> = ""

@bs.module("most")
external forEach: ('a => unit, Meta3dBsMostProtocol.ServiceType.stream<'a>) => Js.Promise.t<unit> = ""

/* Reduce a Meta3dBsMostProtocol.ServiceType.stream, returning a promise for the ultimate result. */
@bs.module("most")
external reduce: (
  ('accum, 'a) => 'b,
  'b,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
) => Js.Promise.t<'b> = ""

/* Start consuming events from Meta3dBsMostProtocol.ServiceType.stream.
   This can be useful in some cases where you don't want or need to process the terminal events
   --e.g. when all processing has been done via upstream side-effects.
   Most times, however, you'll use observe to consume and process terminal events. */
@bs.module("most")
external drain: Meta3dBsMostProtocol.ServiceType.stream<'a> => Js.Promise.t<unit> = ""

/* Draft ES Observable compatible subscribe.
 Start consuming events from Meta3dBsMostProtocol.ServiceType.stream by providing an observer object. */
type observer<'a> = {"next": 'a => unit, "error": Js.Exn.t => unit, "complete": unit => unit}

type subscription = {"unsubscribe": unit => unit}

@bs.send.pipe(: Meta3dBsMostProtocol.ServiceType.stream<'a>)
external subscribe: observer<'a> => subscription = ""

/* **
 * Stream creation
 * */
/* Creates an already ended Meta3dBsMostProtocol.ServiceType.stream with no events */
@bs.module("most") external empty: unit => Meta3dBsMostProtocol.ServiceType.stream<unit> = ""

/* Creates a Meta3dBsMostProtocol.ServiceType.stream containing only x */
@bs.module("most") external just: 'a => Meta3dBsMostProtocol.ServiceType.stream<'a> = ""

/* Creates a Meta3dBsMostProtocol.ServiceType.stream from an array */
@bs.module("most") external from: array<'a> => Meta3dBsMostProtocol.ServiceType.stream<'a> = ""

/* The JavaScript version of `unfold` is hard to type safely.
 * It takes an object of the shape { seed, value, done }
 * where done is a boolean whether to complete the Meta3dBsMostProtocol.ServiceType.stream.
 * When `done` is true, `seed` and `value` are ignored.
 * There are often times when we may complete a Meta3dBsMostProtocol.ServiceType.stream after
 * exhausting our data source (e.g. the `fromList` function),
 * so we need a way of saying we're done without providing
 * a `value` or a `seed`.
 * We expose an unsafe `_unfold` here, and then below a more
 * typesafe version along with some types to go along with it.
 */
@bs.module("most")
external _unfold: ('a => Js.t<'b>, 'a) => Meta3dBsMostProtocol.ServiceType.stream<'c> = "unfold"

external unsafeCast: Js.t<'a> => Js.t<'b> = "%identity"

/* Creates a Meta3dBsMostProtocol.ServiceType.stream from a generating function and a seed */
let unfold = (f: 'a => option<('b, 'a)>): ('a => Meta3dBsMostProtocol.ServiceType.stream<'b>) =>
  _unfold(x =>
    switch f(x) {
    | None => unsafeCast({"_done": true})
    | Some((value, seed)) => unsafeCast({"value": value, "seed": seed})
    }
  )

/* Creates a Meta3dBsMostProtocol.ServiceType.stream from a Reason list */
let fromList = list => unfold(curList =>
    switch curList {
    | list{} => None
    | list{x, ...rest} => Some((x, rest))
    }
  , list)

/* Creates a Meta3dBsMostProtocol.ServiceType.stream from a promise that completes once the promise resolves */
@bs.module("most")
external fromPromise: Js.Promise.t<'a> => Meta3dBsMostProtocol.ServiceType.stream<'a> = ""

/* Create an infinite Meta3dBsMostProtocol.ServiceType.stream containing events that arrive every period milliseconds,
 and whose value is undefined. */
@bs.module("most") external periodic: int => Meta3dBsMostProtocol.ServiceType.stream<unit> = ""

/* Create a Meta3dBsMostProtocol.ServiceType.stream that contains no events and never ends */
@bs.module("most") external never: unit => Meta3dBsMostProtocol.ServiceType.stream<'a> = ""

/* Build an infinite Meta3dBsMostProtocol.ServiceType.stream by computing successive items iteratively.
 Conceptually, the Meta3dBsMostProtocol.ServiceType.stream will contain: [initial, f(initial), f(f(initial)), ...] */
@bs.module("most") external iterate: ('a => 'a, 'a) => Meta3dBsMostProtocol.ServiceType.stream<'a> = ""

/* Same as `iterate`, but the function may return a promise.
 This allows one to build asynchronous streams of future values */
@bs.module("most")
external iteratePromise: ('a => Js.Promise.t<'a>, 'a) => Meta3dBsMostProtocol.ServiceType.stream<'a> =
  "iterate"

/* Create a Meta3dBsMostProtocol.ServiceType.stream of events from a DOM EventTarget */
@bs.module("most")
external fromEvent: (
  string,
  Dom.eventTarget,
  bool,
) => Meta3dBsMostProtocol.ServiceType.stream<Dom.event> = ""

/* Concatenates two streams together */
@bs.send.pipe(: Meta3dBsMostProtocol.ServiceType.stream<'a>)
external concat: Meta3dBsMostProtocol.ServiceType.stream<'a> => Meta3dBsMostProtocol.ServiceType.stream<
  'a,
> = ""

/* Appends an element to the start of a Meta3dBsMostProtocol.ServiceType.stream */
@bs.module("most")
external startWith: (
  'a,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
) => Meta3dBsMostProtocol.ServiceType.stream<'a> = ""

/* **
 * Error handling
 * */
/* Recover from a Meta3dBsMostProtocol.ServiceType.stream failure by calling a function to create a new Meta3dBsMostProtocol.ServiceType.stream. */
@bs.module("most")
external recoverWith: (
  Js.Exn.t => Meta3dBsMostProtocol.ServiceType.stream<'a>,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
) => Meta3dBsMostProtocol.ServiceType.stream<'a> = ""

/* Create a Meta3dBsMostProtocol.ServiceType.stream in the error state. */
@bs.module("most") external throwError: Js.Exn.t => Meta3dBsMostProtocol.ServiceType.stream<unit> = ""

/* **
 * Transforming
 * */
/* Create a new Meta3dBsMostProtocol.ServiceType.stream by applying f to each event of the input Meta3dBsMostProtocol.ServiceType.stream. */
@bs.module("most")
external map: (
  'a => 'b,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
) => Meta3dBsMostProtocol.ServiceType.stream<'b> = ""

/* Create a new Meta3dBsMostProtocol.ServiceType.stream by replacing each event of the input Meta3dBsMostProtocol.ServiceType.stream with x */
@bs.module("most")
external constant: (
  'a,
  Meta3dBsMostProtocol.ServiceType.stream<'b>,
) => Meta3dBsMostProtocol.ServiceType.stream<'a> = ""

/* Create a new Meta3dBsMostProtocol.ServiceType.stream containing incrementally accumulated results, starting with the provided initial value. */
@bs.module("most")
external scan: (
  ('accum, 'a) => 'b,
  'accum,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
) => Meta3dBsMostProtocol.ServiceType.stream<'b> = ""

/* Transform each event in Meta3dBsMostProtocol.ServiceType.stream into a Meta3dBsMostProtocol.ServiceType.stream, and then merge it into the resulting Meta3dBsMostProtocol.ServiceType.stream. */
@bs.module("most")
external flatMap: (
  'a => Meta3dBsMostProtocol.ServiceType.stream<'b>,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
) => Meta3dBsMostProtocol.ServiceType.stream<'b> = ""

/* Replace the end signal with a new Meta3dBsMostProtocol.ServiceType.stream returned by f. */
@bs.module("most")
external continueWith: (
  'a => Meta3dBsMostProtocol.ServiceType.stream<'b>,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
) => Meta3dBsMostProtocol.ServiceType.stream<'b> = ""

/* Transform each event in Meta3dBsMostProtocol.ServiceType.stream into a Meta3dBsMostProtocol.ServiceType.stream, and then concatenate it onto the end of the resulting Meta3dBsMostProtocol.ServiceType.stream. */
@bs.module("most")
external concatMap: (
  'a => Meta3dBsMostProtocol.ServiceType.stream<'b>,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
) => Meta3dBsMostProtocol.ServiceType.stream<'b> = ""

/* Apply the latest function in a Meta3dBsMostProtocol.ServiceType.stream of functions to the latest value in Meta3dBsMostProtocol.ServiceType.stream */
@bs.module("most")
external ap: (
  Meta3dBsMostProtocol.ServiceType.stream<'a => 'b>,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
) => Meta3dBsMostProtocol.ServiceType.stream<'b> = ""

/* Materialize event timestamps, transforming Stream<X> into Stream<{ time:number, value:X }> */
@bs.module("most")
external timestamp: Meta3dBsMostProtocol.ServiceType.stream<'a> => Meta3dBsMostProtocol.ServiceType.stream<{
  "time": int,
  "value": 'a,
}> = ""

/* Perform a side-effect for each event in Meta3dBsMostProtocol.ServiceType.stream. */
@bs.module("most")
external tap: (
  'a => unit,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
) => Meta3dBsMostProtocol.ServiceType.stream<'a> = ""

/* **
 * Filtering
 * */
/* Create a Meta3dBsMostProtocol.ServiceType.stream containing only events for which the predicate returns true. */
@bs.module("most")
external filter: (
  'a => bool,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
) => Meta3dBsMostProtocol.ServiceType.stream<'a> = ""

/* Create a new Meta3dBsMostProtocol.ServiceType.stream with adjacent repeated events removed. */
@bs.module("most")
external skipRepeats: Meta3dBsMostProtocol.ServiceType.stream<
  'a,
> => Meta3dBsMostProtocol.ServiceType.stream<'a> = ""

/* Create a new Meta3dBsMostProtocol.ServiceType.stream with adjacent repeated events removed, using the provided comparison function */
@bs.module("most")
external skipRepeatsWith: (
  ('a, 'a) => bool,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
) => Meta3dBsMostProtocol.ServiceType.stream<'a> = ""

/* **
 * Slicing
 * */
/* Create a new Meta3dBsMostProtocol.ServiceType.stream containing only events where start <= index < end,
    where index is the ordinal index of an event in Meta3dBsMostProtocol.ServiceType.stream.
   If Meta3dBsMostProtocol.ServiceType.stream contains fewer than start events, the returned Meta3dBsMostProtocol.ServiceType.stream will be empty. */
@bs.module("most")
external slice: (
  int,
  int,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
) => Meta3dBsMostProtocol.ServiceType.stream<'a> = ""

/* Create a new Meta3dBsMostProtocol.ServiceType.stream containing at most n events from Meta3dBsMostProtocol.ServiceType.stream.
 If Meta3dBsMostProtocol.ServiceType.stream contains fewer than n events, the returned Meta3dBsMostProtocol.ServiceType.stream will be effectively equivalent to Meta3dBsMostProtocol.ServiceType.stream. */
@bs.module("most")
external take: (
  int,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
) => Meta3dBsMostProtocol.ServiceType.stream<'a> = ""

/* Create a new Meta3dBsMostProtocol.ServiceType.stream that omits the first n events from Meta3dBsMostProtocol.ServiceType.stream.
 If Meta3dBsMostProtocol.ServiceType.stream contains fewer than n events, the returned Meta3dBsMostProtocol.ServiceType.stream will be empty. */
@bs.module("most")
external skip: (
  int,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
) => Meta3dBsMostProtocol.ServiceType.stream<'a> = ""

/* Create a new Meta3dBsMostProtocol.ServiceType.stream containing all events until predicate returns false. */
@bs.module("most")
external takeWhile: (
  'a => bool,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
) => Meta3dBsMostProtocol.ServiceType.stream<'a> = ""

/* Create a new Meta3dBsMostProtocol.ServiceType.stream containing all events after predicate returns false. */
@bs.module("most")
external skipWhile: (
  'a => bool,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
) => Meta3dBsMostProtocol.ServiceType.stream<'a> = ""

/* Create a new Meta3dBsMostProtocol.ServiceType.stream containing all events before and including when the predicate returns true. */
@bs.module("most")
external skipAfter: (
  'a => bool,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
) => Meta3dBsMostProtocol.ServiceType.stream<'a> = ""

/* Create a new Meta3dBsMostProtocol.ServiceType.stream containing all events until endSignal emits an event. */
@bs.module("most")
external until: (
  Meta3dBsMostProtocol.ServiceType.stream<'b>,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
) => Meta3dBsMostProtocol.ServiceType.stream<'a> = ""

/* Create a new Meta3dBsMostProtocol.ServiceType.stream containing all events after startSignal emits its first event. */
@bs.module("most")
external since: (
  Meta3dBsMostProtocol.ServiceType.stream<'b>,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
) => Meta3dBsMostProtocol.ServiceType.stream<'a> = ""

/* Create a new Meta3dBsMostProtocol.ServiceType.stream containing only events that occur during a dynamic time window. */
@bs.module("most")
external during: (
  Meta3dBsMostProtocol.ServiceType.stream<Meta3dBsMostProtocol.ServiceType.stream<'ending>>,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
) => Meta3dBsMostProtocol.ServiceType.stream<'a> = ""

/* **
 * Combining
 * */
/* Create a new Meta3dBsMostProtocol.ServiceType.stream containing events from stream1 and stream2. */
@bs.module("most")
external merge: (
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
) => Meta3dBsMostProtocol.ServiceType.stream<'a> = ""

/* Array form of merge. Create a new Meta3dBsMostProtocol.ServiceType.stream containing all events from all streams in the array. */
@bs.module("most")
external mergeArray: array<
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
> => Meta3dBsMostProtocol.ServiceType.stream<'a> = ""

/* Create a new Meta3dBsMostProtocol.ServiceType.stream that emits the set of latest event values from all input streams
 whenever a new event arrives on any input Meta3dBsMostProtocol.ServiceType.stream. */
@bs.module("most")
external combine: (
  ('a, 'b) => 'c,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
  Meta3dBsMostProtocol.ServiceType.stream<'b>,
) => Meta3dBsMostProtocol.ServiceType.stream<'c> = ""

/* Array form of combine. Create a new Meta3dBsMostProtocol.ServiceType.stream that emits the set of latest event values
 from all input streams whenever a new event arrives on any input Meta3dBsMostProtocol.ServiceType.stream. */
/* NOTE: This is not included yet due to the variadic callback requirement... */
/* external combineArray : (array 'a => 'b) => array (Meta3dBsMostProtocol.ServiceType.stream 'a) => Meta3dBsMostProtocol.ServiceType.stream 'a = "" [@@bs.module "most"]; */
/* Create a new Meta3dBsMostProtocol.ServiceType.stream by combining sampled values from many input streams. */
@bs.module("most")
external sample1: (
  'a => 'b,
  Meta3dBsMostProtocol.ServiceType.stream<'sample>,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
) => Meta3dBsMostProtocol.ServiceType.stream<'b> = "sample"

@bs.module("most")
external sample2: (
  ('a, 'a) => 'b,
  Meta3dBsMostProtocol.ServiceType.stream<'sample>,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
) => Meta3dBsMostProtocol.ServiceType.stream<'b> = "sample"

@bs.module("most")
external sample3: (
  ('a, 'a, 'a) => 'b,
  Meta3dBsMostProtocol.ServiceType.stream<'sample>,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
) => Meta3dBsMostProtocol.ServiceType.stream<'b> = "sample"

@bs.module("most")
external sample4: (
  ('a, 'a, 'a, 'a) => 'b,
  Meta3dBsMostProtocol.ServiceType.stream<'sample>,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
) => Meta3dBsMostProtocol.ServiceType.stream<'b> = "sample"

@bs.module("most")
external sample5: (
  ('a, 'a, 'a, 'a, 'a) => 'b,
  Meta3dBsMostProtocol.ServiceType.stream<'sample>,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
) => Meta3dBsMostProtocol.ServiceType.stream<'b> = "sample"

@bs.module("most")
external sample6: (
  ('a, 'a, 'a, 'a, 'a, 'a) => 'b,
  Meta3dBsMostProtocol.ServiceType.stream<'sample>,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
) => Meta3dBsMostProtocol.ServiceType.stream<'b> = "sample"

/* When an event arrives on asampler, emit the latest event value from a Meta3dBsMostProtocol.ServiceType.stream of values. */
@bs.module("most")
external sampleWith: (
  Meta3dBsMostProtocol.ServiceType.stream<'sample>,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
) => Meta3dBsMostProtocol.ServiceType.stream<'a> = ""

@bs.module("most")
external zip: (
  ('a, 'b) => 'c,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
  Meta3dBsMostProtocol.ServiceType.stream<'b>,
) => Meta3dBsMostProtocol.ServiceType.stream<'c> = ""

/* **
 * Combining higher-order streams
 * */
/* Given a higher-order Meta3dBsMostProtocol.ServiceType.stream, return a new Meta3dBsMostProtocol.ServiceType.stream that adopts the behavior of
 (ie emits the events of) the most recent inner Meta3dBsMostProtocol.ServiceType.stream. */
@bs.module("most")
external switchLatest: Meta3dBsMostProtocol.ServiceType.stream<
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
> => Meta3dBsMostProtocol.ServiceType.stream<'a> = ""

/* Given a higher-order Meta3dBsMostProtocol.ServiceType.stream, return a new Meta3dBsMostProtocol.ServiceType.stream that merges all the inner streams as they arrive. */
@bs.module("most")
external join: Meta3dBsMostProtocol.ServiceType.stream<
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
> => Meta3dBsMostProtocol.ServiceType.stream<'a> = ""

/* Given a higher-order Meta3dBsMostProtocol.ServiceType.stream, return a new Meta3dBsMostProtocol.ServiceType.stream that merges inner streams as they arrive
   up to the specified concurrency. Once concurrency number of streams are being merged,
   newly arriving streams will be merged after an existing one ends. */
@bs.module("most")
external mergeConcurrently: (
  int,
  Meta3dBsMostProtocol.ServiceType.stream<Meta3dBsMostProtocol.ServiceType.stream<'a>>,
) => Meta3dBsMostProtocol.ServiceType.stream<'a> = ""

/* **
 * Awaiting promises
 * */
/* Given a Meta3dBsMostProtocol.ServiceType.stream of promises, ie Stream<Promise<X>>,
   return a new Meta3dBsMostProtocol.ServiceType.stream containing the fulfillment values, ie Stream<X>.
   Event times may be delayed. However, event order is always preserved,
   regardless of promise fulfillment order.
   To create a Meta3dBsMostProtocol.ServiceType.stream that merges promises in fulfillment order,
   use `flatMap(fromPromise, Meta3dBsMostProtocol.ServiceType.stream)`.
   If a promise rejects, the Meta3dBsMostProtocol.ServiceType.stream will be in an error state
   with the rejected promise's reason as its error.
   See recoverWith for error recovery. */
@bs.module("most")
external awaitPromises: Meta3dBsMostProtocol.ServiceType.stream<
  Js.Promise.t<'a>,
> => Meta3dBsMostProtocol.ServiceType.stream<'a> = ""

/* **
 * Rate limiting streams
 */
/* Wait for a burst of events to subside and emit only the last event in the burst.
   If the Meta3dBsMostProtocol.ServiceType.stream ends while there is a pending debounced event (e.g. via `until`),
   the pending event will be emitted just before the Meta3dBsMostProtocol.ServiceType.stream ends. */
@bs.module("most")
external debounce: (
  int,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
) => Meta3dBsMostProtocol.ServiceType.stream<'a> = ""

/* Limit the rate of events to at most one per throttlePeriod. */
@bs.module("most")
external throttle: (
  int,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
) => Meta3dBsMostProtocol.ServiceType.stream<'a> = ""

/* **
 * Delaying streams
 * */
/* Timeshift a Meta3dBsMostProtocol.ServiceType.stream by a delay time in milliseconds. */
@bs.module("most")
external delay: (
  int,
  Meta3dBsMostProtocol.ServiceType.stream<'a>,
) => Meta3dBsMostProtocol.ServiceType.stream<'a> = ""

/* **
 * Sharing streams
 * */
/* Returns a Meta3dBsMostProtocol.ServiceType.stream equivalent to the original, but which can be shared more efficiently among multiple consumers. */
@bs.module("most")
external multicast: Meta3dBsMostProtocol.ServiceType.stream<'a> => Meta3dBsMostProtocol.ServiceType.stream<
  'a,
> = ""

/* **
 *  Subjects!
 * */
module Subject = {
  type t<'a>
  @bs.module("most-subject") external make: unit => t<'a> = "async"
  external asStream: t<'a> => Meta3dBsMostProtocol.ServiceType.stream<'a> = "%identity"
  @bs.module("most-subject") external next: ('a, t<'a>) => t<'a> = ""
  @bs.module("most-subject")
  external error: (Js.Exn.t, t<'a>) => t<Js.Exn.t> = ""
  @bs.send external complete: t<'a> => t<'a> = ""
  @bs.module("most-subject")
  external completeWith: ('a, t<'a>) => t<'a> = "complete"
}
