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

let _buildProtocolName = name => {
  j`${name}-protocol`
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

let rec addGeneratedInputContributeForElementAssemble = (
  (generateContribute, loadContribute),
  selectedContributes,
  account,
  selectedUIControlInspectorData: ElementAssembleStoreType.selectedUIControlInspectorData,
) => {
  selectedUIControlInspectorData->Meta3dCommonlib.ListSt.reduce(selectedContributes, (
    selectedContributes,
    {input, children},
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
    ->addGeneratedInputContributeForElementAssemble(
      (generateContribute, loadContribute),
      _,
      account,
      children,
    )
  })
}

let addGeneratedInputContributeForRunApp = (
  (generateContribute, loadContribute, convertContributeFuncData),
  allContributeDataArr,
  account,
  {inspectorData}: BackendCloudbaseType.elementAssembleData,
) => {
  let rec _func = (allContributeDataArr, uiControls) => {
    uiControls->Meta3dCommonlib.ArraySt.reduceOneParam(
      (. allContributeDataArr, {input, children}: BackendCloudbaseType.uiControl) => {
        input
        ->Meta3dCommonlib.NullableSt.bind((
          {inputName, inputFileStr}: BackendCloudbaseType.input,
        ) => {
          inputFileStr->Meta3dCommonlib.NullableSt.map(
            (. inputFileStr) => {
              let {
                contributePackageData,
                contributeFuncData,
              }: Meta3d.ExtensionFileType.contributeFileData =
                generateContribute(
                  _buildPackageData(account, inputName),
                  inputFileStr,
                )->loadContribute

              allContributeDataArr->Meta3dCommonlib.ListSt.push(
                (
                  {
                    contributePackageData,
                    contributeFuncData: convertContributeFuncData(contributeFuncData),
                  }: Meta3d.AppAndPackageFileType.contributeFileData
                ),
              )
            },
          )
        })
        ->Meta3dCommonlib.NullableSt.getWithDefault(allContributeDataArr)
        ->_func(children)
      },
      allContributeDataArr,
    )
  }

  _func(allContributeDataArr, inspectorData.uiControls)
}

let rec addGeneratedActionContributesForElementAssemble = (
  (generateContribute, loadContribute),
  selectedContributes,
  account,
  selectedUIControlInspectorData: ElementAssembleStoreType.selectedUIControlInspectorData,
) => {
  selectedUIControlInspectorData->Meta3dCommonlib.ListSt.reduce(selectedContributes, (
    selectedContributes,
    {event, children},
  ) => {
    event
    ->Meta3dCommonlib.ArraySt.reduceOneParam(
      (. selectedContributes, {actionName, actionFileStr}) => {
        actionFileStr
        ->Meta3dCommonlib.OptionSt.map(
          actionFileStr => {
            selectedContributes->Meta3dCommonlib.ListSt.push(
              generateContribute(. _buildPackageData(account, actionName), actionFileStr)
              ->loadContribute(. _)
              ->buildContribute(
                ~id=actionName,
                ~version=getElementContributeVersion(),
                ~data=_,
                (),
              ),
            )
          },
        )
        ->Meta3dCommonlib.OptionSt.getWithDefault(selectedContributes)
      },
      selectedContributes,
    )
    ->addGeneratedActionContributesForElementAssemble(
      (generateContribute, loadContribute),
      _,
      account,
      children,
    )
  })
}

let addGeneratedActionContributesForRunApp = (
  (generateContribute, loadContribute, convertContributeFuncData),
  allContributeDataArr,
  account,
  {inspectorData}: BackendCloudbaseType.elementAssembleData,
) => {
  let rec _func = (allContributeDataArr, uiControls) => {
    uiControls->Meta3dCommonlib.ArraySt.reduceOneParam(
      (. allContributeDataArr, {event, children}: BackendCloudbaseType.uiControl) => {
        event
        ->Meta3dCommonlib.ArraySt.reduceOneParam(
          (. allContributeDataArr, {actionName, actionFileStr}: BackendCloudbaseType.eventData) => {
            actionFileStr
            ->Meta3dCommonlib.NullableSt.map(
              (. actionFileStr) => {
                let {
                  contributePackageData,
                  contributeFuncData,
                }: Meta3d.ExtensionFileType.contributeFileData =
                  generateContribute(
                    _buildPackageData(account, actionName),
                    actionFileStr,
                  )->loadContribute

                allContributeDataArr->Meta3dCommonlib.ListSt.push(
                  (
                    {
                      contributePackageData,
                      contributeFuncData: convertContributeFuncData(contributeFuncData),
                    }: Meta3d.AppAndPackageFileType.contributeFileData
                  ),
                )
              },
            )
            ->Meta3dCommonlib.NullableSt.getWithDefault(allContributeDataArr)
          },
          allContributeDataArr,
        )
        ->_func(children)
      },
      allContributeDataArr,
    )
  }

  _func(allContributeDataArr, inspectorData.uiControls)
}
