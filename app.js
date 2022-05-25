// 렌더링은 setState와 render방식으로 구현하기~

function Paint (initialState) {
    this.state = initialState
    this.$target = document.getElementById('myListId')
    // const DayArr = ['일', '월', '화', '수', '목', '금', '토']
    //    const countNumber = loadingArr.length === 0 ? 0 : loadingArr[loadingArr.length - 1].nodeId + 1
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

function FindData () {
    let output = localStorage.getItem('list')
    let loadingArr = JSON.parse(output) || []
    let countNumber // 이벤트를 할 때 마다 갱신하기

    this.getData = () => { // countNumber를 이렇게 한 이유 : 새롭게 리스트를 추가했을 때 nodeId가 겹칠 수 있기 때문에 겹칠 일 없이 nodeId 최대
        return { output, loadingArr, countNumber }
    }
    this.setData = ({ nodeId, nodeTitle, nodeContext, nodeCheck, nodeDate }) => {
        loadingArr.push({ nodeId: Number(nodeId), nodeTitle: String(nodeTitle), nodeContext: String(nodeContext), nodeCheck: Boolean(nodeCheck), nodeDate: String(nodeDate) })
        localStorage.setItem('list', JSON.stringify(loadingArr))
    }
    this.initDate = () => {
        output = localStorage.getItem('list')
        loadingArr = JSON.parse(output) || []
        countNumber = 0 // loadingArr.length === 0 ? 0 : loadingArr[loadingArr.length - 1].nodeId + 1
    }
    this.setArr = (arr) => {
        loadingArr = arr
        localStorage.setItem('list', JSON.stringify(loadingArr))
    }
    this.updateCountNumber = () => {
        countNumber = countNumber + 1
    }
    // this.initCountNumber = () => {
    //     countNumber = 0
    // }
}

function GetNode () {
    const addListBtn = document.getElementById('addBtnId')
    const addTitle = document.getElementById('addTitleId')
    const totalList = document.getElementById('myListId')
    const allClickBtn = document.getElementById('allCheckInputId')
    const clearBtn = document.getElementById('checkedClearId')
    const clearAllBtn = document.getElementById('AllClearId')
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
}
const clearChecked = new ClearChecked()
const allClickEvnt = new AllClickEvnt()
const allCheckVerify = new AllCheckVerify()
const getData = new FindData() // localStorage와 countNumber를 얻고, 갱신하는 인스턴스
const getNode = new GetNode() // node를 찾는 인스턴스
const paint = new Paint() // 리스트를 갱신하는 인스턴스
const checkEvnt = new LabelEvnt()
const clearAll = new ClearAll()
const modalEvnt = new ModalEvnt()
const writeEvnt = new WriteEvnt()
const readEvnt = new ReadEvnt()
const dataEvnt = new DataEvnt()
function start () { // 새로고침이나 페이지에 처음 들어갈 때 렌더링하는 함수
    getData.initDate() // 초기화
    const arr = getData.getData().loadingArr
    arr.forEach(element => {
        paint.setState(element)
        element.nodeId = getData.getData().countNumber - 1
    })
    getData.setArr(arr)
    beforCheck()
}
start()
getNode.getClearBtn().addEventListener('click', () => clearChecked.setState())
getNode.getAllClickBtn().addEventListener('change', (e) => allClickEvnt.setState(e))
getNode.getClearAllBtn().addEventListener('click', () => clearAll.setState())
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
    const makeDate = new Date()
    const todayDate = makeDate.toISOString().substr(0, 10)
    paint.setState({ nodeTitle: getNode.getAddTitle().value, nodeDate: todayDate, nodeCheck: false })
    getData.setData({ nodeId: getData.getData().countNumber - 1, nodeTitle: getNode.getAddTitle().value, nodeContext: '', nodeCheck: false, nodeDate: todayDate })
    getNode.getAddTitle().value = ''
    allCheckVerify.setState(false)
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
        dataEvnt.setState(event.target)
    }
}
function DataEvnt () {
    this.setState = (e) => {
        const dataSelect = document.createElement('input')
        dataSelect.type = 'date'
        e.appendChild(dataSelect)
        console.log(dataSelect.value)
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
            modalContext.className = 'modalContextDiv'
            modalContext.id = 'modalContextId' + id
            modal.className = 'modalDiv'
            modal.id = 'modalId' + id
            const { modalContext: appenNode, findArr: appenArr } = modalContextUpdate(modalContext, id)
            const insertWrite = document.createElement('textarea')
            insertWrite.className = 'insertWriteDiv'
            insertWrite.id = 'insertWriteId' + id
            insertWrite.value = appenArr.nodeContext
            modalContext.textContent = appenArr.nodeContext
            modalContext.classList.add('modalContextDivOpen')
            modal.appendChild(appenNode)
            modal.appendChild(insertWrite)
            e.parentNode.insertAdjacentElement('afterend', modal)
            modal.addEventListener('click', writeEvnt.setState)
        } else if (e.parentNode.nextSibling.className === 'modalDiv') {
            console.log(e.parentNode.nextSibling.className)
            modalNode.removeChild(modalNode.firstChild)
            modalNode.removeChild(modalNode.firstChild)
            modalNode.parentNode.removeChild(modalNode)
        }
    }
}
function modalContextUpdate (modalContext, id) {
    const arr = getData.getData().loadingArr
    const findArr = arr.find(el => Number(el.nodeId) === Number(id))
    return { modalContext, findArr, arr }
}
function WriteEvnt (e) {
    this.setState = (e) => {
        const upParent = document.querySelectorAll('.insertWriteDivOpen')
        if ((e.target.classList.contains('modalContextDiv') || (e.target.className === 'modalDiv')) && (upParent.length === 0)) {
            console.log('write')
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
        console.log(checkParent)
        if (checkParent.length === 1 && e.target.id !== checkParent[0].parentNode.id && e.target.id !== checkParent[0].previousSibling.id && e.target.className !== checkParent[0].parentNode.previousSibling.childNodes[1].id && e.target.className !== 'insertWriteDiv insertWriteDivOpen') {
            const { modalContext: appenNode, findArr: appenArr, arr } = modalContextUpdate(checkParent[0].parentNode.firstChild, checkParent[0].parentNode.id.substr(7))
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
    getData.setArr(newArr)
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
        // const checkedNodes = document.querySelectorAll('.newList')
        let arr = getData.getData().loadingArr
        arr = arr.filter(detailCheck)
        getData.setArr(arr)
    }
}

function ClearAll () {
    this.$target = document.getElementById('myListId')
    this.setState = () => {
        while (this.$target.hasChildNodes()) {
            this.$target.removeChild(this.$target.firstChild)
        }
        getData.setArr([])
    }
}
function detailCheck (e) {
    if (e.nodeCheck) {
        const removeLi = document.getElementById('newList' + e.nodeId)
        getNode.getTotalList().removeChild(removeLi)
        return false
    } else return true
}
