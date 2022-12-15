type action = ..

type action +=
  | Reset
  | ApAssembleAction(ApAssembleStoreType.action)
  | ElementAssembleAction(ElementAssembleStoreType.action)
  | PackageAssembleAction(PackageAssembleStoreType.action)

type state = {
  apAssembleState: ApAssembleStoreType.state,
  elementAssembleState: ElementAssembleStoreType.state,
  packageAssembleState: PackageAssembleStoreType.state,
}
