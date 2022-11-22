type action = ..

type action +=
  | Reset
  | ApAssembleAction(ApAssembleStoreType.action)
  | ElementAssembleAction(ElementAssembleStoreType.action)

type state = {
  apAssembleState: ApAssembleStoreType.state,
  elementAssembleState: ElementAssembleStoreType.state,
}
