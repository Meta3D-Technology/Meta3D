open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/batch_dispose_before_defer_dispose.feature")

defineFeature(feature, test => {
  let contribute = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))
  let gameObject = ref(Obj.magic(1))

  let _createState = (~isDebug=false, ()) => {
    StateTool.createState(~contribute=contribute.contents, ~isDebug, ())
  }

  let _getContributeAndCreateAState = ((given, \"and")) => {
    given("I get contribute", () => {
      contribute := Main.getGameObjectContribute()
    })

    \"and"("create a state and open debug", () => {
      state := StateTool.createState(~contribute=contribute.contents, ~isDebug=true, ())
    })
  }

  test(."if dispose before defer dispose, contract error", ({given, \"and", \"when", then}) => {
    _getContributeAndCreateAState((given, \"and"))

    given("create a gameObject", () => {
      let (s, g) = contribute.contents.createGameObjectFunc(. state.contents)

      state := s
      gameObject := g
    })

    \"when"("dispose the gameObject", () => {
      ()
    })

    then(%re("/^should contract error: \"(.*)\"$/")->Obj.magic, arg0 => {
      expect(() => {
        let (gs, ts) = contribute.contents.batchDisposeGameObjectsFunc(.
          (state.contents, Obj.magic(1)),
          Obj.magic(1),
          [gameObject.contents],
        )
      })->toThrowMessage(arg0->Obj.magic)
    })
  })
})
