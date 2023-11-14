let buildSelectedPackage = (
  ~protocolName="p_protocol",
  ~protocolVersion="^0.0.1",
  ~protocolIconBase64="pi1",
  ~protocolConfigStr=None,
  ~binaryFile=Js.Typed_array.ArrayBuffer.make(1),
  ~entryExtensionName="pet1",
  ~name="p1",
  ~id="p1",
  ~version="0.0.1",
  ~isStart=false,
  (),
): FrontendUtils.AssembleSpaceCommonType.packageData => {
  {
    id,
    protocol: {
      name: protocolName,
      version: protocolVersion,
      iconBase64: protocolIconBase64,
    },
    version,
    name,
    binaryFile,
    entryExtensionName,
    isStart,
    protocolConfigStr,
  }
}
