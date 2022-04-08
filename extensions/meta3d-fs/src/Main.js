import fs from "fs";
import path from "path";
export let getExtensionService = (_api, _dependentExtensionNameMap) => {
    return {
        joinRootPath: (p) => {
            return path.join(process.cwd(), p);
        },
        readFileSync: (path, encode) => {
            return fs.readFileSync(path, encode);
        },
    };
};
export let createExtensionState = () => {
    return {};
};
//# sourceMappingURL=Main.js.map