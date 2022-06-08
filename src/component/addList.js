import { getGlobalStore } from '../constructor/GlobalStore'
import { getNode } from '../constructor//NodeStore'
import { allCheckVerify } from './checkModule'
import { getToday } from '../library/lib'
export const clickAddBtn = () => { // state = {title, date(today), check(false)}
    const getNodeIns = getNode.getInstance()
    const getGlobalIns = getGlobalStore.getInstance()
    const getTodayIns = getToday()
    getGlobalIns.setData({ nodeId: getGlobalIns.getData().countNumber, nodeTitle: getNodeIns.getAddTitle().value, nodeContext: '', nodeCheck: false, nodeDate: getTodayIns(), nodeGauge: 0 })
    getGlobalIns.renderArr()
    getGlobalIns.updateCountNumber()
    getNodeIns.getAddTitle().value = ''
    allCheckVerify(false)
    getNodeIns.getSeeAllBtn().checked = true
    getNodeIns.getSelectDate().value = ''
}
