import { init as initCloundbase } from "../cloudbase/CloudbaseService"

export let init = async () => {
    await initCloundbase()
}
