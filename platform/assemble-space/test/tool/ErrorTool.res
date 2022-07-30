let isMessageMatch  = (exn, targetMessage, expect) => {
open Meta3dBsJestCucumber
open Operators

exn -> Js.Exn.message-> Meta3dCommonlib.OptionSt.getExn -> Js.String.includes(targetMessage, _) -> expect == true
}