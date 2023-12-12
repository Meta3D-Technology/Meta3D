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

// let _buildProtocolName = name => {
//   j`${name->Js.String.replaceByRe(%re("/_/g"), "-", _)}-protocol`
// }

let _handleProtocolName = name => {
  name->Js.String.replaceByRe(%re("/_/g"), "-", _)
}

let buildCustomInputProtocolNamePrefix = () => {
  "-input-custom-"
}

let buildCustomActionProtocolNamePrefix = () => {
  "-action-custom-"
}

let _buildPackageData = (
  account,
  name,
  protocolName,
): Meta3d.ExtensionFileType.contributePackageData => {
  {
    name,
    version: getElementContributeVersion(),
    account,
    protocol: {
      name: protocolName,
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
  protocolName,
) => {
  // let name = name->_handleName

  selectedContributes->Meta3dCommonlib.ListSt.push(
    generateContribute(. _buildPackageData(account, name, protocolName), fileStr)
    ->loadContribute(. _)
    ->buildContribute(~id=name, ~version=getElementContributeVersion(), ~data=_, ()),
  )
}

let _addGeneratedContributeForRunApp = (
  (generateContribute, loadContribute, convertContributeFuncData),
  allContributeDataList,
  account,
  (name, fileStr),
  protocolName,
) => {
  // let name = name->_handleName

  let {contributePackageData, contributeFuncData}: Meta3d.ExtensionFileType.contributeFileData =
    generateContribute(_buildPackageData(account, name, protocolName), fileStr)->loadContribute

  allContributeDataList->Meta3dCommonlib.ListSt.push(
    (
      {
        contributePackageData,
        contributeFuncData: convertContributeFuncData(contributeFuncData),
      }: Meta3d.AppAndPackageFileType.contributeFileData
    ),
  )
}

let buildCustomInputProtocolName = name => {
  j`meta3d${buildCustomInputProtocolNamePrefix()}${name}-protocol`->_handleProtocolName
}

let buildCustomActionProtocolName = name => {
  j`meta3d${buildCustomActionProtocolNamePrefix()}${name}-protocol`->_handleProtocolName
}

let addGeneratedInputContributesForElementAssemble = (
  (generateContribute, loadContribute),
  selectedContributes,
  account,
  customInputs: ElementAssembleStoreType.customInputs,
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
      // j`meta3d${buildCustomInputProtocolNamePrefix()}${name}-protocol`->_handleProtocolName,
      buildCustomInputProtocolName(name),
    )
  })
}

let addGeneratedInputContributesForRunApp = (
  (generateContribute, loadContribute, convertContributeFuncData),
  allContributeDataList,
  account,
  customInputs: ElementAssembleStoreType.customInputs,
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
      // j`meta3d${buildCustomInputProtocolNamePrefix()}${name}-protocol`->_handleProtocolName,
      buildCustomInputProtocolName(name),
    )
  })
}

let rec addGeneratedActionContributesForElementAssemble = (
  (generateContribute, loadContribute),
  selectedContributes,
  account,
  customActions: ElementAssembleStoreType.customActions,
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
      // j`meta3d${buildCustomActionProtocolNamePrefix()}${name}-protocol`->_handleProtocolName,
      buildCustomActionProtocolName(name),
    )
  })
}

let addGeneratedActionContributesForRunApp = (
  (generateContribute, loadContribute, convertContributeFuncData),
  allContributeDataList,
  account,
  customActions: ElementAssembleStoreType.customActions,
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
      // j`meta3d${buildCustomActionProtocolNamePrefix()}${name}-protocol`->_handleProtocolName,
      buildCustomActionProtocolName(name),
    )
  })
}
