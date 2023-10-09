import { io } from "socket.io-client";
import {  service as eventSourcingService } from "../../EventSourcing";
import { meta3dState } from "../../type";

// declare function _getAddedEvents(meta3dState, previousAllEvents): Array<eventData<any>>
let _isCurrentAllEventsNotContainPrevious = (currentAllEvents, previousAllEvents) => {
    let result = previousAllEvents.reduce((result, { name }, index) => {
        if (!result) {
            return result
        }

        if (name !== currentAllEvents[index].name) {
            return false
        }
    }, true)

    return result && currentAllEvents.length < previousAllEvents.length

}
let _getAddedEvents = (meta3dState, previousAllEvents) => {
    let currentAllEvents = eventSourcingService.getAllEvents(meta3dState)

    // if (previousAllEvents.length == []) {
    //     return currentAllEvents
    // }

    if (_isCurrentAllEventsNotContainPrevious(currentAllEvents, previousAllEvents)) {
        throw new Error("current all events should contain previous all events")
    }

    return currentAllEvents.slice(previousAllEvents.length)
}

// TODO move to meta3dState
let _socket = null,
    _allEvents = []

export let service = {
    init: (meta3dState) => {
        _socket = io("ws://localhost:3000/")

        globalThis["addedEvents"] = null


        _socket.emit("addSelf", null);

        _socket.on("connect", function () {
            // console.log("on connect")

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
    // sync: (meta3dState) => {
    //     let previousAddedEvents = null

    //     if (globalThis["addedEvents"] !== null) {
    //         previousAddedEvents = globalThis["addedEvents"]

    //         globalThis["addedEvents"] = null
    //     }

    //     _socket.emit("sync", _getAddedEvents(meta3dState, _allEvents));


    //     if (previousAddedEvents !== null) {
    //         eventSourcingService.forwardView(meta3dState, previousAddedEvents).then(meta3dState => {
    //             _allEvents = eventSourcingService.getAllEvents(meta3dState)

    //             return meta3dState
    //         })
    //     }

    //     return Promise.resolve(meta3dState)
    // }
    sync: (meta3dState) => {
        // console.log("sync")
        _socket.emit("sync", _getAddedEvents(meta3dState, _allEvents));

        let id = null

        //wait for server
        return new Promise((resolve, reject) => {
            id = setInterval(() => {
                if (globalThis["addedEvents"] === null) {
                    return
                }

                let addedEvents = globalThis["addedEvents"]

                globalThis["addedEvents"] = null


                eventSourcingService.forwardView(meta3dState, addedEvents).then(meta3dState => {
                    _allEvents = eventSourcingService.getAllEvents(meta3dState).slice()

                    clearInterval(id)

                    resolve(meta3dState)
                })
            }, 30)
        })
    }
}