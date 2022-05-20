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
        if (state.check === true) {
            listInputLabel.classList.add('listInputLabelTrue')
        }
        this.$target.appendChild(newList)
        listTitleDiv.appendChild(insertTitle)
        listInputLabel.appendChild(listInput)
        newList.appendChild(listInputLabel)
        newList.appendChild(listTitleDiv)
        newList.appendChild(listDateDiv)
        newList.appendChild(listRemoveDiv)
        listDateDiv.appendChild(inserDate)
    }
}

function FindData () {
    let output
    let loadingArr
    let countNumber // 이벤트를 할 때 마다 갱신하기

    this.getData = () => { // countNumber를 이렇게 한 이유 : 새롭게 리스트를 추가했을 때 nodeId가 겹칠 수 있기 때문에 겹칠 일 없이 nodeId 최대
        output = localStorage.getItem('list')
        loadingArr = JSON.parse(output) || []
        return { output, loadingArr, countNumber }
    }
    this.setData = ({ nodeId, nodeTitle, nodeContext, nodeCheck, nodeDate }) => {
        loadingArr.push({ nodeId: Number(nodeId), nodeTitle: String(nodeTitle), nodeContext: String(nodeContext), nodeCheck: Boolean(nodeCheck), nodeDate: String(nodeDate) })
        localStorage.setItem('list', JSON.stringify(loadingArr))
    }
    this.initDate = () => {
        output = localStorage.getItem('list')
        loadingArr = JSON.parse(output) || []
        countNumber = loadingArr.length === 0 ? 0 : loadingArr[loadingArr.length - 1].nodeId + 1
    }
    this.setArr = (arr) => {
        loadingArr = arr
        localStorage.setItem('list', JSON.stringify(loadingArr))
    }
    this.updateCountNumber = () => {
        countNumber = countNumber + 1
    }
}

function GetNode () {
    const addListBtn = document.getElementById('addBtnId')
    const addTitle = document.getElementById('addTitleId')
    const totalList = document.getElementById('myListId')
    this.getAddListBtn = () => {
        return addListBtn
    }
    this.getAddTitle = () => {
        return addTitle
    }
    this.getTotalList = () => {
        return totalList
    }
}

// function FindData2 () {
//     this.output = 0
//     this.loadingArr = 1

//     this.getData = () => {
//         this.output = 2
//         this.loadingArr = 3
//         const output = this.output
//         const loadingArr = this.loadingArr
//         return { output, loadingArr }
//     }
// }
const getData = new FindData() // localStorage와 countNumber를 얻고, 갱신하는 인스턴스
const getNode = new GetNode() // node를 찾는 인스턴스
const paint = new Paint() // 리스트를 갱신하는 인스턴스

function start () {
    getData.initDate()
    const arr = getData.getData().loadingArr
    arr.forEach(element => {
        console.log(element)
        paint.setState(element)
    })
}
start()

console.log(getNode.getAddListBtn())
getNode.getAddListBtn().addEventListener('click', clickAddBtn)
function clickAddBtn () { // state = {title, date(today), check(false)}
    const makeDate = new Date()
    const todayDate = makeDate.toISOString().substr(0, 10)
    console.log(todayDate)
    paint.setState({ nodeTitle: getNode.getAddTitle().value, nodeDate: todayDate, nodeCheck: false })
    getData.setData({ nodeId: getData.getData().countNumber - 1, nodeTitle: getNode.getAddTitle().value, nodeContext: '', nodeCheck: false, nodeDate: todayDate })
}
getNode.getTotalList().addEventListener('click', totalEvnt)
function totalEvnt () {
    if (event.target.classList.contains('listInputLabel')) {
        labelEvnt(event.target)
    } else if (event.target.className === 'listRemoveDiv') {
        oneRemoveEvnt(event.target)
    }
}

function labelEvnt (e) {
    e.classList.toggle('listInputLabelTrue')
}
function oneRemoveEvnt (e) {
    e.classList.toggle('listInputLabelTrue')
    let newArr = getData.getData().loadingArr
    e.parentNode.remove()
    console.log(newArr)
    console.log(Number(e.id.substr(13)))
    newArr = newArr.filter((el) => Number(el.nodeId) !== Number(e.id.substr(13)))
    console.log(newArr)
    getData.setArr(newArr)
}

