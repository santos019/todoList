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
// const readEvnt = new ReadEvnt()
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
    }
}

function ModalEvnt () {
    this.setState = (e) => {
        const modalNode = document.getElementById('modalId' + e.id.substr(12))
        if (modalNode === null) {
            const arr = getData.getData().loadingArr
            const findArr = arr.find(el => Number(el.nodeId) === Number(e.id.substr(12)))
            const modal = document.createElement('div')
            const modalContext = document.createElement('div')
            modalContext.textContent = findArr.nodeContext
            modalContext.className = 'modalContextDiv'
            modalContext.id = 'modalContextId' + e.id.substr(12)
            modal.className = 'modalDiv'
            modal.id = 'modalId' + e.id.substr(12)
            modal.appendChild(modalContext)
            e.parentNode.insertAdjacentElement('afterend', modal)
            modal.addEventListener('click', writeEvnt.setState)
        } else {
            modalNode.parentNode.removeChild(modalNode)
            // window.removeEventListener('click', readEvnt.setState)
        }
    }
}
function WriteEvnt (e) {
    this.setState = (e, modal) => {
        const tmp = document.getElementById('insertWriteId')
        // const parent = e.target.className === 'modalContextDiv' ? e.target : e.target.firstChild
        console.log(e)
        if (!tmp) {
            console.log('test')
            const insertWrite = document.createElement('textarea')
            insertWrite.className = 'insertWriteDiv'
            const parent = e.target.className === 'modalDiv' ? e.target : e.target.parentNode
            console.log(parent)
            insertWrite.id = 'insertWriteId'
            const arr = getData.getData().loadingArr
            const findArr = arr.find(e => Number(e.nodeId) === Number(parent.id.substr(14)))
            insertWrite.value = findArr.nodeContext
            const test = document.getElementById('modalId0')
            test.insertBefore(insertWrite, null)
            console.log(insertWrite)
        } else {
            console.log(e.target)
            if (e.target.className !== 'insertWriteDiv') {
                const textDiv = document.getElementById('insertWriteId')
                const arr = getData.getData().loadingArr
                const modalIndex = textDiv.parentNode.className === 'modalContextDiv' ? textDiv.parentNode.id.substr(14) : textDiv.parentNode.id.substr(7)
                const findArr = arr.find(e => Number(e.nodeId) === Number(modalIndex))
                findArr.nodeContext = textDiv.value
                textDiv.parentNode.removeChild(textDiv)
                getData.setArr(arr)
            }
        }
    }
}

// function ReadEvnt () {
//     this.setState = (e) => {
//         const textDiv = document.getElementById('insertWriteId')
//         // 값을 저장하고, 윈도우로 니가는 이벤트
//         console.log('aaa')
//         if (e.target.className !== 'insertWriteDiv' && e.target.className !== 'modalDiv' && textDiv) {
//             // textDiv.previousSibling.style = 'display: block'
//             const arr = getData.getData().loadingArr
//             console.log('ttt')
//             const modalIndex = textDiv.parentNode.className === 'modalContextDiv' ? textDiv.parentNode.id.substr(14) : textDiv.parentNode.id.substr(7)
//             const findArr = arr.find(e => Number(e.nodeId) === Number(modalIndex))
//             findArr.nodeContext = textDiv.value
//             getData.setArr(arr)
//             textDiv.parentNode.addEventListener('click', writeEvnt.setState)
//             // textDiv.classList.add('textblock')
//             // textDiv.parentNode.removeChild(textDiv)
//             window.removeEventListener('click', readEvnt.setState)
//         }
//     }
// }
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
