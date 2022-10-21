import { po } from "../po/POType";

let poContainer = {
    po: ({
        s3: null
    }) as po
}

export let getPO = () => poContainer.po;

export let setPO = (po) => poContainer.po = po;
