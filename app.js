// 렌더링은 setState와 render방식으로 구현하기~

function Paint (initialState) {
    this.state = initialState
    this.$target = document.getElementById('myListId')
    // const DayArr = ['일', '월', '화', '수', '목', '금', '토']
    this.setState = (nextState) => {
        this.state = nextState
        this.render(this.state)
    }

    this.render = (state) => {
        // state 값은 제목과 날짜 체크여부 => 배열 인자 하나씩 넣어주기
        const countNumber = getData.getData().countNumber
        const inserDate = document.createTextNode(state.nodeDate)
        const insertTitle = document.createTextNode(state.nodeTitle)
        const newList = document.createElement('li')
        const listInput = document.createElement('input')
        const listInputLabel = document.createElement('label')
        const listTitleDiv = document.createElement('div')
        const listDateDiv = document.createElement('div')
        const listRemoveDiv = document.createElement('div')
        newList.className = 'newList'
        newList.id = 'newList' + countNumber
        listInput.className = 'listInput'
        listInput.id = 'listInput' + countNumber
        listInput.type = 'checkbox'
        listInput.checked = state.check // 수정
        listInputLabel.className = 'listInputLabel'
        listInputLabel.id = 'listInputLabel' + countNumber
        listTitleDiv.className = 'listTitleDiv'
        listTitleDiv.id = 'listTitleDiv' + countNumber
        listDateDiv.className = 'listDateDiv'
        listDateDiv.id = 'listDateDiv' + countNumber
        listRemoveDiv.className = 'listRemoveDiv'
        listRemoveDiv.id = 'listRemoveDiv' + countNumber
        getData.updateCountNumber()
        this.$target.appendChild(newList)
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
    let countNumber // 이벤트를 할 때 마다 갱신하기

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
        drwaChart.setState(calculateGauge(arr))
    }
    this.ssetArr = (arr = loadingArr) => {
        loadingArr = arr
        countNumber = 0
        getNode.getTotalList().textContent = ''
        sortArr(loadingArr)
        localStorage.setItem('list', JSON.stringify(loadingArr))
        arr.forEach(element => {
            paint.setState(element)
            element.nodeId = getData.getData().countNumber - 1
        })
        drwaChart.setState(calculateGauge(arr))
    }
    this.updateCountNumber = () => {
        countNumber = countNumber + 1
    }
}

function GetNode () {
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
const clearChecked = new ClearChecked() // 체크한 리스트를 삭제
const allClickEvnt = new AllClickEvnt() // 모든 리스트 클릭
const allCheckVerify = new AllCheckVerify() // 전체 선택 버튼의 활성화 여부 판단
const getData = new FindData() // localStorage와 countNumber를 얻고, 갱신하는 인스턴스
const getNode = new GetNode() // node를 찾는 인스턴스
const paint = new Paint() // 리스트를 갱신하는 인스턴스
const checkEvnt = new LabelEvnt() // 체크 버튼을 누르는 이벤트
const clearAll = new ClearAll() // 모든 리스트를 삭제
const modalEvnt = new ModalEvnt() // 모달이 열리는 이벤트
const writeEvnt = new WriteEvnt() // 모달에서 글쓰기 화면으로 전환 되는 이벤트
const readEvnt = new ReadEvnt() // 모달에서 다시 읽기 화면으로 전환 되는 이벤트
const dateEvnt = new DateEvnt() // 달력 클릭 이벤트
const changeEvnt = new ChangeEvnt() // 달력에서 날짜를 정하면 해당 변경사항을 저장하는 이벤트
const inputClose = new InputClose() // 달력에서 날짜를 정하지 않고 윈도우를 클릭해서 달력을 종료했을 때, 다시 그전 날짜를 div에 띄어주는 이벤트
const seeAllEvnt = new SeeAllEvnt() // 전체 리스트 보기 이벤트
const seeDateEvnt = new SeeDateEvnt() // 달력에서 날짜를 정해서 리스를 보여주는 이벤트
const changeGuageEvnt = new ChangeGuageEvnt() // 게이지가 변하면 달성률을 수정해주는 이벤트
const drwaChart = new DrwaChart() // 달성률을 반영해서 차트를 그리는 이벤트
const today = new Today() // 날짜를 얻는 생성자

function start () { // 새로고침이나 페이지에 처음 들어갈 때 렌더링하는 함수
    getData.ssetArr()
    beforCheck()
}
start()

getNode.getClearBtn().addEventListener('click', clearChecked.setState)
getNode.getAllClickBtn().addEventListener('change', allClickEvnt.setState)
getNode.getClearAllBtn().addEventListener('click', clearAll.setState)
getNode.getSeeAllBtn().addEventListener('click', seeAllEvnt.setState)
getNode.getSelectDate().addEventListener('change', seeDateEvnt.setState)

function SeeDateEvnt () {
    const $target = getNode.getSelectDate()
    this.setState = (e) => {
        getNode.getSeeAllBtn().checked = false
        let arr = getData.getData().loadingArr
        const date = $target.value
        arr = arr.filter(el => el.nodeDate === date)
        getData.initDate() // 초기화
        getNode.getTotalList().textContent = ''
        arr.forEach(element => {
            paint.setState(element)
            element.nodeId = getData.getData().countNumber - 1
        })
    }
}

function SeeAllEvnt () {
    const seeAllNode = getNode.getSeeAllBtn()
    const selectDate = getNode.getSelectDate()
    seeAllNode.checked = true
    this.setState = (e) => { // 똑같이 그냥 ssetArr 호출하면됨
        if (seeAllNode.checked === true) {
            selectDate.value = '----------'
            getData.ssetArr()
        } else if (selectDate.value === '') {
            selectDate.value = today.getToday()
            seeDateEvnt.setState()
        }
    }
}

function AllClickEvnt (e) {
    this.state = null
    this.setState = (e) => {
        this.state = e.srcElement.checked
        allCheckVerify.setState(this.state)
        this.render(e.srcElement.checked)
    }
    this.render = (tmp) => {
        const arr = getData.getData().loadingArr
        const allNodes = document.querySelectorAll('.listInputLabel')
        arr.forEach(element => { element.nodeCheck = tmp })
        if (tmp) {
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
}
function AllCheckVerify () {
    this.state = null
    this.$target = document.getElementById('allCheckInputId')
    this.$labelTarget = document.getElementById('allCheckLabelId')
    this.setState = (e) => {
        this.state = e
        this.$target.checked = e
        this.render(e)
    }
    this.render = (e) => {
        this.$labelTarget.textContent = (e === true ? '전체 해제' : '전체 선택')
    }
}

getNode.getAddListBtn().addEventListener('click', clickAddBtn)
function clickAddBtn () { // state = {title, date(today), check(false)}
    getData.setData({ nodeId: getData.getData().countNumber, nodeTitle: getNode.getAddTitle().value, nodeContext: '', nodeCheck: false, nodeDate: today.getToday(), nodeGauge: 0 })
    getData.ssetArr()
    getNode.getAddTitle().value = ''
    allCheckVerify.setState(false)
    getNode.getSeeAllBtn().checked = true
    getNode.getSelectDate().value = ''
}
getNode.getTotalList().addEventListener('click', totalEvnt)
function totalEvnt (event) {
    if (event.target.classList.contains('listInputLabel')) {
        checkEvnt.setState(event.target)
    } else if (event.target.className === 'listRemoveDiv') {
        oneRemoveEvnt(event.target)
    } else if (event.target.className === 'listTitleDiv') {
        modalEvnt.setState(event.target)
    } else if (event.target.className === 'listDateDiv') {
        dateEvnt.setState(event.target)
    }
}
function DateEvnt () {
    this.setState = (e) => {
        const dataSelect = document.createElement('input')
        dataSelect.type = 'date'
        dataSelect.className = 'dataSelectInput'
        dataSelect.id = 'dataSelectId' + e.id.substr(11)
        e.textContent = ''
        e.appendChild(dataSelect)
        dataSelect.addEventListener('change', changeEvnt.setState)
        window.addEventListener('click', inputClose.setState)
    }
}
function ChangeEvnt () {
    this.setState = (e) => {
        const { findArr, arr } = findArrIndex(e.target.parentNode.id.substr(11))
        findArr.nodeDate = e.target.value
        e.target.parentNode.textContent = e.target.value
        getData.ssetArr(arr)
    }
}

function sortArr (arr) { // 날짜 정렬
    for (const i in arr) {
        arr[i].nodeDate = Number(arr[i].nodeDate.substr(0, 4) + arr[i].nodeDate.substr(5, 2) + arr[i].nodeDate.substr(8, 2))
    }
    arr = arr.sort(function (previous, next) {
        return previous.nodeDate - next.nodeDate
    })
    for (const i in arr) {
        arr[i].nodeDate = String(arr[i].nodeDate).substr(0, 4) + '-' + String(arr[i].nodeDate).substr(4, 2) + '-' + String(arr[i].nodeDate).substr(6, 2)
    }
    return arr
}

function InputClose () {
    this.setState = (e) => {
        const dateInput = document.querySelectorAll('.dataSelectInput')
        if (dateInput.length === 1 && e.target.id !== dateInput[0].parentNode.id && e.target.id !== dateInput[0].id) {
            const { findArr } = findArrIndex(dateInput[0].id.substr(12))
            dateInput[0].parentNode.textContent = findArr.nodeDate
        }
    }
}

function ModalEvnt () {
    const id = 0
    this.getId = () => {
        return id
    }
    this.setId = (nextId) => {
        this.id = nextId
    }
    this.setState = (e) => {
        this.id = e.id.substr(12)
        const id = this.id
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
            modalGuage.addEventListener('change', changeGuageEvnt.setState)
            e.parentNode.insertAdjacentElement('afterend', modal)
            modal.addEventListener('click', writeEvnt.setState)
        } else if (e.parentNode.nextSibling.className === 'modalDiv') {
            modalNode.removeChild(modalNode.firstChild)
            modalNode.removeChild(modalNode.firstChild)
            modalNode.parentNode.removeChild(modalNode)
        }
    }
}
function ChangeGuageEvnt () {
    this.setState = (e) => {
        const { findArr, arr } = findArrIndex(e.target.id.substr(17))
        findArr.nodeGauge = e.target.value
        getData.setArr(arr)
    }
}
function findArrIndex (id) {
    const arr = getData.getData().loadingArr
    const findArr = arr.find(el => Number(el.nodeId) === Number(id))
    return { findArr, arr }
}
function WriteEvnt () {
    this.setState = (e) => {
        const upParent = document.querySelectorAll('.insertWriteDivOpen')
        if ((e.target.classList.contains('modalContextDiv') || (e.target.className === 'modalDiv')) && (upParent.length === 0)) {
            const parent = (e.target.classList.contains('modalContextDiv') ? e.target.parentNode : e.target)
            parent.firstChild.classList.toggle('modalContextDivOpen')
            parent.firstChild.nextSibling.classList.toggle('insertWriteDivOpen')
            window.addEventListener('click', readEvnt.setState)
            parent.removeEventListener('click', writeEvnt.setState)
        }
    }
}
function ReadEvnt () {
    this.setState = (e) => {
        const checkParent = document.querySelectorAll('.insertWriteDivOpen')
        if (checkParent.length === 1 && e.target.id !== checkParent[0].parentNode.id && e.target.id !== checkParent[0].previousSibling.id && e.target.className !== checkParent[0].parentNode.previousSibling.childNodes[1].id && e.target.className !== 'insertWriteDiv insertWriteDivOpen') {
            const { findArr: appenArr, arr } = findArrIndex(checkParent[0].parentNode.id.substr(7))
            appenArr.nodeContext = checkParent[0].value
            getData.setArr(arr)
            checkParent[0].parentNode.firstChild.textContent = appenArr.nodeContext
            checkParent[0].parentNode.firstChild.classList.toggle('modalContextDivOpen')
            checkParent[0].parentNode.firstChild.nextSibling.classList.toggle('insertWriteDivOpen')
            window.removeEventListener('click', readEvnt.setState)
            checkParent[0].parentNode.addEventListener('click', writeEvnt.setState)
        }
    }
}

function LabelEvnt () { // setState
    this.state = null
    this.setState = (e) => {
        this.state = e
        this.render(this.state)
    }

    this.render = (state) => {
        const arr = getData.getData().loadingArr
        const findNumber = state.id.substr(14)
        const index = arr.findIndex(e => Number(e.nodeId) === Number(findNumber))
        arr[index].nodeCheck = !(arr[index].nodeCheck)
        changeCheckEvnt(state)
        getData.setArr(arr)
        beforCheck()
    }
}

function changeCheckEvnt (e) {
    e.nextSibling.classList.toggle('listTitleDivTrue')
    e.classList.toggle('listInputLabelTrue')
}

function oneRemoveEvnt (e) {
    let newArr = getData.getData().loadingArr
    e.parentNode.remove()
    newArr = newArr.filter((el) => Number(el.nodeId) !== Number(e.id.substr(13)))
    getData.ssetArr(newArr)
    beforCheck()
}

function beforCheck () {
    const arr = getData.getData().loadingArr
    if (arr.length === 0) allCheckVerify.setState(false)
    for (const i in arr) {
        if (arr[i].nodeCheck === false) {
            allCheckVerify.setState(false)
            return
        } else if (Number(i) === (arr.length - 1)) {
            allCheckVerify.setState(true)
        }
    }
}
function ClearChecked () {
    this.$target = document.getElementById('checkedClearId')

    this.setState = () => {
        this.render()
    }
    this.render = () => {
        let arr = getData.getData().loadingArr
        arr = arr.filter(detailCheck)
        getData.ssetArr(arr)
    }
}

function ClearAll () {
    this.$target = document.getElementById('myListId')
    this.setState = () => {
        while (this.$target.hasChildNodes()) {
            this.$target.removeChild(this.$target.firstChild)
        }
        getData.ssetArr([])
    }
}
function detailCheck (e) {
    if (e.nodeCheck) {
        const removeLi = document.getElementById('newList' + e.nodeId)
        getNode.getTotalList().removeChild(removeLi)
        return false
    } else return true
}

function calculateGauge (arr) {
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

// function drawNumber (before. current) {
// }
function DrwaChart () {
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
