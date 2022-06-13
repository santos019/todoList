class GetNode {
    constructor () {
        this.addListBtn = document.getElementById('addBtnId')
        this.addTitle = document.getElementById('addTitleId')
        this.totalList = document.getElementById('myListId')
        this.allClickBtn = document.getElementById('allCheckInputId')
        this.clearBtn = document.getElementById('checkedClearId')
        this.clearAllBtn = document.getElementById('AllClearId')
        this.seeAllBtn = document.getElementById('seeAllListInputId')
        this.selectDate = document.getElementById('seeSelectDataInputId')
        this.headerDiv = document.getElementById('headCanvasId')
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

    getHeaderDiv () {
        return this.headerDiv
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
