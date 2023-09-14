open Meta3dEngineCoreSceneviewProtocol.ServiceType

let create = (
  usedComponentContribute,
  {createComponent, setComponentData},
  (vertices, texCoords, normals, tangents, indices),
): (
  Meta3dEngineCoreSceneviewProtocol.RegisterComponentType.usedComponentContribute,
  Meta3dComponentGeometryProtocol.Index.geometry,
) => {
  let (usedComponentContribute, geometry) = createComponent(usedComponentContribute)

  let usedComponentContribute =
    usedComponentContribute
    ->setComponentData(
      geometry,
      Meta3dComponentGeometryProtocol.Index.dataName.vertices->Obj.magic,
      vertices->Obj.magic,
    )
    ->setComponentData(
      geometry,
      Meta3dComponentGeometryProtocol.Index.dataName.normals->Obj.magic,
      normals->Obj.magic,
    )
    ->setComponentData(
      geometry,
      Meta3dComponentGeometryProtocol.Index.dataName.tangents->Obj.magic,
      tangents->Obj.magic,
    )
    ->setComponentData(
      geometry,
      Meta3dComponentGeometryProtocol.Index.dataName.texCoords->Obj.magic,
      texCoords->Obj.magic,
    )
    ->setComponentData(
      geometry,
      Meta3dComponentGeometryProtocol.Index.dataName.indices->Obj.magic,
      indices->Obj.magic,
    )

  (usedComponentContribute, geometry->VOTypeConvert.componentToGeometry)
}
