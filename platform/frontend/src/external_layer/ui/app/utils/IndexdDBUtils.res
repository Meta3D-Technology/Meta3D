open IndexedDB

open Meta3dBsMost.Most

let _getDatabseName = () => {
  "Meta3d_UIVisualApp_Database"
}

let _getTabeleName = () => {
  "Meta3d_UIVisualApp_Table"
}

let _getKeyFieldName = () => {
  "key"
}

let initForUIVisualApp = () => {
  let request = IDBGlobalScope.indexedDB->IDBFactory.open_(_getDatabseName())

  let db = ref(Obj.magic(1))

  Js.Promise.make((~resolve, ~reject) => {
    IDBRequest.set_onerror(request, event => {
      reject(.
        Js.Exn.raiseError({j`open databse error: ${(event->Obj.magic)["target"]["errorCode"]}`}),
      )
    })

    IDBRequest.set_onsuccess(request, event => {
      Js.log("open onsuccess")

      db := (event->Obj.magic)["target"]["result"]

      resolve(. db.contents)
    })

    IDBOpenDBRequest.set_onupgradeneeded(request, event => {
      Js.log("open onupgradeneeded")

      db := (event->Obj.magic)["target"]["result"]

      !(IDBDatabase.objectStoreNames(db.contents)->Obj.magic)["contains"](. _getTabeleName())
        ? {
            let _objectStore = IDBDatabase.createObjectStore(
              db.contents,
              ~options={
                keyPath: _getKeyFieldName()->IDBObjectStoreKeyPath.String,
                autoIncrement: false,
              },
              _getTabeleName(),
            )

            resolve(. db.contents)
          }
        : {
            reject(.
              Js.Exn.raiseError({
                j`database->table error: table shouldn't exist: ${_getTabeleName()}`
              }),
            )
          }
    })
  })
  ->fromPromise
  ->map(_ => db.contents, _)
}

let getUIVisualApp = stream => {
  stream->flatMap(db => {
    let transaction = IDBDatabase.transaction(db, ~mode=#readwrite, [_getTabeleName()])

    let objectStore = IDBTransaction.objectStore(transaction, _getTabeleName())

    let request = IDBObjectStore.get(objectStore, IDBKeyRange.only(1))

    Js.Promise.make((~resolve, ~reject) => {
      IDBRequest.set_onerror(request, event => {
        reject(.
          Js.Exn.raiseError({
            j`get error: ${(event->Obj.magic)["target"]["errorCode"]}`
          }),
        )
      })

      IDBRequest.set_onsuccess(request, event => {
        let result = IDBRequest.result(request)

        result
          ? {
              Js.log("get data")

              resolve(. (result->Obj.magic)["appBinaryFile"])
            }
          : {
              reject(.
                Js.Exn.raiseError({
                  j`get no data}`
                }),
              )
            }
      })
    })->fromPromise
  }, _)
}

let setUIVisualApp = (stream, appBinaryFile: Js.Typed_array.ArrayBuffer.t) => {
  stream->flatMap(db => {
    let transaction = IDBDatabase.transaction(db, ~mode=#readwrite, [_getTabeleName()])

    let objectStore = IDBTransaction.objectStore(transaction, _getTabeleName())

    let request = IDBObjectStore.put(
      objectStore,
      {
        "key": 1,
        "appBinaryFile": appBinaryFile,
      },
    )

    Js.Promise.make((~resolve, ~reject) => {
      IDBRequest.set_onerror(request, event => {
        reject(.
          Js.Exn.raiseError({
            j`set error: ${(event->Obj.magic)["target"]["errorCode"]}`
          }),
        )
      })

      IDBRequest.set_onsuccess(request, event => {
        Js.log("set onsuccess")

        resolve(. db)
      })
    })->fromPromise
  }, _)
}
