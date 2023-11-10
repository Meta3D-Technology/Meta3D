let id = 0

export let generateId = () => {
    id += 1

    return id - 1
}