type insertAction = [#before | #after]

type jobOrder = {
  pipelineName: Meta3dEngineCoreType.PipelineType.pipelineName,
  insertElementName: Meta3dEngineCoreType.PipelineType.elementName,
  insertAction: insertAction,
}

@genType
type jobOrders = array<jobOrder>
