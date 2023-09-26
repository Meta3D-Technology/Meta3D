import { service as eventSourcingService } from "./EventSourcing"
import { eventName, import_eventData_event_inputData } from "./events"
import { meta3dState } from "./type"

// declare function getEventData(): eventData
let _importFile = (): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
        let input = document.createElement('input')
        input.setAttribute('type', "file")
        input.style.visibility = 'hidden'

        input.onchange = (event) => {
            let file = (event.target as any).files[0]

            let reader = new FileReader()

            reader.onload = () => {
                resolve(reader.result as ArrayBuffer)
            }

            // reader.onprogress = (event) => {
            //     // TODO show progress message
            //     console.log(`loading ${event.loaded / event.total} %`)
            // }

            reader.onerror = (event) => {
                reject(new Error(`读取${file.name}错误`))
            }

            reader.readAsArrayBuffer(file)
        }

        document.body.appendChild(input)
        input.click()
        document.body.removeChild(input)
    })
}

// let _allEventsBuffer = null
// let _allOutsideDataBuffer = null

// TODO use BinaryFileOperator
let _parseAllOutsideDataBuffer = (allOutsideDataBuffer) => {
    let dataView = new DataView(allOutsideDataBuffer)


    let outsideDataId1BufferByteLength = dataView.getUint32(0)


    let decoder = new TextDecoder("utf-8")
    let outsideDataId1 = decoder.decode(allOutsideDataBuffer.slice(4, outsideDataId1BufferByteLength))

    let outsideData1 = allOutsideDataBuffer.slice(4 + outsideDataId1BufferByteLength)


    return [outsideDataId1, outsideData1]
}

export let service = {
    handler: (meta3dState) => {
        return _importFile().then(wholeBuffer => {

            // let dataView = new DataView(wholeBuffer)
            // let allEventsBuffer = wholeBuffer.slice(
            //     4,
            //     4 + dataView.getUint32(0)
            // )
            // let allOutsideDataBuffer = wholeBuffer.slice(
            //     4 + dataView.getUint32(0)
            // )


            // let decoder = new TextDecoder("utf-8")
            // let allEvents = JSON.parse(decoder.decode(new Uint8Array(allEventsBuffer)))


            // let [outsideDataId1, outsideData1] = _parseAllOutsideDataBuffer(allOutsideDataBuffer)




            // TODO fix fake data
            let allEvents = [
                {
                    name: eventName.load_glb_event,
                    inputData: ["1"]
                }
            ]
            let [outsideDataId1, outsideData1] = ["1", new ArrayBuffer(10)]

            meta3dState = eventSourcingService.addOutsideData(meta3dState, outsideDataId1, outsideData1)

            return eventSourcingService.addEvent<import_eventData_event_inputData>(meta3dState, {
                name: eventName.import_eventData_event,
                inputData: [
                    allEvents,
                    outsideDataId1
                ]
            })
        })

    }
}




