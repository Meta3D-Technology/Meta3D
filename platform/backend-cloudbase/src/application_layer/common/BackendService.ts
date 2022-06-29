import { init as initCloundbase } from "../cloudbase/CloundbaseService"

export let init = async () => {
    await initCloundbase()
}
