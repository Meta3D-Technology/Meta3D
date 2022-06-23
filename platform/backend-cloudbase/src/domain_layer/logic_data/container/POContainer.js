let poContainer = {
    po: ({
        cloudbase: {
            app: null
        }
    })
};
let _getPO = () => poContainer.po;
let _setPO = (po) => poContainer.po = po;
export let getCloundbase = () => _getPO().cloudbase;
export let setCloundbase = (cloudbase) => {
    _setPO(Object.assign(Object.assign({}, _getPO()), { cloudbase: cloudbase }));
};
