import { func1 as func1Utils2, func2 } from "./Utils2"

export let func1 = () => {
    return func1Utils2() + func2() > 3
}