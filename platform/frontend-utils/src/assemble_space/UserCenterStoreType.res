type id = AssembleSpaceCommonType.id

type extension = AssembleSpaceCommonType.extension

type selectedExtensions = list<AssembleSpaceCommonType.extensionData>

type contribute = AssembleSpaceCommonType.contribute

type selectedContributes = list<AssembleSpaceCommonType.contributeData>

type packageData = AssembleSpaceCommonType.packageData

type selectedPackages = list<packageData>

type selectedElements = list<FrontendUtils.BackendCloudbaseType.elementAssembleData>

type account = string

type name = string

type action =
  | SelectExtension(extension, option<CommonType.protocolConfig>)
  | NotSelectExtension(name, AssembleSpaceCommonType.version)
  | SelectContribute(contribute, option<CommonType.protocolConfig>)
  | NotSelectContribute(name, AssembleSpaceCommonType.version)
  | SelectPackage(packageData)
  // | NotSelectPackage(id)
  | NotSelectPackage(name, AssembleSpaceCommonType.version)
  | SelectElement(FrontendUtils.BackendCloudbaseType.elementAssembleData)
  | NotSelectElement(
      FrontendUtils.BackendCloudbaseType.elementName,
      FrontendUtils.BackendCloudbaseType.elementVersion,
    )
  | SelectAllElements(list<FrontendUtils.BackendCloudbaseType.elementAssembleData>)
  | SetAccount(account)
  | ImportPackage(id, selectedExtensions, selectedContributes, selectedPackages)
  | ImportApp(id, selectedExtensions, selectedContributes, selectedPackages)
  | UpdateSelectedPackagesAndExtensionsAndContributes(
      selectedPackages,
      selectedExtensions,
      selectedContributes,
    )

type state = {
  account: option<string>,
  selectedExtensions: selectedExtensions,
  selectedContributes: selectedContributes,
  selectedPackages: selectedPackages,
  selectedElements: selectedElements,
  importedPackageIds: list<id>,
  importedAppIds: list<id>,
}
