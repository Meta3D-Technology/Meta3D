import { useEffect } from "react"

export let useEffectExecOnlyOnce = (func) => {
    useEffect(func, [])
}

// export let useAsyncOnlyOnce = (asyncFn, onSuccessFunc, onFailFunc) => {
//     useEffect(() => {
//         let isActive = true

//         asyncFn().then(data => {
//             if (isActive) {
//                 onSuccessFunc(data)
//             }
//         }).catch(e => onFailFunc(e))

//         return () => { isActive = false }
//         //   }, [asyncFn, onSuccess]);
//     }, []);
// }