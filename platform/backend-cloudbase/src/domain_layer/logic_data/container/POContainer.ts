import { po } from "../po/POType";
import { cloudbase } from "../po/CloundbasePOType"

let poContainer = {
    po: ({
        cloudbase: {
            app: null
        }
    }) as po
}

let _getPO = () => poContainer.po;

let _setPO = (po) => poContainer.po = po;

export let getCloundbase = () => _getPO().cloudbase;

export let setCloundbase = (cloudbase: cloudbase) => {
    _setPO({
        ..._getPO(),
        cloudbase: cloudbase
    });
}