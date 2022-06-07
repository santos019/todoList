import { getGlobalStore } from './GlobalStore'
import { findArrIndex } from './lib'
export const modalEvnt = (e) => {
    const id = e.classList.contains('listTitleDiv') ? e.id.substr(12) : e.id.substr(7)
    const modalNode = document.getElementById('modalId' + id)
    if (modalNode === null) {
        const modal = document.createElement('div')
        const modalContext = document.createElement('div')
        const modalGuage = document.createElement('input')
        modalContext.className = 'modalContextDiv'
        modalContext.id = 'modalContextId' + id
        modal.className = 'modalDiv'
        modal.id = 'modalId' + id
        modalGuage.className = 'modalGuageInput'
        modalGuage.id = 'modalGuageInputId' + id
        modalGuage.type = 'range'
        const { findArr: appenArr } = findArrIndex(id)
        modalGuage.value = appenArr.nodeGauge
        const insertWrite = document.createElement('textarea')
        insertWrite.className = 'insertWriteDiv'
        insertWrite.id = 'insertWriteId' + id
        insertWrite.value = appenArr.nodeContext
        modalContext.textContent = appenArr.nodeContext
        modalContext.classList.add('modalContextDivOpen')
        modal.appendChild(modalContext)
        modal.appendChild(insertWrite)
        modal.appendChild(modalGuage)
        modalGuage.addEventListener('change', changeGuageEvnt)
        e.classList.contains('listTitleDiv') === true ? e.parentNode.insertAdjacentElement('beforeend', modal) : e.appendChild(modal)// e가 listTitle일 경우, e가 newList일 경우는 appenChild
        modal.addEventListener('click', writeEvnt)
        e.classList.contains('listTitleDiv') === true ? e.parentNode.classList.add('modalOpen') : e.classList.add('modalOpen')
    } else if (e.parentNode.lastChild.className === 'modalDiv') {
        modalNode.removeChild(modalNode.firstChild)
        modalNode.removeChild(modalNode.firstChild)
        e.parentNode.classList.remove('modalOpen')
        modalNode.parentNode.removeChild(modalNode)
    }
}

const writeEvnt = (e) => {
    const upParent = document.querySelectorAll('.insertWriteDivOpen')
    if ((e.target.classList.contains('modalContextDiv') || (e.target.className === 'modalDiv')) && (upParent.length === 0)) {
        const parent = (e.target.classList.contains('modalContextDiv') ? e.target.parentNode : e.target)
        parent.firstChild.classList.toggle('modalContextDivOpen')
        parent.firstChild.nextSibling.classList.toggle('insertWriteDivOpen')
        window.addEventListener('click', readEvnt)
        parent.removeEventListener('click', writeEvnt)
    }
}
const readEvnt = (e) => {
    const getGlobalIns = getGlobalStore.getInstance()
    const checkParent = document.querySelectorAll('.insertWriteDivOpen')
    if (checkParent.length === 1 && e.target.id !== checkParent[0].parentNode.id && e.target.id !== checkParent[0].previousSibling.id && e.target.className !== 'insertWriteDiv insertWriteDivOpen') {
        const { findArr: appenArr, arr } = findArrIndex(checkParent[0].parentNode.id.substr(7))
        appenArr.nodeContext = checkParent[0].value
        getGlobalIns.setArr(arr)
        checkParent[0].parentNode.firstChild.textContent = appenArr.nodeContext
        checkParent[0].parentNode.firstChild.classList.toggle('modalContextDivOpen')
        checkParent[0].parentNode.firstChild.nextSibling.classList.toggle('insertWriteDivOpen')
        window.removeEventListener('click', readEvnt)
        checkParent[0].parentNode.addEventListener('click', writeEvnt)
    }
}

export const changeGuageEvnt = (e) => {
    const getGlobalIns = getGlobalStore.getInstance()
    const { findArr, arr } = findArrIndex(e.target.id.substr(17))
    findArr.nodeGauge = e.target.value
    getGlobalIns.setArr(arr)
}
