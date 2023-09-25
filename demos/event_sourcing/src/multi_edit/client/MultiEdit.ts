import { io } from "socket.io-client";
import { eventData, service as eventSourcingService } from "../../EventSourcing";
import { meta3dState } from "../../type";

declare function _getAddedEvents(meta3dState, previousAllEvents): Array<eventData<any>>

let _socket, _allEvents

export let service = {
    init: (meta3dState) => {
        _socket = io("ws://localhost:3000/")

        _socket.on("connect", function () {
            globalThis["addedEvents"] = null

            _socket.emit("addSelf", null);

            console.log("Client has connected to the server!");
        });

        _socket.on("sync", (addedEvents) => {
            if (globalThis["addedEvents"] !== null) {
                throw new Error("addedEvents should be empty")
            }

            globalThis["addedEvents"] = addedEvents
        });

        return meta3dState
    },
    sync: (meta3dState) => {
        let previousAddedEvents = null

        if (globalThis["addedEvents"] !== null) {
            previousAddedEvents = globalThis["addedEvents"]

            globalThis["addedEvents"] = null
        }

        _socket.emit("sync", _getAddedEvents(meta3dState, _allEvents));


        if (previousAddedEvents !== null) {
            eventSourcingService.forward(meta3dState, previousAddedEvents).then(meta3dState => {
                _allEvents = eventSourcingService.getAllEvents(meta3dState)

                return meta3dState
            })
        }

        return Promise.resolve(meta3dState)
    }
}