type protocolIconBase64 = string

type protocolConfigStr = string

type id = string

// type newName = string

type version = string

type extension = {
  id: id,
  protocolIconBase64: protocolIconBase64,
  protocolConfigStr: option<protocolConfigStr>,
  // newName: option<newName>,
  isStart: bool,
  version: version,
  data: Meta3d.ExtensionFileType.extensionFileData,
}

type selectedExtensions = list<extension>

type contribute = {
  id: id,
  protocolIconBase64: protocolIconBase64,
  protocolConfigStr: option<protocolConfigStr>,
  // newName: option<newName>,
  version: version,
  data: Meta3d.ExtensionFileType.contributeFileData,
}

// type selectedContributes = list<(
//   contribute,
//   option<FrontendUtils.CommonType.protocolConfig>,
// )>

type selectedContributes = list<contribute>

type package = AssembleSpaceCommonType.packageData

type selectedPackages = list<package>

type isDebug = bool

type clearColor = (float, float, float, float)

type skinName = string

type apInspectorData = {
  isDebug: isDebug,
  clearColor: clearColor,
  skinName: option<skinName>,
}

type action =
  | Reset
  | ResetWhenSwitch
  | SelectPackage(package)
  | SelectExtension(
      protocolIconBase64,
      option<protocolConfigStr>,
      AssembleSpaceCommonType.extension,
    )
  | SetInspectorCurrentExtensionId(id)
  | StartExtension(id)
  | UnStartExtension(id)
  // | SetExtensionNewName(id, newName)
  | SelectContribute(
      protocolIconBase64,
      option<protocolConfigStr>,
      AssembleSpaceCommonType.contribute,
    )
  | SetInspectorCurrentContributeId(id)
  | SetInspectorCurrentPackageId(id)
  // | SetContributeNewName(id, newName)
  | ShowApInspector
  | SetIsDebug(isDebug)
  | SetClearColor(clearColor)
  | SetSkinName(option<skinName>)
  | UpdateSelectedExtension(id, Js.Typed_array.Uint8Array.t)
  | UpdateSelectedContribute(id, Js.Typed_array.Uint8Array.t)
  | UpdateSelectedPackage(id, Js.Typed_array.ArrayBuffer.t)
  | MarkIsPassDependencyGraphCheck(bool)
  | StorePackageInApp(id)
  | UnStorePackageInApp(id)
  | BatchStorePackagesInApp(list<id>)

type state = {
  selectedPackages: selectedPackages,
  selectedExtensions: selectedExtensions,
  selectedContributes: selectedContributes,
  inspectorCurrentExtensionId: option<id>,
  inspectorCurrentContributeId: option<id>,
  inspectorCurrentPackageId: option<id>,
  isShowApInspector: bool,
  apInspectorData: apInspectorData,
  isPassDependencyGraphCheck: bool,
  storedPackageIdsInApp: list<id>,
}
