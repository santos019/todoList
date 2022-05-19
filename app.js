
// const canvas = document.getElementById('headCanvas')
// const ctx = canvas.getContext('2d')
// let worldPos = 1152
// const worldSpeed = -5
// const w = 1120
// function drawImg () {
//     worldPos = ((worldPos + worldSpeed) % w + w) % w
//     const imgBack = new Image()
//     imgBack.addEventListener('load', function () {
//         ctx.drawImage(imgBack, worldPos, 50)
//         ctx.drawImage(imgBack, worldPos - 1000, 50)
//     }, false)
//     imgBack.src = './Img/backImg.png'
// }
function drawTest () {
    const canvas = document.getElementById('headCanvas')
    const ctx = canvas.getContext('2d')
    let worldPos = 1900
    const worldSpeed = -5
    const w = 1120
    function drawImg () {
        worldPos = ((worldPos + worldSpeed) % w + w) % w
        const imgBack = new Image()
        imgBack.addEventListener('load', function () {
            ctx.drawImage(imgBack, worldPos, 50)
            ctx.drawImage(imgBack, worldPos - 1000, 50)
        }, false)
        imgBack.src = './Img/backImg.png'
    }
    return {
        drawImg: function () {
            return drawImg()
        }
    }
}
const test = drawTest()
setInterval(test.drawImg, 10)
