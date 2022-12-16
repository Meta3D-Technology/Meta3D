open Js.Typed_array

open AppAndPackageFileType

let convertAllFileData = (
  allExtensionFileData,
  allContributeFileData,
  (allExtensionNewNames, isEntryExtensions, allContributeNewNames),
) => {
  ManagerUtils.convertAllFileData(
    allExtensionFileData,
    allContributeFileData,
    (allExtensionNewNames, ([], isEntryExtensions), allContributeNewNames),
  )
}

let generate = ((allExtensionFileData, allContributeFileData)) => {
  ManagerUtils.generate((allExtensionFileData, allContributeFileData))->BinaryFileOperator.generate
}

let load = (packageBinaryFile: ArrayBuffer.t): (
  Meta3dType.Index.state,
  array<extensionFileData>,
  Meta3dType.Index.extensionName,
) => {
  let (state, allExtensionDataArr) = packageBinaryFile->BinaryFileOperator.load->ManagerUtils.load

  (state, allExtensionDataArr, ManagerUtils.getSpecificExtensionName(allExtensionDataArr, Entry))
}
