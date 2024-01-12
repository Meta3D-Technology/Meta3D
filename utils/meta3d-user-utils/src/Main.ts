let _buildAccountKey = () => "meta3d_account"

export let readAccount = () => {
    return globalThis.localStorage.getItem(_buildAccountKey())
}