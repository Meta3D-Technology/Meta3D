open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/test1.feature")

defineFeature(feature, test => {
  test(."t1", ({given, \"when", \"and", then}) => {
    then("t1", () => {
      1->expect == 1
    })
  })

  test(."t2", ({given, \"when", \"and", then}) => {
    then("t2", () => {
      ReactTestRenderer.create(<Login />)->ReactTestTool.createSnapshotAndMatch
    })
  })
})
