open StateType

let clone = (state, countRange, sourceGeometry) => {
  (state, countRange->Js.Array.map(_ => sourceGeometry, _))
}
