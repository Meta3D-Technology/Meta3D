let generateUniqueKey = (random) => {
  (random() *. 1000000.0)->Js.Math.floor_int->Js.Int.toString
}
