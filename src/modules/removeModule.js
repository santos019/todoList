import { getGlobalStore } from '../components/GlobalStore'
import { beforCheck } from './checkModule'

export const clearChecked = () => {
    const getGlobalIns = getGlobalStore.getInstance()
    let arr = getGlobalIns.getData().loadingArr
    arr = arr.filter(detailCheck)
    getGlobalIns.renderArr(arr)
}

export const clearAll = () => {
    const getGlobalIns = getGlobalStore.getInstance()
    getGlobalIns.renderArr([])
}
export const oneRemoveEvnt = (e) => {
    const getGlobalIns = getGlobalStore.getInstance()
    let newArr = getGlobalIns.getData().loadingArr
    newArr = newArr.filter((el) => Number(el.nodeId) !== Number(e.id.substr(13)))
    getGlobalIns.renderArr(newArr)
    beforCheck()
}
const detailCheck = (e) => {
    if (e.nodeCheck) {
        return false
    } else return true
}
