let _judgeOS = %raw(`
function () {
    var sUserAgent = navigator.userAgent;
    var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
    var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
    var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
    var isLinux = (String(navigator.platform).indexOf("Linux") > -1);

    if (isWin) {
        return "win"
    }

    if (isMac) {
        return "mac"
    }

    if (isLinux) {
        return "linux"
    }

    if (isUnix) {
        return "unix"
    }

    return "unknown"
}
`)

let buildNewlineChar = () => {
    switch(_judgeOS()){
        | "win" => "\r\n"
        | _ => "\n"
    }
}

let handleNewlineChar = (str) => {
    str -> Js.String.replaceByRe(%re("/\n/g"), buildNewlineChar(),_)
}

let unifyNewlineChar = (str) => {
    str -> Js.String.replaceByRe(%re("/\r\n|\r|\n/g"), "\n",_)
}