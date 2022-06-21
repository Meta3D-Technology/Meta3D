let bind = (p, func) => {
  p->Js.Promise.then_(func, _)
}

let map = (p: Js.Promise.t<'a>, func: 'a => 'b): Js.Promise.t<'b> => {
  p->Js.Promise.then_(v => v->func->Js.Promise.resolve, _)
}
