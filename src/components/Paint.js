import { deepCopy, sortArrForNodeId } from '../lib'
import { getGlobalStore } from './GlobalStore'
import { changeCheckEvnt } from '../modules/checkModule'
import { modalEvnt } from '../modules/modalModule'
import { HeaderPaintAdd, HeaderPaintAllRemove, HeaderPaintRemove } from './HeaderPaint'
function Paint (initialState) {
    this.state = initialState
    this.$target = document.getElementById('myListId')
    this.afterArr = []
    this.afterArrLen = 0
    this.count = 0
    this.setState = (nextState) => {
        this.afterArr = deepCopy(nextState)
        this.beforeArrLen = this.beforeArr.length
        this.afterArrLen = this.afterArr.length
        if ((this.afterArrLen > this.beforeArrLen) || (this.afterArrLen > 0 && this.beforeArrLen === 0)) {
            HeaderPaintAdd(this.addNode())
        } else if (this.afterArr.length === 0) {
            while (this.$target.hasChildNodes()) {
                this.$target.removeChild(this.$target.firstChild)
                HeaderPaintAllRemove()
            }
        } else if (this.afterArrLen < this.beforeArrLen) {
            this.afterArr = sortArrForNodeId(this.afterArr)
            this.beforeArr = sortArrForNodeId(this.beforeArr)
            this.minusNode()
        } else {
            this.detailNode()
        }

        this.beforeArr = deepCopy(nextState)
    }
    this.start = (nextState) => {
        const getGlobalIns = getGlobalStore.getInstance()
        this.beforeArr = deepCopy(getGlobalIns.getData().loadingArr)
        nextState.forEach(el => {
            this.$target.appendChild(this.render(el))
            HeaderPaintAdd(el)
        })
    }
    this.addNode = () => {
        if (this.beforeArrLen === 0) {
            this.$target.appendChild(this.render(this.afterArr[0]))
            return this.afterArr[0]
        }
        const i = this.beforeArr.findIndex((node, index) => Number(node.nodeId) !== Number(this.afterArr[index].nodeId))

        if (i === -1) {
            this.$target.appendChild(this.render(this.afterArr[Number(this.beforeArrLen)]))
            return this.afterArr[Number(this.beforeArrLen)]
        } else {
            const $addTarget = document.getElementById('newList' + this.beforeArr[i].nodeId)
            $addTarget.insertAdjacentElement('beforebegin', this.render(this.afterArr[i]))
            return this.render(this.afterArr[i])
        }
    }
    this.minusNode = () => {
        if (this.count > this.afterArrLen - 1) {
            for (let i = Number(this.count); i <= this.beforeArr.length - 1; i++) {
                const $minusTarget = document.getElementById('newList' + this.beforeArr[i].nodeId)
                HeaderPaintRemove(this.beforeArr[i])
                this.$target.removeChild($minusTarget)
            }
            this.count = 0
            return
        }
        if (Number(this.afterArr[this.count].nodeId) === Number(this.beforeArr[this.count].nodeId)) {
            this.count++
        } else {
            const $minusTarget = document.getElementById('newList' + this.beforeArr[this.count].nodeId)
            HeaderPaintRemove(this.beforeArr[this.count])
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
        if ($changeTarget.classList.contains('modalOpen')) {
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
        listInput.checked = state.check
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
