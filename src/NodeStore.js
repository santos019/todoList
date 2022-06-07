class GetNode { // 제목을 보고 알 수 있을 정도로 달기 주석을 하지 말고 s를 붙이고
    constructor () {
        this.addListBtn = document.getElementById('addBtnId')
        this.addTitle = document.getElementById('addTitleId')
        this.totalList = document.getElementById('myListId')
        this.allClickBtn = document.getElementById('allCheckInputId')
        this.clearBtn = document.getElementById('checkedClearId')
        this.clearAllBtn = document.getElementById('AllClearId')
        this.seeAllBtn = document.getElementById('seeAllListInputId')
        this.selectDate = document.getElementById('seeSelectDataInputId')
    }

    getAddListBtn () {
        return this.addListBtn
    }

    getAddTitle () {
        return this.addTitle
    }

    getTotalList () {
        return this.totalList
    }

    getAllClickBtn () {
        return this.allClickBtn
    }

    getClearBtn () {
        return this.clearBtn
    }

    getClearAllBtn () {
        return this.clearAllBtn
    }

    getSeeAllBtn () {
        return this.seeAllBtn
    }

    getSelectDate () {
        return this.selectDate
    }
}

export const getNode = (function () {
    let instance
    const initInstance = new GetNode()
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
