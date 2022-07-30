let generateId = () => {
  (Js.Math.random() *. 1000000.0)->Js.Math.floor_int->Js.Int.toString
}
