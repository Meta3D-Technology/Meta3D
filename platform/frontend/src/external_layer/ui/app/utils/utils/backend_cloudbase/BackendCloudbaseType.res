type account = string

type versionRange = string

type version = string

type implementName = string

type implementDisplayName = string

type implementVersion = version

type repoLink = string

type description = string

type previewBase64 = string

// type useCount = int

type isRecommend = bool

type limitCount = int

type skipCount = int

type count = int

type protocolName = string

type protocolDisplayName = string

type protocolVersion = version

type protocolIconBase64 = string

type protocolRepoLink = repoLink

type protocolDescription = description

// TODO refactor: move type out
type protocol = {
  name: protocolName,
  version: protocolVersion,
  account: account,
  iconBase64: protocolIconBase64,
  displayName: protocolDisplayName,
  // repoLink: option<repoLink>,
  repoLink: repoLink,
  description: description,
}

type protocols = array<protocol>

type init = string => Meta3dBsMostDefault.Most.stream<unit>

type handleLoginForWeb3 = account => Meta3dBsMostDefault.Most.stream<unit>

type checkUserName = string => Meta3dBsMostDefault.Most.stream<bool>

type registerUser = string => Meta3dBsMostDefault.Most.stream<unit>

type isLoginSuccess = string => Meta3dBsMostDefault.Most.stream<(bool, Js.Nullable.t<string>)>

type getAllPublishExtensionProtocols = (
  . limitCount,
  skipCount,
) => Meta3dBsMostDefault.Most.stream<protocols>

type getAllPublishExtensionProtocolsCount = unit => Meta3dBsMostDefault.Most.stream<count>

type getAllPublishContributeProtocols = getAllPublishExtensionProtocols

type batchFindPublishExtensionProtocols = (
  . // . array<(protocolName, protocolVersion)>,
  array<
    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,
    protocolName,
  >,
) => Meta3dBsMostDefault.Most.stream<protocols>

type batchFindPublishContributeProtocols = (
  . // . array<(protocolName, protocolVersion)>,
  array<
    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,
    protocolName,
  >,
) => Meta3dBsMostDefault.Most.stream<protocols>

// type protocolConfig = {
//   name: string,
//   version: string,
//   account: string,
//   configStr: string,
// }

type protocolConfigs = array<CommonType.protocolConfig>

type getAllPublishExtensionProtocolConfigs = (
  limitCount,
  skipCount,
) => Meta3dBsMostDefault.Most.stream<protocolConfigs>

type getAllPublishContributeProtocolConfigs = getAllPublishExtensionProtocolConfigs

type batchFindPublishExtensionProtocolConfigs = (
  . // . array<(protocolName, protocolVersion)>,
  array<
    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,
    protocolName,
  >,
) => Meta3dBsMostDefault.Most.stream<protocolConfigs>

type batchFindPublishContributeProtocolConfigs = (
  . // . array<(protocolName, protocolVersion)>,
  array<
    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,

    // . array<(protocolName, protocolVersion)>,
    protocolName,
  >,
) => Meta3dBsMostDefault.Most.stream<protocolConfigs>

type implementInfo = {
  id: string,
  name: implementName,
  version: implementVersion,
  account: account,
  displayName: implementDisplayName,
  // repoLink: option<repoLink>,
  repoLink: repoLink,
  description: description,
}

type implementInfos = array<implementInfo>

type onUploadProgressFunc = int => unit

type getAllPublishExtensionInfos = (
  . limitCount,
  skipCount,
  protocolName,
  protocolVersion,
) => Meta3dBsMostDefault.Most.stream<implementInfos>

type getAllPublishContributeInfos = getAllPublishExtensionInfos

type onDownloadProgressFunc = int => unit

type findPublishExtension = (
  . onDownloadProgressFunc,
  limitCount,
  skipCount,
  account,
  implementName,
  implementVersion,
) => Meta3dBsMostDefault.Most.stream<Js.Nullable.t<Js.Typed_array.ArrayBuffer.t>>

type findPublishContribute = findPublishExtension

// type loadExtension = (. Js.Typed_array.ArrayBuffer.t) => Meta3d.ExtensionFileType.extensionFileData

// type loadContribute = (
//   . Js.Typed_array.ArrayBuffer.t,
// ) => Meta3d.ExtensionFileType.contributeFileData

type appName = string

type publishAppInfo = {
  account: account,
  appName: appName,
  description: description,
  previewBase64: Js.Nullable.t<previewBase64>,
  isRecommend: isRecommend,
}

type publishApp = (
  . onUploadProgressFunc,
  Js.Typed_array.ArrayBuffer.t,
  appName,
  account,
  description,
  Js.Nullable.t<previewBase64>,
  // useCount,
  isRecommend,
) => Meta3dBsMostDefault.Most.stream<unit>

type findPublishApp = (
  . onDownloadProgressFunc,
  account,
  appName,
) => Meta3dBsMostDefault.Most.stream<Js.Nullable.t<Js.Typed_array.ArrayBuffer.t>>

type findAllPublishApps = (
  . limitCount,
  skipCount,
) => Meta3dBsMostDefault.Most.stream<array<publishAppInfo>>

type findAllPublishAppsByAccount = (
  . account,
) => Meta3dBsMostDefault.Most.stream<array<publishAppInfo>>

type findAllRecommendPublishApps = (
  . unit,
) => Meta3dBsMostDefault.Most.stream<array<publishAppInfo>>

type publishElementContribute = (
  . onUploadProgressFunc,
  account,
  (string, string, string, string, string, string, string),
  Js.Typed_array.ArrayBuffer.t,
) => Meta3dBsMostDefault.Most.stream<unit>

type uiControlProtocol = {
  name: protocolName,
  version: versionRange,
}

// type input = {
//   inputName: CommonType.inputName,
//   inputFileStr: Js.Nullable.t<CommonType.inputFileStr>,
// }
type input = CommonType.input

// type eventData = {
//   eventName: Meta3dType.ContributeProtocolConfigType.eventName,
//   actionName: CommonType.actionName,
//   actionFileStr: Js.Nullable.t<CommonType.actionFileStr>,
// }
type eventData = CommonType.eventData

type event = array<eventData>

type rec uiControl = {
  protocol: uiControlProtocol,
  displayName: string,
  rect: CommonType.rect,
  isDraw: CommonType.isDraw,
  input: Js.Nullable.t<input>,
  event: event,
  specific: CommonType.specific,
  children: array<uiControl>,
}

type inspectorData = {uiControls: array<uiControl>}

type elementName = string

type elementVersion = implementVersion

type customInput = CommonType.customInput

type customInputs = array<customInput>

type customAction = CommonType.customAction

type customActions = array<customAction>

type publishElementAssembleData = (
  . account,
  elementName,
  elementVersion,
  inspectorData,
  customInputs,
  customActions,
) => Meta3dBsMostDefault.Most.stream<unit>

type implement = {
  id: string,
  file: Js.Typed_array.ArrayBuffer.t,
  version: implementVersion,
  account: account,
}

type implements = array<implement>

type getAllPublishNewestExtensions = (
  . limitCount,
  skipCount,
  protocolName,
) => Meta3dBsMostDefault.Most.stream<implements>

type elementAssembleData = {
  account: account,
  elementName: elementName,
  elementVersion: elementVersion,
  inspectorData: inspectorData,
  customInputs: customInputs,
  customActions: customActions,
}

type getElementAssembleData = (
  . account,
  elementName,
  elementVersion,
) => Meta3dBsMostDefault.Most.stream<Js.Nullable.t<elementAssembleData>>

type findAllElementAssembleData = (
  . limitCount,
  skipCount,
) => Meta3dBsMostDefault.Most.stream<array<elementAssembleData>>

type entryExtensionProtocolName = protocolName

type entryExtensionProtocolVersion = protocolVersion

type entryExtensionProtocolVersionRange = versionRange

type entryExtensionProtocolIconBase64 = protocolIconBase64

type entryExtensionProtocolConfigStr = CommonType.protocolConfigStr

type entryExtensionProtocolDisplayName = protocolDisplayName

type entryExtensionProtocolRepoLink = repoLink

type entryExtensionProtocolDescription = description

type entryExtensionName = string

type publishPackage = (
  . onUploadProgressFunc,
  Js.Typed_array.ArrayBuffer.t,
  (
    entryExtensionProtocolName,
    entryExtensionProtocolVersion,
    entryExtensionProtocolVersionRange,
    entryExtensionProtocolIconBase64,
    entryExtensionProtocolDisplayName,
    entryExtensionProtocolRepoLink,
    entryExtensionProtocolDescription,
    Js.Nullable.t<entryExtensionProtocolConfigStr>,
    entryExtensionName,
  ),
  (implementName, implementVersion, description),
  account,
) => Meta3dBsMostDefault.Most.stream<unit>

type getAllPublishPackageEntryExtensionProtocols = getAllPublishExtensionProtocols

// type packageProtocol = {
//   version: Meta3d.ExtensionFileType.versionRange,
//   name: string,
//   iconBase64: string,
// }

type packageImplementInfo = {
  id: string,
  entryExtensionProtocolName: entryExtensionProtocolName,
  entryExtensionProtocolVersion: entryExtensionProtocolVersion,
  entryExtensionProtocolVersionRange: entryExtensionProtocolVersionRange,
  entryExtensionProtocolIconBase64: entryExtensionProtocolIconBase64,
  entryExtensionProtocolConfigStr: entryExtensionProtocolConfigStr,
  entryExtensionName: entryExtensionName,
  name: implementName,
  version: implementVersion,
  account: account,
  description: description,
}

type packageImplementInfos = array<packageImplementInfo>

type getAllPublishPackageInfos = (
  . limitCount,
  skipCount,
  protocolName,
  protocolVersion,
) => Meta3dBsMostDefault.Most.stream<packageImplementInfos>

type findPublishPackage = findPublishExtension

type findNewestPublishPackage = (
  . onDownloadProgressFunc,
  entryExtensionProtocolName,
  implementName,
) => Meta3dBsMostDefault.Most.stream<
  Js.Nullable.t<(
    Js.Typed_array.ArrayBuffer.t,
    entryExtensionProtocolVersion,
    implementVersion,
    entryExtensionProtocolIconBase64,
    entryExtensionProtocolConfigStr,
  )>,
>

type findNewestPublishExtension = (
  . onDownloadProgressFunc,
  implementName,
  protocolName,
) => Meta3dBsMostDefault.Most.stream<(
  (
    description,
    implementDisplayName,
    repoLink,
    implementVersion,
    Js.Typed_array.ArrayBuffer.t,
    account,
  ),
  (protocolVersion, protocolIconBase64, protocolDisplayName, protocolRepoLink, protocolDescription),
  Js.Nullable.t<CommonType.protocolConfig>,
)>

type findNewestPublishContribute = findNewestPublishExtension

type findNewestPublishElementAssembleData = (
  . elementName,
) => Meta3dBsMostDefault.Most.stream<Js.Nullable.t<elementAssembleData>>
