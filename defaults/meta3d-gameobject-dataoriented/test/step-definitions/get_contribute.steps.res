open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open StateType

let feature = loadFeature("./test/features/get_contribute.feature")

defineFeature(feature, test => {
  let contribute = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))

  test(."create a state", ({\"when", then}) => {
    \"when"("I get contribute", () => {
      contribute := Main.getGameObjectContribute()
    })

    then("createStateFunc should create a state", () => {
      contribute.contents.createStateFunc()->expect == {
          maxUID: 0,
        }
    })
  })

  test(."create a gameObject", ({\"when", \"and", then}) => {
    \"when"("I get contribute", () => {
      contribute := Main.getGameObjectContribute()
    })

    \"and"("create a state", () => {
      state := contribute.contents.createStateFunc()
    })

    then("createGameObjectFunc should create a gameObject", () => {
      let (state, gameObject) = contribute.contents.createGameObjectFunc(. state.contents)

      state.maxUID->expect == 1
      gameObject->expect == 0
    })
  })

  test(."get all gameObjects", ({\"when", \"and", then}) => {
    let allGameObjects = []

    \"when"("I get contribute", () => {
      contribute := Main.getGameObjectContribute()
    })

    \"and"("create a state", () => {
      state := contribute.contents.createStateFunc()
    })

    \"and"("create two gameObjects", () => {
      let (s1, g1) = contribute.contents.createGameObjectFunc(. state.contents)
      let (s2, g2) = contribute.contents.createGameObjectFunc(. s1)

      state := s2
      allGameObjects->Meta3dCommonlib.ArraySt.push(g1)->Meta3dCommonlib.ArraySt.push(g2)->ignore
    })

    then("getAllGameObjects should return them", () => {
      contribute.contents.getAllGameObjectsFunc(. state.contents)->expect == allGameObjects
    })
  })
})
