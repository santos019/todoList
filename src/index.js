import './assets/app.css'
import { getGlobalStore } from './constructor/GlobalStore'
import { beforCheck, checkEvnt, allClickEvnt } from './component/checkModule'
import { getNode } from './constructor/NodeStore'
import { clearChecked, clearAll, oneRemoveEvnt } from './component/removeModule'
import { dateEvnt, seeDateEvnt, seeAllEvnt } from './component/dateModule'
import { clickAddBtn } from './component/addList'
import { modalEvnt } from './component/modalModule'
const getNodeIns = getNode.getInstance()
function start () { // 새로고침이나 페이지에 처음 들어갈 때 렌더링하는 함수
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
getNodeIns.getTotalList().addEventListener('click', totalEvnt) // 화살표 함수로 바꾸세요~~~ 바인드 설명듣기~~~~
