import { po } from "../po/POType";

let poContainer = {
    po: ({
        app: null
    }) as po
}

export let getPO = () => poContainer.po;

export let setPO = (po) => poContainer.po = po;