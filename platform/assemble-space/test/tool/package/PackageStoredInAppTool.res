let buildPackageData = (
  ~packageProtocolName,
  ~packageProtocolVersion="^0.0.1",
  ~packageProtocolIconBase64="ibase64",
  ~entryExtensionName="en1",
  ~packageVersion="0.0.1",
  ~pacakgeName="p1",
  (),
): Meta3d.AppAndPackageFileType.packageData => {
  (
    {
      name: packageProtocolName,
      version: packageProtocolVersion,
      iconBase64: packageProtocolIconBase64,
    },
    entryExtensionName,
    packageVersion,
    pacakgeName,
  )
}

let buildPackageStoredInApp = (
  ~packageData,
  ~pacakgeBinaryFile=Js.Typed_array.ArrayBuffer.make(10),
  (),
) => {
  (packageData, pacakgeBinaryFile)
}
