let buildPackageData = (
  ~packageProtocolName="p1-protocol",
  ~packageProtocolVersion="^0.0.1",
  ~packageProtocolIconBase64="ibase64",
  ~packageProtocolConfigStr="",
  ~entryExtensionName="en1",
  ~packageVersion="0.0.1",
  ~packageName="p1",
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
    packageName,
    packageProtocolConfigStr,
  )
}

let buildPackageStoredInApp = (
  ~packageData,
  ~pacakgeBinaryFile=Js.Typed_array.ArrayBuffer.make(10),
  (),
) => {
  (packageData, pacakgeBinaryFile)
}
