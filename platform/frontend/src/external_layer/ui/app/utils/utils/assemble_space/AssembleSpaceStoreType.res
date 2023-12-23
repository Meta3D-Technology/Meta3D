type text = string

type link = string

type docDrawerData = list<(text, link)>

type action = ..

type action +=
  | ResetWhenEnter
  | ResetWhenSwitch
  | OpenDocDrawer(docDrawerData)
  | CloseDocDrawer
  | ApAssembleAction(ApAssembleStoreType.action)
  | ElementAssembleAction(ElementAssembleStoreType.action)
  | PackageAssembleAction(PackageAssembleStoreType.action)

type state = {
  apAssembleState: ApAssembleStoreType.state,
  elementAssembleState: ElementAssembleStoreType.state,
  packageAssembleState: PackageAssembleStoreType.state,
  docDrawerData: option<docDrawerData>,
}
