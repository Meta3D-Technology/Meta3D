// TODO move to api
export let range = (a, b) => {
    let result = []

    for (let i = a; i <= b; i++) {
        result.push(i)
    }

    return result
}

export let push = <T>(arr: Array<T>, value: T) => {
    arr.push(value)

    return arr
}
