type id = AssembleSpaceCommonType.id

type extension = AssembleSpaceCommonType.extension

type selectedExtensions = list<AssembleSpaceCommonType.extensionData>

type contribute = AssembleSpaceCommonType.contribute

type selectedContributes = list<AssembleSpaceCommonType.contributeData>

type packageData = AssembleSpaceCommonType.packageData

type selectedPackages = list<packageData>

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
  | SetAccount(account)
  | ImportPackage(id, selectedExtensions, selectedContributes)
  | ImportApp(id, selectedExtensions, selectedContributes, selectedPackages)
  | UpdateSelectedPackagesAndExtensionsAndContributes(
      selectedPackages,
      selectedExtensions,
      selectedContributes,
    )
  | StorePackageInApp(id)
  | UnStorePackageInApp(id)
  | BatchStorePackagesInApp(list<id>)

type state = {
  account: option<string>,
  selectedExtensions: selectedExtensions,
  selectedContributes: selectedContributes,
  selectedPackages: selectedPackages,
  importedPackageIds: list<id>,
  importedAppIds: list<id>,
  storedPackageIdsInApp: AssembleSpaceCommonType.storedPackageIdsInApp,
}
