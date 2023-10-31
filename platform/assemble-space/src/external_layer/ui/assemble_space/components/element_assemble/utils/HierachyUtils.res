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

let rec mapSelectedUIControlData = (
  handle,
  (getId, getChildren, setChildren),
  allSelectedUIControlData,
  id,
) => {
  allSelectedUIControlData->Meta3dCommonlib.ListSt.map(data => {
    getId(data) === id
      ? {
          handle(data)
        }
      : setChildren(
          data,
          mapSelectedUIControlData(
            handle,
            (getId, getChildren, setChildren),
            getChildren(data),
            id,
          ),
        )
  })
}

let rec addChildUIControlData = (
  (getId, getChildren, setChildren),
  allSelectedUIControlData,
  childUIControlData,
  parentId,
) => {
  switch parentId {
  | None => allSelectedUIControlData->Meta3dCommonlib.ListSt.push(childUIControlData)
  | Some(parentId) =>
    allSelectedUIControlData->Meta3dCommonlib.ListSt.map(data => {
      getId(data) === parentId
        ? setChildren(data, getChildren(data)->Meta3dCommonlib.ListSt.push(childUIControlData))
        : setChildren(
            data,
            addChildUIControlData(
              (getId, getChildren, setChildren),
              getChildren(data),
              childUIControlData,
              parentId->Some,
            ),
          )
    })
  }
}

let rec removeUIControlData = ((getId, getChildren, setChildren), allSelectedUIControlData, id) => {
  allSelectedUIControlData
  ->Meta3dCommonlib.ListSt.filter(data => getId(data) != id)
  ->Meta3dCommonlib.ListSt.map(data =>
    setChildren(data, removeUIControlData((getId, getChildren, setChildren), getChildren(data), id))
  )
}
