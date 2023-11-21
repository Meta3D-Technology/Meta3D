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

// let _getInputProtocolName = uiControlProtocolName => {
//   uiControlProtocolName->Js.String.replace("-ui-control-", "-input-", _)
// }

let _buildInputProtocolName = inputName => {
  //   uiControlProtocolName->Js.String.replace("-ui-control-", "-input-", _)
  j`${inputName}-protocol`
}

let _buildPackageData = (
  account,
  //   protocolName,
  inputName,
): Meta3d.ExtensionFileType.contributePackageData => {
  {
    name: inputName,
    version: getElementContributeVersion(),
    account,
    protocol: {
      name: _buildInputProtocolName(inputName),
      version: getElementContributeProtocolVersion(),
    },
    displayName: "",
    repoLink: "",
    description: "",
    dependentPackageStoredInAppProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    dependentBlockProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  }
}

let addGeneratedInputContributeForElementAssemble = (
  (generateContribute, loadContribute),
  selectedContributes,
  account,
  selectedUIControlInspectorData: ElementAssembleStoreType.selectedUIControlInspectorData,
) => {
  selectedUIControlInspectorData->Meta3dCommonlib.ListSt.reduce(selectedContributes, (
    selectedContributes,
    {input},
  ) => {
    input
    ->Meta3dCommonlib.OptionSt.bind(({inputName, inputFileStr}: ElementAssembleStoreType.input) => {
      inputFileStr->Meta3dCommonlib.OptionSt.map(
        inputFileStr => {
          selectedContributes->Meta3dCommonlib.ListSt.push(
            generateContribute(. _buildPackageData(account, inputName), inputFileStr)
            ->loadContribute(. _)
            ->buildContribute(~id=inputName, ~version=getElementContributeVersion(), ~data=_, ()),
          )
        },
      )
    })
    ->Meta3dCommonlib.OptionSt.getWithDefault(selectedContributes)
  })
}

let addGeneratedInputContributeForRunApp = (
  (generateContribute, loadContribute),
  allContributeDataArr,
  account,
  selectedElements: UserCenterStoreType.selectedElements,
) => {
  selectedElements->Meta3dCommonlib.ListSt.reduce(allContributeDataArr, (
    allContributeDataArr,
    {inspectorData},
  ) => {
    inspectorData.uiControls->Meta3dCommonlib.ArraySt.reduceOneParam(
      (. allContributeDataArr, {input}) => {
        input
        ->Meta3dCommonlib.NullableSt.bind(
          ({inputName, inputFileStr}: BackendCloudbaseType.input) => {
            inputFileStr->Meta3dCommonlib.NullableSt.map(
              (. inputFileStr) => {
                allContributeDataArr->Meta3dCommonlib.ListSt.push(
                  generateContribute(.
                    _buildPackageData(account, inputName),
                    inputFileStr,
                  )->loadContribute(. _),
                )
              },
            )
          },
        )
        ->Meta3dCommonlib.NullableSt.getWithDefault(allContributeDataArr)
      },
      allContributeDataArr,
    )
  })
}
