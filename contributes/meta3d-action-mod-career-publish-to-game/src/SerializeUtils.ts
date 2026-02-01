// export let serializeLib = (fileStr, libraryName) => {
//     try {
//         eval('(' + "(function(){" + fileStr + "}())" + ')')

//         return window[libraryName]
//     }
//     catch (e) {
//         console.error("libraryName: ", libraryName)
//         console.error("fileStr: ", fileStr)
//         throw new Error(e)
//     }

// }

// export let getFuncFromLib = (lib, funcName) => {
//     return lib[funcName]
// }


export let serializeData = (data) => {
    return JSON.stringify(data, function (key, val) {
        if (typeof val === 'function') {
            return val + ''; // implicitly `toString` it
        }
        return val;
    });
}

export let deserializeData = (data) => {
    return JSON.parse(data, function (key, val) {
        if (key.toLowerCase().includes("func")) {
            return eval('(' + val + ')')
        }

        return val;
    });
}