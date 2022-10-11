type action = ..

type action +=
  | Reset
  | ApAssembleAction(ApAssembleStoreType.action)
  | ElementAssembleAction(ElementAssembleStoreType.action)

type state = {
  isDebug: bool,
  apAssembleState: ApAssembleStoreType.state,
  elementAssembleState: ElementAssembleStoreType.state,
}
