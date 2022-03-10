let componentName = "PBRMaterial"

type config = {
  isDebug: bool,
  pbrMaterialCount: int,
}

type dataName = {diffuseColor: int, specular: int}

let dataName = {
  diffuseColor: 0,
  specular: 1,
}

type dataNameType = int

type diffuseColor = (float, float, float)

type specular = float

type pbrMaterial = int

type state