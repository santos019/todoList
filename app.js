// 렌더링은 setState와 render방식으로 구현하기~
function deepCopy (object) { // depth 2
    // console.log(object)
    if (object === null || typeof object !== 'object') {
        return object
    }
    const copy = Array.isArray(object) ? [] : {}
    for (const key in object) {
        copy[key] = deepCopy(object[key])
    }

    return copy
}
function Paint (initialState) {
    this.state = initialState
    this.$target = document.getElementById('myListId')
    this.beforeArr = []
    this.afterArr = []
    this.beforeArrLen = 0
    this.afterArrLen = 0
    this.count = 0
    // this.beforeCount = 0
    // this.afterCount = 0
    // const DayArr = ['일', '월', '화', '수', '목', '금', '토']
    this.setState = (nextState) => {
        // 어차피 한 번에 바뀌는 건 하나의 노드뿐
        console.log(nextState)
        this.afterArr = deepCopy(nextState)
        console.log(typeof this.beforeArr)
        console.log(this.afterArr)
        this.beforeArrLen = this.beforeArr.length
        this.afterArrLen = this.afterArr.length
        console.log(this.beforeArrLen)
        console.log(this.afterArrLen)
        if (this.afterArrLen > this.beforeArrLen) { // 증가
            this.addNode()
        } else if (this.afterArrLen < this.beforeArrLen) { // 감소
            this.minusNode()
        } else { // 동일 상세 데이터 조회 후, 해당 노드만 다시 렌더링
            this.detailNode()
        }
        // })
        this.beforeArr = deepCopy(nextState)
        // console.log(this.beforArr)
        // this.render(this.state)
    }
    this.start = (nextState) => {
        nextState.forEach(el => {
            this.$target.appendChild(this.render(el))
        })
        this.beforeArr = deepCopy(nextState)
    }
    this.addNode = () => {
        if (this.beforeArrLen === 0) {
            this.$target.appendChild(this.render(this.afterArr[0]))
        }
        for (const i in this.beforeArr) {
            if (Number(this.afterArr[i].nodeId) !== Number(this.beforeArr[i].nodeId)) { // 다르면 i의 앞에 넣는다.
                // i의 앞에 넣는 함수 호출
                const $addTarget = document.getElementById('newList' + this.beforeArr[i].nodeId)
                $addTarget.insertAdjacentElement('beforebegin', this.render(this.afterArr[i]))
                break
            }
            if (Number(i) === Number(this.beforeArrLen - 1)) { // before의 마지막까지 모두 같으면 새로운 노드는 제일 마지막에 들어간다. // before.length의 뒤에 넣는 함수 호출
                this.$target.appendChild(this.render(this.afterArr[Number(this.beforeArrLen)]))
            }
        }
    }
    this.minusNode = () => { // 노드 데이터 순서대로 정렬하고 지우기
        this.afterArr = sortArrForNodeId(this.afterArr)
        this.beforeArr = sortArrForNodeId(this.beforeArr)
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
    // this.minusNode = () => {
    //     console.log(this.beforeCount)
    //     console.log(this.afterCount)
    //     if ((this.afterCount >= this.afterArrLen) || (this.beforeCount >= this.beforeArrLen)) {
    //         if (this.beforeCount < this.beforeArrLen) {
    //             for (let i = Number(this.beforeCount); i <= Number(this.beforeArrLen - 1); i++) {
    //                 console.log(i)
    //                 const $minusTarget = document.getElementById('newList' + this.beforeArr[i].nodeId)
    //                 console.log($minusTarget)
    //                 this.$target.removeChild($minusTarget)
    //             }
    //         }
    //         this.beforeCount = 0
    //         this.afterCount = 0
    //         return
    //     }
    //     if (Number(this.beforeArr[this.beforeCount].nodeId) === Number(this.afterArr[this.afterCount].nodeId)) {
    //         this.beforeCount++
    //         this.afterCount++
    //     } else {
    //         const $minusTarget = document.getElementById('newList' + this.beforeArr[`${this.beforeCount}`].nodeId)
    //         console.log($minusTarget)
    //         console.log('newList' + this.beforeArr[`${this.beforeCount}`].nodeId)
    //         this.$target.removeChild($minusTarget)
    //         this.beforeCount++
    //     }
    //     this.minusNode()
    // }

    // this.minusNode = () => {
    //     console.log(this.afterArr)
    //     console.log(this.beforeArr)
    //     const minusBeforeArrLen = Object.keys(this.beforeArr).length
    //     console.log(minusBeforeArrLen)
    //     // console.log(this.afterArr[this.count].nodeId)
    //     if (Number(this.count) >= Number(this.afterArrLen)) {
    //         if (Number(minusBeforeArrLen) !== this.afterArrLen) {
    //             const $minusTarget = document.getElementById('newList' + this.beforeArr[this.count].nodeId)
    //             this.$target.removeChild($minusTarget)
    //         }
    //         this.count = 0
    //     } else {
    //         let test = String(this.count)
    //         console.log('in')
    //         console.log((this.count))
    //         console.log(Number(this.count))
    //         console.log(this.afterArr)
    //         console.log(this.afterArr['0'])
    //         console.log(typeof this.count)
    //         console.log(typeof this.afterArr)
    //         console.log(this.afterArr[test])
    //         console.log(this.afterArr[`${this.count}`])
    //         console.log(this.beforeArr[test])
    //         console.log(this.beforeArr[`${this.count}`])
    //         if (Number(this.afterArr[Number(this.count)].nodeId) === Number(this.beforeArr[Number(this.count)].nodeId)) {
    //             this.count += 1
    //             console.log('1')
    //         } else {
    //             console.log('2')
    //             const $minusTarget = document.getElementById('newList' + this.beforeArr[this.count].nodeId)
    //             this.$target.removeChild($minusTarget)
    //             console.log(this.beforeArr)
    //             console.log(this.count)
    //             console.log(this.beforeArr[Number(this.count)].nodeId)
    //             delete this.beforeArr[`${this.count}`]
    //             // this.beforeArr = deepCopy(this.beforeArr.filter(el => console.log(el))) //Number(el.nodeId) !== Number(this.beforeArr[`${this.count}`].nodeId))
    //             console.log(this.beforeArr)
    //         }
    //         this.minusNode()
    //     }
    // }
    // this.minusNode = () => {
    //     console.log(this.afterArr)
    //     for (const i in this.afterArr) {
    //         if (this.afterArr[i].nodeId !== this.beforeArr[i].nodeId) { // 다르면 before에 있는거 그냥 삭제
    //             const $minusTarget = document.getElementById('newList' + this.beforeArr[i].nodeId)
    //             $minusTarget.parentNode.removeChild($minusTarget)
    //             break
    //         }
    //         if (i === this.afterArrLen - 1) { // 마지막 nextState까지 모두 돌았기 때문에, 없으면 before의 제일 마지막 노드를 삭제한다.
    //             this.$target.removeChild(this.$target.lastChild)
    //         }
    //     }
    // }
    this.detailNode = () => {
        for (const i in this.afterArr) {
            if (JSON.stringify(this.afterArr[i]) !== JSON.stringify(this.beforeArr[i])) { // 지우고 다시 그리기? i번째 노드를 지우고 i번째 앞에 다시 그리기
                const $changeRemoveNode = document.getElementById('newList' + this.afterArr[i].nodeId)
                this.$target.insertAdjacentElement('afterend', this.render(this.afterArr[i]))
                this.$target.removeChild($changeRemoveNode)
            }
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
        // getData.updateCountNumber()
        // this.$target.appendChild(newList)
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
    this.ssetArr = (arr = loadingArr) => {
        loadingArr = arr
        // countNumber = 0
        // getNode.getTotalList().textContent = ''
        sortArr(loadingArr)
        localStorage.setItem('list', JSON.stringify(loadingArr))
        paint.setState(loadingArr)
        // arr.forEach(element => {
        //     paint.setState(element)
        //     // element.nodeId = getData.getData().countNumber -1
        // })
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
const drawChart = new DrawChart() // 달성률을 반영해서 차트를 그리는 이벤트
const today = new Today() // 날짜를 얻는 생성자

function start () { // 새로고침이나 페이지에 처음 들어갈 때 렌더링하는 함수
    getData.start()
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
            selectDate.value = '' // 공백만
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
    getData.updateCountNumber()
    getNode.getAddTitle().value = ''
    allCheckVerify.setState(false)
    getNode.getSeeAllBtn().checked = true
    getNode.getSelectDate().value = ''
}
getNode.getTotalList().addEventListener('click', totalEvnt) // 화살표 함수로 바꾸세요~~~ 바인드 설명듣기~~~~

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
        arr[i].nodeDate = String(arr[i].nodeDate).substring(0, 4) + '-' + String(arr[i].nodeDate).substr(4, 2) + '-' + String(arr[i].nodeDate).substr(6, 2)
    }
    return arr
}

function sortArrForNodeId (arr) {
    arr = arr.sort(function (previous, next) {
        return Number(previous.nodeId) - Number(next.nodeId)
    })
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
    this.setState = (e) => {
        const id = e.id.substr(12)
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
    // e.parentNode.remove()
    newArr = newArr.filter((el) => Number(el.nodeId) !== Number(e.id.substr(13)))
    console.log(newArr)
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
