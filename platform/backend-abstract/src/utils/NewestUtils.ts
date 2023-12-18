export let descSort = (data: Array<any>, gtFunc: any, orderByFieldName: string) => {
    return data.sort((a, b) => {
        if (gtFunc(a[orderByFieldName], b[orderByFieldName])) {
            return -1
        }

        return 1
    })
}
