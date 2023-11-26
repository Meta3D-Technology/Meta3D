open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/event_data.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))

  let _buildEventData = (
    ~inputData,
    ~name="e1",
    (),
  ): Meta3dEventDataProtocol.ServiceType.eventData => {
    name,
    isOnlyRead: false->Js.Nullable.return,
    inputData,
  }

  let _prepare = given => {
    given("prepare", () => {
      sandbox := createSandbox()

      FileTool.buildFakeTextDecoder(FileTool.convertUint8ArrayToBuffer)
      FileTool.buildFakeTextEncoder(.)
    })
  }

  test(."parse event data", ({given, \"and", \"when", then}) => {
    let allEvents = ref(Obj.magic(1))
    let b1 = ref(Obj.magic(1))
    let result = ref(Obj.magic(1))
    let eventData = Js.Typed_array.ArrayBuffer.make(10)
    let id1 = 22

    _prepare(given)

    given(
      "prepare all events include import event event which has eventData as input data",
      () => {
        allEvents := [
            _buildEventData(~name="AddCubeEvent", ~inputData=[], ()),
            _buildEventData(~name="ImportEventEvent", ~inputData=[eventData->Obj.magic], ()),
          ]
      },
    )

    \"and"(
      "generate event data buffer as b1",
      () => {
        let randomStub = createEmptyStubWithJsObjSandbox(sandbox)
        randomStub->returns(id1, _)->ignore

        b1 := ExportEventData._generateEventDataBuffer(randomStub, allEvents.contents)
      },
    )

    \"when"(
      "parse b1",
      () => {
        result := ParseEventData.parse(b1.contents)
      },
    )

    then(
      "should get all events",
      () => {
        result.contents->expect == allEvents.contents
      },
    )
  })
})
