import { getGlobalStore } from '../components/GlobalStore'

export const changeCheckEvnt = (e) => {
    e.nextSibling.classList.toggle('listTitleDivTrue')
    e.classList.toggle('listInputLabelTrue')
}
export const beforCheck = () => {
    const getGlobalIns = getGlobalStore.getInstance()
    const arr = getGlobalIns.getData().loadingArr
    if (arr.length === 0) allCheckVerify(false)
    for (const i in arr) {
        if (arr[i].nodeCheck === false) {
            allCheckVerify(false)
            return
        } else if (Number(i) === (arr.length - 1)) {
            allCheckVerify(true)
        }
    }
}
export const allCheckVerify = (e) => {
    const $target = document.getElementById('allCheckInputId')
    const $labelTarget = document.getElementById('allCheckLabelId')
    $target.checked = e
    $labelTarget.textContent = (e === true ? '전체 해제' : '전체 선택')
}
export const checkEvnt = (state) => { // setState
    const getGlobalIns = getGlobalStore.getInstance()
    const arr = getGlobalIns.getData().loadingArr
    const findNumber = state.id.substr(14)
    const index = arr.findIndex(e => Number(e.nodeId) === Number(findNumber))
    arr[index].nodeCheck = !(arr[index].nodeCheck)
    changeCheckEvnt(state)
    getGlobalIns.setArr(arr)
    beforCheck()
}
export const allClickEvnt = (e) => {
    allCheckVerify(e.srcElement.checked)
    const getGlobalIns = getGlobalStore.getInstance()
    const arr = getGlobalIns.getData().loadingArr
    const allNodes = document.querySelectorAll('.listInputLabel')
    arr.forEach(element => { element.nodeCheck = e.srcElement.checked })
    if (e.srcElement.checked) {
        allNodes.forEach(element => {
            element.nextSibling.classList.add('listTitleDivTrue')
            element.classList.add('listInputLabelTrue')
        })
    } else {
        allNodes.forEach(element => {
            element.nextSibling.classList.remove('listTitleDivTrue')
            element.classList.remove('listInputLabelTrue')
        })
    }
    getGlobalIns.setArr(arr)
}
