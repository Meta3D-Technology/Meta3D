open StreamType

type value

type service = {
  tap: 'a. ('a => unit, stream<'a>) => stream<'a>,
  filter: 'a. ('a => bool, stream<'a>) => stream<'a>,
  take: 'a. (int, stream<'a>) => stream<'a>,
  // fromEvent: (string, Dom.eventTarget, bool) => stream<Dom.event>,
  fromEvent: 'eventTarget 'event. (string, 'eventTarget, bool) => stream<'event>,
  just: 'a. 'a => stream<'a>,
  concat: 'a. (stream<'a>, stream<'a>) => stream<'a>,
  map: 'a 'b. ('a => 'b, stream<'a>) => stream<'b>,
  flatMap: 'a 'b. ('a => stream<'b>, stream<'a>) => stream<'b>,
  mergeArray: 'a. array<stream<'a>> => stream<'a>,
  concatArray: 'a. array<stream<'a>> => stream<'a>,
  callFunc: 'a. (unit => 'a) => stream<'a>,
  drain: 'a. stream<'a> => Js.Promise.t<unit>,
}
