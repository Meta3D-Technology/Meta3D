open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/redo_undo.feature")

defineFeature(feature, test => {
  test(."restore state", ({given, \"when", \"and", then}) => {
    let extensionProtocolName = "e1-protocol"
    let s1 = ref(Obj.magic(1))
    let s2 = ref(Obj.magic(1))
    let state = ref(Obj.magic(1))
    let e1 = ref(Obj.magic(1))
    let e2 = ref(Obj.magic(1))

    given(
      "create state s1",
      () => {
        s1 := StateTool.create()
      },
    )

    \"and"(
      "register extension e1 with s1 that e1's state is es1",
      () => {
        s1 :=
          Main.registerExtension(
            s1.contents,
            extensionProtocolName,
            ExtensionTool.buildGetServiceFunc(Obj.magic(1))->Obj.magic,
            ExtensionTool.buildGetLifeFunc(
              ~onRestore=Meta3dCommonlib.NullableSt.return(
                (currentState, targetState) => targetState,
              ),
              ~onDeepCopy=Meta3dCommonlib.NullableSt.return(
                state => {
                  Main.setExtensionState(
                    state,
                    extensionProtocolName,
                  {
                    "data1": (
                      Main.getExtensionState(state, extensionProtocolName)
                      ->Obj.magic)["data1"]->Meta3dCommonlib.ArraySt.copy,
                  }->Obj.magic
                  )
                },
              ),
              (),
            )->Obj.magic,
            {
              "data1": [],
            }->Obj.magic,
          )
      },
    )

    \"and"(
      "deep copy s1 as s2",
      () => {
        s2 := Main.deepCopy(s1.contents)
      },
    )

    \"and"(
      "change e1's state to es2 with s2",
      () => {
        let es1 = Main.getExtensionState(s2.contents, extensionProtocolName)
        (es1->Obj.magic)["data1"]->Meta3dCommonlib.ArraySt.push(1)->ignore

        s2 := Main.setExtensionState(s2.contents, extensionProtocolName, es1)
      },
    )

    \"when"(
      "restore s2 to s1",
      () => {
        state := Main.restore(s2.contents, s1.contents)
      },
    )

    then(
      "e1's state should be es1",
      () => {
        (
          Main.getExtensionState(state.contents, extensionProtocolName)->Obj.magic
        )["data1"]->expect == []
      },
    )
  })
})
