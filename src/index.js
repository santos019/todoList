import './assets/app.css'
import { getGlobalStore } from './components/GlobalStore'
import {
    beforCheck,
    checkEvnt,
    allClickEvnt,
    clearChecked,
    clearAll,
    oneRemoveEvnt,
    dateEvnt,
    seeDateEvnt,
    seeAllEvnt,
    clickAddBtn,
    modalEvnt
} from './modules'
import { getNode } from './components/NodeStore'
const getNodeIns = getNode.getInstance()
function start () {
    const getGlobalIns = getGlobalStore.getInstance()
    getGlobalIns.start()
    beforCheck()
}
start()

getNodeIns.getClearBtn().addEventListener('click', clearChecked)
getNodeIns.getAllClickBtn().addEventListener('change', allClickEvnt)
getNodeIns.getClearAllBtn().addEventListener('click', clearAll)
getNodeIns.getSeeAllBtn().addEventListener('click', seeAllEvnt)
getNodeIns.getSelectDate().addEventListener('change', seeDateEvnt)
getNodeIns.getAddListBtn().addEventListener('click', clickAddBtn)
window.addEventListener('keyup', clickAddBtn)
const totalEvnt = (event) => {
    if (event.target.classList.contains('listInputLabel')) {
        checkEvnt(event.target)
    } else if (event.target.className === 'listRemoveDiv') {
        oneRemoveEvnt(event.target)
    } else if (event.target.classList.contains('listTitleDiv')) {
        modalEvnt(event.target)
    } else if (event.target.className === 'listDateDiv') {
        dateEvnt(event.target)
    }
}
getNodeIns.getTotalList().addEventListener('click', totalEvnt)
