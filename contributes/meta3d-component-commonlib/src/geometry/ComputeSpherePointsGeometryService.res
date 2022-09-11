open Js.Typed_array

let compute = (radius, bands) => {
  let latitudeBands = bands
  let longitudeBands = bands

  let vertices = []
  let normals = []
  let texCoords = []
  let indices = []

  for latNumber in 0 to latitudeBands {
    let latNumber = latNumber->Belt.Float.fromInt
    let latitudeBands = latitudeBands->Belt.Float.fromInt

    let theta = latNumber *. Js.Math._PI /. latitudeBands
    let sinTheta = Js.Math.sin(theta)
    let cosTheta = Js.Math.cos(theta)

    for longNumber in 0 to longitudeBands {
      let longNumber = longNumber->Belt.Float.fromInt
      let longitudeBands = longitudeBands->Belt.Float.fromInt

      let phi = longNumber *. 2. *. Js.Math._PI /. longitudeBands
      let sinPhi = Js.Math.sin(phi)
      let cosPhi = Js.Math.cos(phi)

      let x = radius *. cosPhi *. sinTheta
      let y = radius *. cosTheta
      let z = radius *. sinPhi *. sinTheta
      let u = 1. -. longNumber /. longitudeBands
      let v = 1. -. latNumber /. latitudeBands

      vertices
      ->Meta3dCommonlib.ArraySt.push(x)
      ->Meta3dCommonlib.ArraySt.push(y)
      ->Meta3dCommonlib.ArraySt.push(z)
      ->ignore

      normals
      ->Meta3dCommonlib.ArraySt.push(x)
      ->Meta3dCommonlib.ArraySt.push(y)
      ->Meta3dCommonlib.ArraySt.push(z)
      ->ignore

      texCoords->Meta3dCommonlib.ArraySt.push(u)->Meta3dCommonlib.ArraySt.push(v)->ignore
    }
  }

  for latNumber in 0 to latitudeBands - 1 {
    for longNumber in 0 to longitudeBands - 1 {
      let first = latNumber * (longitudeBands + 1) + longNumber
      let second = first + longitudeBands + 1

      indices
      ->Meta3dCommonlib.ArraySt.push(first + 1)
      ->Meta3dCommonlib.ArraySt.push(second)
      ->Meta3dCommonlib.ArraySt.push(first)
      ->Meta3dCommonlib.ArraySt.push(first + 1)
      ->Meta3dCommonlib.ArraySt.push(second + 1)
      ->Meta3dCommonlib.ArraySt.push(second)
      ->ignore
    }
  }

  (vertices, texCoords, normals, indices)->ComputePointsGeometryService.addTangents
}
