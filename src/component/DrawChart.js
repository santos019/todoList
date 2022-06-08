import { getGlobalStore } from '../constructor/GlobalStore'
import { getToday } from '../library/lib'
// 클래스로 바꾸기
// 폴더분리 - 생성자 따로, 공용 라이브러리, 나머지
// 리드미
function DrawChart () {
    const canvas = document.getElementById('todayChartId')
    const ctx = canvas.getContext('2d')
    ctx.strokeRect(5, 20, 251, 100)
    this.setState = () => {
        const getGlobalIns = getGlobalStore.getInstance()
        const endGuage = calculateGauge(getGlobalIns.getData().loadingArr)
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
