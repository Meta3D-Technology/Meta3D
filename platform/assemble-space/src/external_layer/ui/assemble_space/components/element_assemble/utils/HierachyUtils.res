let rec findSelectedUIControlData = (
  result,
  (getId, getChildren),
  allSelectedUIControlData,
  id,
) => {
  switch result {
  | None =>
    allSelectedUIControlData->Meta3dCommonlib.ListSt.reduce(result, (result, data) => {
      switch result {
      | None =>
        getId(data) === id
          ? Some(data)
          : findSelectedUIControlData(result, (getId, getChildren), getChildren(data), id)
      | _ => result
      }
    })
  | _ => result
  }
}
