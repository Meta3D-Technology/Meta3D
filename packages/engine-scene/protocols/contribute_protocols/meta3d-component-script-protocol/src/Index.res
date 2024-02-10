let componentName = "Script"

type state

type attributeValue

type assetData = {
  name: string,
  eventFileStr: string,
}

type allAssetData = array<assetData>

type dataName = {
  name: int,
  attribute: int,
  allAssetData: int,
}

let dataName = {
  name: 0,
  attribute: 1,
  allAssetData: 2,
}

type script = int

type config = {isDebug: bool}

type needDisposedComponents = array<script>

type batchDisposeData = array<script>

type cloneConfig = unit
