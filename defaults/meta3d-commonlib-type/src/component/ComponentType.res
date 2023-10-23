type index = int

type uid = int

type gameObjectMap = MutableSparseMapType.t<index, uid>

type immutableGameObjectMap = ImmutableSparseMapType.t<index, uid>

type gameObjectsMap = MutableSparseMapType.t<index, array<uid>>

type name = string
