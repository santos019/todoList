import { getGlobalStore } from './GlobalStore'
import { getToday } from '../lib'

class DrawChart {
    constructor () {
        this.canvas = document.getElementById('todayChartId')
        this.ctx = this.canvas.getContext('2d')
    }

    setState () {
        const getGlobalIns = getGlobalStore.getInstance()
        const endGuage = calculateGauge(getGlobalIns.getData().loadingArr)
        this.ctx.clearRect(5, 45, 250, 50)
        let cost = 0
        this.ctx.fillStyle = 'rgb(8, 33, 116)'
        this.ctx.strokeStyle = 'rgba(255, 255, 0, 0.5)'
        const draw = setInterval(() => {
            if (cost >= endGuage) clearInterval(draw)
            this.ctx.fillRect(5, 45, cost, 50)
            cost += 1
        })
    }
}

export const calculateGauge = (arr) => {
    const getTodayIns = getToday()
    const day = getTodayIns()
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

export const getDrawChart = (function () {
    let instance
    const initInstance = new DrawChart()
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
