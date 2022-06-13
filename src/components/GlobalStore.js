import { sortArr } from '../lib'
import { getDrawChart } from './DrawChart'
import { getPaint } from './Paint'
import { HeaderPaintAdd } from './HeaderPaint'
function GlobalStore () {
    let output = localStorage.getItem('list')
    let loadingArr = JSON.parse(output) || []
    let countNumber = 0
    const getDrawChartIns = getDrawChart.getInstance()
    const getPaintIns = getPaint.getInstance()
    this.getData = () => {
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
            HeaderPaintAdd(el)
        })
        countNumber = Number(maxIndex + 1)
        getPaintIns.start(loadingArr)
    }

    this.updateCountNumber = () => {
        countNumber = countNumber + 1
    }
}

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
