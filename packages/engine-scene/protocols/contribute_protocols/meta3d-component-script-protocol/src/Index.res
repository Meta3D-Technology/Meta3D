let componentName = "Script"

type state

type attributeValue

type dataName = {
  name: int,
  attribute: int,
  eventFileStr: int,
}

let dataName = {
  name: 0,
  attribute: 1,
  eventFileStr: 2,
}

type script = int

type config = {isDebug: bool}

type needDisposedComponents = array<script>

type batchDisposeData = array<script>

type cloneConfig = unit
