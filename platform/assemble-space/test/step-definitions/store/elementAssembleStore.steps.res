open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/store/elementAssembleStore.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))
  let id1 = ref(Obj.magic(1))
  let store = ref(Obj.magic(1))
  let rect = UIControlInspectorTool.buildRect()

  let _prepare = given => {
    given("prepare", () => {
      sandbox := createSandbox()
    })
  }

  let _prepareForSetAction = (given, \"and") => {
    given("init store", () => {
      store := ElementAssembleStore.initialState
    })

    \"and"("select ui control u1 with id1", () => {
      store :=
        ElementAssembleStore.reducer(
          store.contents,
          FrontendUtils.ElementAssembleStoreType.SelectUIControl(
            "",
            "",
            "",
            Obj.magic(1),
            UIControlInspectorTool.buildSkin("empty"),
          ),
        )

      id1 :=
        (
          store.contents.selectedUIControls
          ->Meta3dCommonlib.ListSt.head
          ->Meta3dCommonlib.OptionSt.getExn
        ).id
    })

    \"and"("set rect with id1", () => {
      store :=
        ElementAssembleStore.reducer(
          store.contents,
          FrontendUtils.ElementAssembleStoreType.SetRect(id1.contents, rect),
        )
    })
  }

  test(."set action", ({given, \"when", \"and", then}) => {
    let eventName = #click
    let actionName = "a1"

    _prepare(given)

    _prepareForSetAction(given, \"and")

    \"when"("set action with id1, event data1", () => {
      store :=
        ElementAssembleStore.reducer(
          store.contents,
          FrontendUtils.ElementAssembleStoreType.SetAction(
            id1.contents,
            (eventName, actionName->Some),
          ),
        )
    })

    then("should add event data1", () => {
      store.contents.selectedUIControlInspectorData->expect ==
        list{
          UIControlInspectorTool.buildUIControlInspectorData(
            ~id=id1.contents,
            ~event=[UIControlInspectorTool.buildEventData(eventName, actionName)],
            (),
          ),
        }
    })
  })

  test(."set action with empty action name", ({given, \"when", \"and", then}) => {
    let eventName = #click

    _prepare(given)

    _prepareForSetAction(given, \"and")

    given("set action with id1, event data1", () => {
      store :=
        ElementAssembleStore.reducer(
          store.contents,
          FrontendUtils.ElementAssembleStoreType.SetAction(id1.contents, (eventName, "a1"->Some)),
        )
    })

    \"when"("set action with id1, event data1 with empty action name", () => {
      store :=
        ElementAssembleStore.reducer(
          store.contents,
          FrontendUtils.ElementAssembleStoreType.SetAction(id1.contents, (eventName, None)),
        )
    })

    then("should remove the event data of id1", () => {
      store.contents.selectedUIControlInspectorData->expect ==
        list{UIControlInspectorTool.buildUIControlInspectorData(~id=id1.contents, ~event=[], ())}
    })
  })
})
