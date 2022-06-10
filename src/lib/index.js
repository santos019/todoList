import { getGlobalStore } from '../components/GlobalStore'

export const deepCopy = (object) => {
    if (object === null || typeof object !== 'object') {
        return object
    }
    const copy = Array.isArray(object) ? [] : {}
    for (const key in object) {
        copy[key] = deepCopy(object[key])
    }
    return copy
}
export const sortArr = (arr) => { // 날짜 정렬
    for (const i in arr) {
        arr[i].nodeDate = Number(arr[i].nodeDate.substr(0, 4) + arr[i].nodeDate.substr(5, 2) + arr[i].nodeDate.substr(8, 2))
    }
    arr = arr.sort(function (previous, next) {
        return previous.nodeDate - next.nodeDate
    })
    for (const i in arr) {
        arr[i].nodeDate = String(arr[i].nodeDate).substring(0, 4) + '-' + String(arr[i].nodeDate).substr(4, 2) + '-' + String(arr[i].nodeDate).substr(6, 2)
    }
    return arr
}
export const sortArrForNodeId = (arr) => {
    arr = arr.sort(function (previous, next) {
        return Number(previous.nodeId) - Number(next.nodeId)
    })
    return arr
}
export const findArrIndex = (id) => {
    const getGlobalIns = getGlobalStore.getInstance()
    const arr = getGlobalIns.getData().loadingArr
    const findArr = arr.find(el => Number(el.nodeId) === Number(id))
    return { findArr, arr }
}

export const getToday = () => {
    let instance = null
    return function () {
        if (!instance) {
            instance = new Date()
        }
        return instance.toISOString().substr(0, 10)
    }
}
