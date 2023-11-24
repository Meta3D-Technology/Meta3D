let getElementContributeProtocolName = () => "meta3d-element-assemble-element-protocol"

let getElementContributeVersion = () => VersionConfig.getPlatformVersion()

let getElementContributeProtocolVersion = () => {
  j`^${VersionConfig.getPlatformVersion()}`
}

let buildContribute = (~version, ~data, ~id="", ()): ApAssembleStoreType.contribute => {
  id,
  version,
  protocolIconBase64: "",
  protocolConfigStr: None,
  data,
}

// let _handleName = name => {
//   name->Js.String.replaceByRe(%re("/-/g"), "_", _)
// }

let _buildProtocolName = name => {
  j`${name->Js.String.replaceByRe(%re("/_/g"), "-", _)}-protocol`
}

let _buildPackageData = (account, name): Meta3d.ExtensionFileType.contributePackageData => {
  {
    name,
    version: getElementContributeVersion(),
    account,
    protocol: {
      name: _buildProtocolName(name),
      version: getElementContributeProtocolVersion(),
    },
    displayName: "",
    repoLink: "",
    description: "",
    dependentPackageStoredInAppProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    dependentBlockProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  }
}

let _addGeneratedContributeForElementAssemble = (
  (generateContribute, loadContribute),
  selectedContributes,
  account,
  (name, fileStr),
) => {
  // let name = name->_handleName

  selectedContributes->Meta3dCommonlib.ListSt.push(
    generateContribute(. _buildPackageData(account, name), fileStr)
    ->loadContribute(. _)
    ->buildContribute(~id=name, ~version=getElementContributeVersion(), ~data=_, ()),
  )
}

let _addGeneratedContributeForRunApp = (
  (generateContribute, loadContribute, convertContributeFuncData),
  allContributeDataList,
  account,
  (name, fileStr),
) => {
  // let name = name->_handleName

  let {contributePackageData, contributeFuncData}: Meta3d.ExtensionFileType.contributeFileData =
    generateContribute(_buildPackageData(account, name), fileStr)->loadContribute

  allContributeDataList->Meta3dCommonlib.ListSt.push(
    (
      {
        contributePackageData,
        contributeFuncData: convertContributeFuncData(contributeFuncData),
      }: Meta3d.AppAndPackageFileType.contributeFileData
    ),
  )
}

let addGeneratedInputContributesForElementAssemble = (
  (generateContribute, loadContribute),
  selectedContributes,
  account,
  customInputs: ApAssembleStoreType.customInputs,
) => {
  customInputs->Meta3dCommonlib.ListSt.reduce(selectedContributes, (
    selectedContributes,
    {name, fileStr},
  ) => {
    _addGeneratedContributeForElementAssemble(
      (generateContribute, loadContribute),
      selectedContributes,
      account,
      (name, fileStr),
    )
  })
}

let addGeneratedInputContributesForRunApp = (
  (generateContribute, loadContribute, convertContributeFuncData),
  allContributeDataList,
  account,
  customInputs: ApAssembleStoreType.customInputs,
) => {
  customInputs->Meta3dCommonlib.ListSt.reduce(allContributeDataList, (
    allContributeDataList,
    {name, fileStr},
  ) => {
    _addGeneratedContributeForRunApp(
      (generateContribute, loadContribute, convertContributeFuncData),
      allContributeDataList,
      account,
      (name, fileStr),
    )
  })
}

let rec addGeneratedActionContributesForElementAssemble = (
  (generateContribute, loadContribute),
  selectedContributes,
  account,
  customActions: ApAssembleStoreType.customActions,
) => {
  customActions->Meta3dCommonlib.ListSt.reduce(selectedContributes, (
    selectedContributes,
    {name, fileStr},
  ) => {
    _addGeneratedContributeForElementAssemble(
      (generateContribute, loadContribute),
      selectedContributes,
      account,
      (name, fileStr),
    )
  })
}

let addGeneratedActionContributesForRunApp = (
  (generateContribute, loadContribute, convertContributeFuncData),
  allContributeDataList,
  account,
  customActions: ApAssembleStoreType.customActions,
) => {
  customActions->Meta3dCommonlib.ListSt.reduce(allContributeDataList, (
    allContributeDataList,
    {name, fileStr},
  ) => {
    _addGeneratedContributeForRunApp(
      (generateContribute, loadContribute, convertContributeFuncData),
      allContributeDataList,
      account,
      (name, fileStr),
    )
  })
}
