open StreamType

type value

type service = {
  just: 'a. 'a => stream<'a>,
  concat: 'a. (stream<'a>, stream<'a>) => stream<'a>,
  map: 'a 'b. ('a => 'b, stream<'a>) => stream<'b>,
  flatMap: 'a 'b. ('a => stream<'b>, stream<'a>) => stream<'b>,
  mergeArray: 'a. array<stream<'a>> => stream<'a>,
  concatArray: 'a. array<stream<'a>> => stream<'a>,
  callFunc: 'a. (unit => 'a) => stream<'a>,
}
