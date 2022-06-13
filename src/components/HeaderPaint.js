import { getNode } from './NodeStore'
export const HeaderPaintAdd = (state) => {
    const colors = ['5f9ea0', '008080', '008b8b', '20b2aa', '00ffff', '40e0d0', '00ced1', '48d1cc', '66cdaa', '7fffd4', 'afeeee', 'b0e0e6', 'add8e6', 'b0c4de', '87cefa', '87ceeb', '00bfff', '1e90ff', '4682b4', '6495ed', '4169e1', '0000ff', '191970', '00008b', '0000080', '4b0082', '483d8b', '6a5acd', '7b68ee', '800080', '8b008b', '9400d3']
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
    // const r = Math.round(Math.random() * 153)
    // const g = Math.round(Math.random() * 102)
    // const b = Math.round(Math.random() * 102)
    // lnsertDiv.style.color = 'rgb(' + r + ',' + g + ',' + b + ')'
    lnsertDiv.style.color = '#' + `${colors[Math.floor(Math.random() * (colors.length - 1))]}`
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
