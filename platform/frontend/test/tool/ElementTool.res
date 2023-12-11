// let buildSelectedElement = (
//   ~elementName="e1",
//   ~elementVersion="0.0.1",
//   ~inspectorData=UIControlInspectorTool.buildUIControlInspectorData(~id="e1", ()),
//   (),
// ): BackendCloudbaseType.elementAssembleData => {
//   {
//     elementName,
//     elementVersion,
//     inspectorData:inspectorData,
//   }
// }

let buildFakeSelectedElements = (~data1=1, ()): list<BackendCloudbaseType.elementAssembleData> => {
  list{data1->Obj.magic}
}
