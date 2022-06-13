import { getNode } from './NodeStore'
export const HeaderPaintAdd = (state) => {
    const getNodeIns = getNode.getInstance()
    const insertText = document.createTextNode(state.nodeTitle)
    const lnsertDiv = document.createElement('div')
    insertText.id = 'insertText' + state.nodeId
    lnsertDiv.id = 'insertDiv' + state.nodeId
    lnsertDiv.className = 'insertDiv'
    lnsertDiv.appendChild(insertText)
    lnsertDiv.style.fontSize = `${Math.floor(Math.random() * (40 - 5) + 5)}` + 'px'
    lnsertDiv.style.width = 'auto'
    lnsertDiv.style.float = 'left'
    const r = Math.round(Math.random() * 153)
    const g = Math.round(Math.random() * 102)
    const b = Math.round(Math.random() * 102)
    lnsertDiv.style.color = 'rgb(' + r + ',' + g + ',' + b + ')'
    getNodeIns.getHeaderDiv().appendChild(lnsertDiv)
}
export const HeaderPaintRemove = (state) => {
    const deletNode = document.getElementById('insertDiv' + state.nodeId)
    deletNode.parentNode.removeChild(deletNode)
}
export const HeaderPaintAllRemove = (state) => {
    const getNodeIns = getNode.getInstance()
    getNodeIns.getHeaderDiv().textContent = ''
}
