open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/assemble_space.feature")

defineFeature(feature, test => {
  test(."show ui", ({given, \"when", \"and", then}) => {
    \"when"("render ui", () => {
      ()
    })

    then("should show correct ui", () => {
      ReactTestRenderer.create(<AssembleSpace />)->ReactTestTool.createSnapshotAndMatch
    })
  })
})
