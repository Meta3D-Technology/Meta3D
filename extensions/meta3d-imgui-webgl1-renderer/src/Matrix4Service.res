open Js.Typed_array

let createIdentityMatrix4 = () =>
  Js.Typed_array.Float32Array.make([
    1.,
    0.,
    0.,
    0.,
    0.,
    1.,
    0.,
    0.,
    0.,
    0.,
    1.,
    0.,
    0.,
    0.,
    0.,
    1.,
  ])

let ortho = (left, right, bottom, top, near, far, resultFloat32Arr) => {
  let lr = 1. /. (left -. right)
  let bt = 1. /. (bottom -. top)
  let nf = 1. /. (near -. far)

  Float32Array.unsafe_set(resultFloat32Arr, 0, (-2.) *. lr)
  Float32Array.unsafe_set(resultFloat32Arr, 1, 0.)
  Float32Array.unsafe_set(resultFloat32Arr, 2, 0.)
  Float32Array.unsafe_set(resultFloat32Arr, 3, 0.)
  Float32Array.unsafe_set(resultFloat32Arr, 4, 0.)
  Float32Array.unsafe_set(resultFloat32Arr, 5, (-2.) *. bt)
  Float32Array.unsafe_set(resultFloat32Arr, 6, 0.)
  Float32Array.unsafe_set(resultFloat32Arr, 7, 0.)
  Float32Array.unsafe_set(resultFloat32Arr, 8, 0.)
  Float32Array.unsafe_set(resultFloat32Arr, 9, 0.)
  Float32Array.unsafe_set(resultFloat32Arr, 10, 2. *. nf)
  Float32Array.unsafe_set(resultFloat32Arr, 11, 0.)
  Float32Array.unsafe_set(resultFloat32Arr, 12, (left +. right) *. lr)
  Float32Array.unsafe_set(resultFloat32Arr, 13, (top +. bottom) *. bt)
  Float32Array.unsafe_set(resultFloat32Arr, 14, (far +. near) *. nf)
  Float32Array.unsafe_set(resultFloat32Arr, 15, 1.)

  resultFloat32Arr
}