import { findArrIndex, getToday } from '../lib'
import { getGlobalStore } from '../components/GlobalStore'
import { getPaint } from '../components/Paint'
import { getNode } from '../components/NodeStore'

export const dateEvnt = (e) => {
    const dataSelect = document.createElement('input')
    dataSelect.type = 'date'
    dataSelect.className = 'dataSelectInput'
    dataSelect.id = 'dataSelectId' + e.id.substr(11)
    e.textContent = ''
    e.appendChild(dataSelect)
    dataSelect.addEventListener('change', changeEvnt)
    window.addEventListener('click', inputClose)
}
const changeEvnt = (e) => {
    const getGlobalIns = getGlobalStore.getInstance()
    const { findArr, arr } = findArrIndex(e.target.parentNode.id.substr(11))
    findArr.nodeDate = e.target.value
    e.target.parentNode.textContent = e.target.value
    getGlobalIns.renderArr(arr)
}
export const inputClose = (e) => {
    const dateInput = document.querySelectorAll('.dataSelectInput')
    if (dateInput.length === 1 && e.target.id !== dateInput[0].parentNode.id && e.target.id !== dateInput[0].id) {
        const { findArr } = findArrIndex(dateInput[0].id.substr(12))
        dateInput[0].parentNode.textContent = findArr.nodeDate
    }
}
export const seeDateEvnt = () => {
    const getNodeIns = getNode.getInstance()
    const getGlobalIns = getGlobalStore.getInstance()
    const getPaintIns = getPaint.getInstance()
    getNodeIns.getSeeAllBtn().checked = false
    let arr = getGlobalIns.getData().loadingArr
    const date = getNodeIns.getSelectDate().value
    arr = arr.filter(el => el.nodeDate === date)
    getNodeIns.getTotalList().textContent = ''
    getPaintIns.start(arr)
}
export const seeAllEvnt = () => {
    const getNodeIns = getNode.getInstance()
    const getPaintIns = getPaint.getInstance()
    const getGlobalIns = getGlobalStore.getInstance()
    const getTodayIns = getToday()
    const arr = getGlobalIns.getData().loadingArr
    const seeAllNode = getNodeIns.getSeeAllBtn()
    const selectDate = getNodeIns.getSelectDate()
    if (seeAllNode.checked === true) {
        console.log('test')
        selectDate.value = ''
        getNodeIns.getTotalList().textContent = ''
        getPaintIns.start(arr)
    } else if (selectDate.value === '') {
        selectDate.value = getTodayIns()
        seeDateEvnt()
    }
}
