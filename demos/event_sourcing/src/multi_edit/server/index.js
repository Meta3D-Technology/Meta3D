const app = require("express")();
const http = require("http").Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*',
    }
});
const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;
const path = require("path")




let _clientCount = 0
let _clientSyncCount = 0
let _allAddedEvents = []
let _allEvents = []

let _computeAddedEvents = (allAddedEvents, currentAllEvents) => {
    // TODO compute

    return []
}

io.on("connection", (socket) => {
    socket.on("addSelf", _ => {
        _clientCount += 1
    });

    socket.on("sync", addedEvents => {
        if (_clientSyncCount < _clientCount) {
            _allAddedEvents.push(addedEvents)

            _clientSyncCount += 1
        }

        if (_clientSyncCount == _clientCount) {
            _clientSyncCount = 0

            let addedEvents = _computeAddedEvents(_allAddedEvents, _allEvents)

            _allAddedEvents = []
            _allEvents = _allEvents.concat(addedEvents)

            io.emit("sync", addedEvents);
        }
        else {
            return
        }
    });
});

http.listen(port, host, () => {
    console.log(`Socket.IO server running at http://${host}:${port}/`);
});
