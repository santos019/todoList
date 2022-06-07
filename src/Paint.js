import { deepCopy, sortArrForNodeId } from './lib'
import { getGlobalStore } from './GlobalStore'
import { changeCheckEvnt } from './checkModule'
import { modalEvnt } from './modalModule'
function Paint (initialState) {
    this.state = initialState
    this.$target = document.getElementById('myListId')
    this.afterArr = []
    // this.beforeArrLen = this.beforeArr.length
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
        const getGlobalIns = getGlobalStore.getInstance()
        this.beforeArr = deepCopy(getGlobalIns.getData().loadingArr)
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
            modalEvnt(changedNode)
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

// const paint = new Paint()

export const getPaint = (function () {
    let instance
    const initInstance = new Paint()
    function init () {
        return initInstance
    }
    return {
        getInstance: function () {
            if (instance) {
                return instance
            }
            instance = init()
            return instance
        }
    }
})()
