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

// TODO refer to:
// https://www.google.com.hk/search?q=Operational+Transformation+%E8%A7%A3%E5%86%B3%E5%86%B2%E7%AA%81&newwindow=1&sca_esv=568381026&ei=M0ESZaGDFcqU0PEPotuAqAY&ved=0ahUKEwjh6IbbnMeBAxVKCjQIHaItAGUQ4dUDCBA&uact=5&oq=Operational+Transformation+%E8%A7%A3%E5%86%B3%E5%86%B2%E7%AA%81&gs_lp=Egxnd3Mtd2l6LXNlcnAiJ09wZXJhdGlvbmFsIFRyYW5zZm9ybWF0aW9uIOino-WGs-WGsueqgTIFECEYoAEyBRAhGKABMgUQIRigATIFECEYoAFI0BNQZViZEnABeAGQAQCYAdwDoAH2FqoBBTMtMS42uAEDyAEA-AEBwgIKEAAYRxjWBBiwA8ICBRAAGIAEwgIHEAAYigUYQ8ICBBAAGB7CAgcQABgTGIAEwgIGEAAYHhgTwgIIEAAYCBgeGBPiAwQYACBBiAYBkAYI&sclient=gws-wiz-serp&bshm=rime/1
// https://www.google.com.hk/search?q=Conflict-free+Replicated+Data+Type+%E8%A7%A3%E5%86%B3%E5%86%B2%E7%AA%81&newwindow=1&sca_esv=568381026&ei=PEESZe7UI5ui0PEPqZ6csAk&ved=0ahUKEwju4rrfnMeBAxUbETQIHSkPB5YQ4dUDCBA&uact=5&oq=Conflict-free+Replicated+Data+Type+%E8%A7%A3%E5%86%B3%E5%86%B2%E7%AA%81&gs_lp=Egxnd3Mtd2l6LXNlcnAiL0NvbmZsaWN0LWZyZWUgUmVwbGljYXRlZCBEYXRhIFR5cGUg6Kej5Yaz5Yay56qBSNkCUABYAHAAeAGQAQCYAQCgAQCqAQC4AQPIAQD4AQL4AQHiAwQYACBBiAYB&sclient=gws-wiz-serp&bshm=rime/1
let _computeAddedEvents = (allAddedEvents, currentAllEvents) => {
    // TODO remove this limit
    if (_clientCount > 1) {
        throw new Error("not support")
    }

    return allAddedEvents[0]
}

let _reset = () => {
    _clientCount = 0
    _clientSyncCount = 0
    _allAddedEvents = []
    _allEvents = []
}

io.on("connection", (socket) => {
    // console.log(_clientSyncCount, _clientCount);

    _reset()

    socket.on('disconnect', function () {
        _reset()
    });

    socket.on("addSelf", _ => {
        _clientCount += 1
        // console.log("addSelf, ", _clientSyncCount, _clientCount);
    });

    socket.on("sync", addedEvents => {
        if (_clientSyncCount < _clientCount) {
            _allAddedEvents.push(addedEvents)

            _clientSyncCount += 1
        }

        // console.log(_clientSyncCount, _clientCount, addedEvents);

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
