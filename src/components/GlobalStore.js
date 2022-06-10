import { sortArr } from '../lib'
import { getDrawChart } from './DrawChart'
import { getPaint } from './Paint'
function GlobalStore () {
    let output = localStorage.getItem('list')
    let loadingArr = JSON.parse(output) || []
    let countNumber = 0 // 이벤트를 할 때 마다 갱신하기
    const getDrawChartIns = getDrawChart.getInstance()
    const getPaintIns = getPaint.getInstance()
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
        getDrawChartIns.setState()
    }
    this.renderArr = (arr = loadingArr) => {
        loadingArr = arr
        sortArr(loadingArr)
        localStorage.setItem('list', JSON.stringify(loadingArr))
        getPaintIns.setState(loadingArr)
        getDrawChartIns.setState()
    }
    this.start = () => {
        let maxIndex = -1
        loadingArr.forEach(el => {
            if (el.nodeId > maxIndex) {
                maxIndex = el.nodeId
            }
        })
        countNumber = Number(maxIndex + 1)
        // console.log(getPaintIns.start(loadingArr))
        getPaintIns.start(loadingArr)
    }

    this.updateCountNumber = () => {
        countNumber = countNumber + 1
    }
}

// const globalStore = new GlobalStore() // globalStore
const getGlobalStore = (function () {
    let instance
    const initInstance = new GlobalStore()
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
export {
    getGlobalStore
}
