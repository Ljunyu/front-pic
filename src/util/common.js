const getElememtY = (elem) => {
    // 应该滚动的距离
    return window.pageYOffset + document.querySelector(elem).getBoundingClientRect().top
}
/*
滚动到指定的元素
elem :页面定位到的dom元素
duration：滚动动画执行时间
offset：偏移量
*/
const scrollToElem = (elem, duration, offset) => {
    const starty = window.pageYOffset // 滚动条位置
    const elementY = getElememtY(elem) // 滚动距离
    const diff = elementY - starty + offset // 最终形成的滚动
    if (!diff) return
    const easing = x => x < 0.5 ? 4 * x * x * x : (x - 1) * (2 * x - 2) * (2 * x - 2) + 1
    let start
    window.requestAnimationFrame(function step (timestamp) {
        if (!start) start = timestamp
        // 计算时间差值
        const time = timestamp - start
        let percent = Math.min(time / duration, 1)
        percent = easing(percent)
        window.scrollTo(0, starty + diff * percent)
        if (time < duration) {
            window.requestAnimationFrame(step)
        }
    })
}
export {
    scrollToElem
}
