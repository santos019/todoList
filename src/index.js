import './assets/app.css'
// 렌더링은 setState와 render방식으로 구현하기~
const deepCopy = (object) => { // depth 2
    if (object === null || typeof object !== 'object') {
        return object
    }
    const copy = Array.isArray(object) ? [] : {}
    for (const key in object) {
        copy[key] = deepCopy(object[key])
    }
    return copy
}
const beforCheck = () => {
    const arr = getData.getData().loadingArr
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
const changeCheckEvnt = (e) => {
    e.nextSibling.classList.toggle('listTitleDivTrue')
    e.classList.toggle('listInputLabelTrue')
}

const allCheckVerify = (e) => {
    console.log(e)
    // let state = true
    const $target = document.getElementById('allCheckInputId')
    const $labelTarget = document.getElementById('allCheckLabelId')
    // state = e
    $target.checked = e
    $labelTarget.textContent = (e === true ? '전체 해제' : '전체 선택')
}

function Paint (initialState) {
    this.state = initialState
    this.$target = document.getElementById('myListId')
    this.beforeArr = deepCopy(getData.getData().loadingArr)
    this.afterArr = []
    this.beforeArrLen = this.beforeArr.length
    this.afterArrLen = 0
    this.count = 0
    this.setState = (nextState) => {
        this.afterArr = deepCopy(nextState)
        this.beforeArrLen = this.beforeArr.length
        this.afterArrLen = this.afterArr.length
        if ((this.afterArrLen > this.beforeArrLen) || (this.afterArrLen > 0 && this.beforeArrLen === 0)) { // 증가
            this.addNode()
        } else if (this.afterArr.length === 0) {
            while (this.$target.hasChildNodes()) {
                this.$target.removeChild(this.$target.firstChild)
            }
        } else if (this.afterArrLen < this.beforeArrLen) { // 감소
            this.afterArr = sortArrForNodeId(this.afterArr)
            this.beforeArr = sortArrForNodeId(this.beforeArr)
            this.minusNode()
        } else { // 동일 상세 데이터 조회 후, 해당 노드만 다시 렌더링
            this.detailNode()
        }

        this.beforeArr = deepCopy(nextState)
    }
    this.start = (nextState) => {
        nextState.forEach(el => {
            this.$target.appendChild(this.render(el))
        })
    }
    this.addNode = () => {
        if (this.beforeArrLen === 0) {
            this.$target.appendChild(this.render(this.afterArr[0]))
            return
        }
        const i = this.beforeArr.findIndex((node, index) => Number(node.nodeId) !== Number(this.afterArr[index].nodeId))

        if (i === -1) {
            this.$target.appendChild(this.render(this.afterArr[Number(this.beforeArrLen)]))
        } else {
            const $addTarget = document.getElementById('newList' + this.beforeArr[i].nodeId)
            $addTarget.insertAdjacentElement('beforebegin', this.render(this.afterArr[i]))
        }
    }
    this.minusNode = () => { // 노드 데이터 순서대로 정렬하고 지우기
        if (this.count > this.afterArrLen - 1) {
            for (let i = Number(this.count); i <= this.beforeArr.length - 1; i++) {
                const $minusTarget = document.getElementById('newList' + this.beforeArr[i].nodeId)
                this.$target.removeChild($minusTarget)
            }
            this.count = 0
            return
        }
        if (Number(this.afterArr[this.count].nodeId) === Number(this.beforeArr[this.count].nodeId)) {
            this.count++
        } else {
            const $minusTarget = document.getElementById('newList' + this.beforeArr[this.count].nodeId)
            this.$target.removeChild($minusTarget)
            this.beforeArr = this.beforeArr.filter(el => Number(el.nodeId) !== Number(this.beforeArr[this.count].nodeId))
        }
        this.minusNode()
    }
    this.detailNode = () => {
        const allList = document.getElementsByClassName('newList')
        const objBeforArr = this.beforeArr.reduce(function (target, key, index) {
            target[key.nodeId] = key
            return target
        }, {})
        let modalOpenValue = false
        const index = this.afterArr.findIndex((node, i) => JSON.stringify(node) !== JSON.stringify(objBeforArr[this.afterArr[i].nodeId]))
        const changedNodeId = this.afterArr[index].nodeId
        const $changeTarget = document.getElementById('newList' + changedNodeId)
        if ($changeTarget.classList.contains('modalOpen')) { // 모달이 열려있으면
            modalOpenValue = true
        }
        const changedNode = this.render(this.afterArr[index])
        this.$target.removeChild($changeTarget)
        if (index - 1 < 0) {
            this.$target.insertAdjacentElement('afterbegin', changedNode)
        } else {
            allList[index - 1].insertAdjacentElement('afterend', changedNode)
        }
        if (modalOpenValue === true) {
            modalEvnt.setState(changedNode)
        }
    }

    this.render = (state) => {
        // state 값은 제목과 날짜 체크여부 => 배열 인자 하나씩 넣어주기
        const inserDate = document.createTextNode(state.nodeDate)
        const insertTitle = document.createTextNode(state.nodeTitle)
        const newList = document.createElement('li')
        const listInput = document.createElement('input')
        const listInputLabel = document.createElement('label')
        const listTitleDiv = document.createElement('div')
        const listDateDiv = document.createElement('div')
        const listRemoveDiv = document.createElement('div')
        newList.className = 'newList'
        newList.id = 'newList' + state.nodeId
        listInput.className = 'listInput'
        listInput.id = 'listInput' + state.nodeId
        listInput.type = 'checkbox'
        listInput.checked = state.check // 수정
        listInputLabel.className = 'listInputLabel'
        listInputLabel.id = 'listInputLabel' + state.nodeId
        listTitleDiv.className = 'listTitleDiv'
        listTitleDiv.id = 'listTitleDiv' + state.nodeId
        listDateDiv.className = 'listDateDiv'
        listDateDiv.id = 'listDateDiv' + state.nodeId
        listRemoveDiv.className = 'listRemoveDiv'
        listRemoveDiv.id = 'listRemoveDiv' + state.nodeId
        listTitleDiv.appendChild(insertTitle)
        listInputLabel.appendChild(listInput)
        newList.appendChild(listInputLabel)
        newList.appendChild(listTitleDiv)
        newList.appendChild(listDateDiv)
        newList.appendChild(listRemoveDiv)
        listDateDiv.appendChild(inserDate)
        if (state.nodeCheck === true) {
            changeCheckEvnt(listInputLabel)
        }
        return newList
    }
}
function Today () {
    const day = new Date()
    this.getToday = () => {
        return day.toISOString().substr(0, 10)
    }
}
function FindData () {
    let output = localStorage.getItem('list')
    let loadingArr = JSON.parse(output) || []
    let countNumber = 0 // 이벤트를 할 때 마다 갱신하기

    this.getData = () => { // countNumber를 이렇게 한 이유 : 새롭게 리스트를 추가했을 때 nodeId가 겹칠 수 있기 때문에 겹칠 일 없이 nodeId 최대
        return { output, loadingArr, countNumber }
    }
    this.setData = ({ nodeId, nodeTitle, nodeContext, nodeCheck, nodeDate }) => {
        loadingArr.push({ nodeId: Number(nodeId), nodeTitle: String(nodeTitle), nodeContext: String(nodeContext), nodeCheck: Boolean(nodeCheck), nodeDate: String(nodeDate), nodeGauge: 0 })
    }
    this.initDate = () => {
        output = localStorage.getItem('list')
        loadingArr = JSON.parse(output) || []
        countNumber = 0
    }
    this.setArr = (arr) => {
        loadingArr = arr
        localStorage.setItem('list', JSON.stringify(loadingArr))
        drawChart.setState(calculateGauge(arr))
    }
    this.renderArr = (arr = loadingArr) => {
        loadingArr = arr
        sortArr(loadingArr)
        localStorage.setItem('list', JSON.stringify(loadingArr))
        paint.setState(loadingArr)
        drawChart.setState(calculateGauge(arr))
    }
    this.start = () => {
        let maxIndex = -1
        loadingArr.forEach(el => {
            if (el.nodeId > maxIndex) {
                maxIndex = el.nodeId
            }
        })
        countNumber = Number(maxIndex + 1)
        paint.start(loadingArr)
    }

    this.updateCountNumber = () => {
        countNumber = countNumber + 1
    }
}

function GetNode () { // 제목을 보고 알 수 있을 정도로 달기 주석을 하지 말고 s를 붙이고
    const addListBtn = document.getElementById('addBtnId')
    const addTitle = document.getElementById('addTitleId')
    const totalList = document.getElementById('myListId')
    const allClickBtn = document.getElementById('allCheckInputId')
    const clearBtn = document.getElementById('checkedClearId')
    const clearAllBtn = document.getElementById('AllClearId')
    const seeAllBtn = document.getElementById('seeAllListInputId')
    const selectDate = document.getElementById('seeSelectDataInputId')
    this.getAddListBtn = () => {
        return addListBtn
    }
    this.getAddTitle = () => {
        return addTitle
    }
    this.getTotalList = () => {
        return totalList
    }
    this.getAllClickBtn = () => {
        return allClickBtn
    }
    this.getClearBtn = () => {
        return clearBtn
    }
    this.getClearAllBtn = () => {
        return clearAllBtn
    }
    this.getSeeAllBtn = () => {
        return seeAllBtn
    }
    this.getSelectDate = () => {
        return selectDate
    }
}
const getData = new FindData() // localStorage와 countNumber를 얻고, 갱신하는 인스턴스
const getNode = new GetNode() // node를 찾는 인스턴스
const paint = new Paint() // 리스트를 갱신하는 인스턴스
const drawChart = new DrawChart() // 달성률을 반영해서 차트를 그리는 이벤트
const today = new Today() // 날짜를 얻는 생성자

function start () { // 새로고침이나 페이지에 처음 들어갈 때 렌더링하는 함수
    getData.start()
    beforCheck()
}
start()
const dateEvnt = (e) => {
    const dataSelect = document.createElement('input')
    dataSelect.type = 'date'
    dataSelect.className = 'dataSelectInput'
    dataSelect.id = 'dataSelectId' + e.id.substr(11)
    e.textContent = ''
    e.appendChild(dataSelect)
    dataSelect.addEventListener('change', changeEvnt.setState)
    window.addEventListener('click', inputClose)
}
const seeDateEvnt = () => {
    getNode.getSeeAllBtn().checked = false
    let arr = getData.getData().loadingArr
    const date = getNode.getSelectDate().value
    arr = arr.filter(el => el.nodeDate === date)
    getNode.getTotalList().textContent = ''
    paint.start(arr)
}

const seeAllEvnt = () => {
    const seeAllNode = getNode.getSeeAllBtn()
    const selectDate = getNode.getSelectDate()
    if (seeAllNode.checked === true) {
        selectDate.value = '' // 공백만
        getNode.getTotalList().textContent = ''
        getData.start()
    } else if (selectDate.value === '') {
        selectDate.value = today.getToday()
        seeDateEvnt()
    }
}

const allClickEvnt = (e) => {
    allCheckVerify(e.srcElement.checked)

    const arr = getData.getData().loadingArr
    const allNodes = document.querySelectorAll('.listInputLabel')
    arr.forEach(element => { element.nodeCheck = this.state })
    if (this.state) {
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
    getData.setArr(arr)
}
const clearChecked = () => {
    let arr = getData.getData().loadingArr
    arr = arr.filter(detailCheck)
    getData.renderArr(arr)
}

const clearAll = () => {
    getData.renderArr([])
}
getNode.getClearBtn().addEventListener('click', clearChecked)
getNode.getAllClickBtn().addEventListener('change', allClickEvnt)
getNode.getClearAllBtn().addEventListener('click', clearAll)
getNode.getSeeAllBtn().addEventListener('click', seeAllEvnt)
getNode.getSelectDate().addEventListener('change', seeDateEvnt)

const clickAddBtn = () => { // state = {title, date(today), check(false)}
    getData.setData({ nodeId: getData.getData().countNumber, nodeTitle: getNode.getAddTitle().value, nodeContext: '', nodeCheck: false, nodeDate: today.getToday(), nodeGauge: 0 })
    getData.renderArr()
    getData.updateCountNumber()
    getNode.getAddTitle().value = ''
    allCheckVerify(false)
    getNode.getSeeAllBtn().checked = true
    getNode.getSelectDate().value = ''
}
getNode.getAddListBtn().addEventListener('click', clickAddBtn)

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
getNode.getTotalList().addEventListener('click', totalEvnt) // 화살표 함수로 바꾸세요~~~ 바인드 설명듣기~~~~

const changeEvnt = (e) => {
    const { findArr, arr } = findArrIndex(e.target.parentNode.id.substr(11))
    findArr.nodeDate = e.target.value
    e.target.parentNode.textContent = e.target.value
    getData.renderArr(arr)
}

const sortArr = (arr) => { // 날짜 정렬
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

const sortArrForNodeId = (arr) => {
    arr = arr.sort(function (previous, next) {
        return Number(previous.nodeId) - Number(next.nodeId)
    })
    return arr
}

const inputClose = (e) => {
    const dateInput = document.querySelectorAll('.dataSelectInput')
    if (dateInput.length === 1 && e.target.id !== dateInput[0].parentNode.id && e.target.id !== dateInput[0].id) {
        const { findArr } = findArrIndex(dateInput[0].id.substr(12))
        dateInput[0].parentNode.textContent = findArr.nodeDate
    }
}

const modalEvnt = (e) => {
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
const changeGuageEvnt = (e) => {
    const { findArr, arr } = findArrIndex(e.target.id.substr(17))
    findArr.nodeGauge = e.target.value
    getData.setArr(arr)
}

const findArrIndex = (id) => {
    const arr = getData.getData().loadingArr
    const findArr = arr.find(el => Number(el.nodeId) === Number(id))
    return { findArr, arr }
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
    const checkParent = document.querySelectorAll('.insertWriteDivOpen')
    if (checkParent.length === 1 && e.target.id !== checkParent[0].parentNode.id && e.target.id !== checkParent[0].previousSibling.id && e.target.className !== 'insertWriteDiv insertWriteDivOpen') {
        const { findArr: appenArr, arr } = findArrIndex(checkParent[0].parentNode.id.substr(7))
        appenArr.nodeContext = checkParent[0].value
        getData.setArr(arr)
        checkParent[0].parentNode.firstChild.textContent = appenArr.nodeContext
        checkParent[0].parentNode.firstChild.classList.toggle('modalContextDivOpen')
        checkParent[0].parentNode.firstChild.nextSibling.classList.toggle('insertWriteDivOpen')
        window.removeEventListener('click', readEvnt)
        checkParent[0].parentNode.addEventListener('click', writeEvnt)
    }
}

const checkEvnt = (state) => { // setState
    const arr = getData.getData().loadingArr
    const findNumber = state.id.substr(14)
    const index = arr.findIndex(e => Number(e.nodeId) === Number(findNumber))
    arr[index].nodeCheck = !(arr[index].nodeCheck)
    changeCheckEvnt(state)
    getData.setArr(arr)
    beforCheck()
}

const oneRemoveEvnt = (e) => {
    let newArr = getData.getData().loadingArr
    newArr = newArr.filter((el) => Number(el.nodeId) !== Number(e.id.substr(13)))
    getData.renderArr(newArr)
    beforCheck()
}
const detailCheck = (e) => {
    if (e.nodeCheck) {
        // const removeLi = document.getElementById('newList' + e.nodeId)
        // getNode.getTotalList().removeChild(removeLi)
        return false
    } else return true
}

const calculateGauge = (arr) => {
    const day = today.getToday()
    let count = 0
    function sumCallback (sum, cur) {
        if (cur.nodeDate === day) {
            count += 1
            return Number(sum) + Number(cur.nodeGauge)
        }
        return Number(sum)
    }
    const ans = arr.reduce((sumCallback), 0)
    return count !== 0 ? (ans / count) * 2.5 : 0
}

function DrawChart () {
    const canvas = document.getElementById('todayChartId')
    const ctx = canvas.getContext('2d')
    ctx.strokeRect(5, 20, 251, 100)
    this.setState = () => {
        const endGuage = calculateGauge(getData.getData().loadingArr)
        ctx.clearRect(5, 45, 250, 50)
        let cost = 0
        ctx.fillStyle = 'rgb(8, 33, 116)'
        ctx.strokeStyle = 'rgba(255, 255, 0, 0.5)'
        const draw = setInterval(function () {
            cost += 1
            if (cost >= endGuage) clearInterval(draw)
            ctx.fillRect(5, 45, cost, 50)
        })
    }
}
