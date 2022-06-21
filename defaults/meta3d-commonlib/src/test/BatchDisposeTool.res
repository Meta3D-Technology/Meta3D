let buildSharedBatchDisposeData = (components) => {
components ->ArraySt.reduceOneParam(
      (. dataMap, component) => dataMap -> MutableSparseMap.set(component, [1]),
MutableSparseMap.createEmpty()
    )
}