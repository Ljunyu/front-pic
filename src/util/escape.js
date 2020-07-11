import faces from '../assets/js/face'
const escapeHtmle = (val = '') => {
    console.log(1)
    if (!val) return ''
    let result = val
    const face = /face\[\W{1,}]/g
    if (face.test(result)) {
        const group = result.match(face)
        console.log(1111, group)
        group.map((item) => {
            const key = item.match(/\[\S+\]/g)[0]
            result = result.replace(item, `<img src="${faces[key]}">`)
        })
    }
    const img = /img\[\S+\]/g
    if (img.test(result)) {
        const group = result.match(img)
        console.log(1111, group)
        group.map((item) => {
            result = result.replace(item, `<img src="${item.substr(4, item.length - 5)}" />`)
            console.log(11211, result)
        })
    }
    const link = /\sa\(\S+\]/g
    if (link.test(result)) {
        const group = result.match(link)
        const title = /\((.+)\]/
        const linkname = /\[(.+)\]/
        group.map((item) => {
            const namegroup = item.match(linkname)
            let name = ''
            if (namegroup.length > 0) {
                name = namegroup[1]
            }
            const linkgroup = item.match(title)
            let link = ''
            if (linkgroup.length > 0) {
                link = linkgroup[1]
            }
            result = result.replace(item, `<a href="${link}">${name}</a>`)
        })
    }
    result = result.replace(/\[quote\]/g, '<div class="layui-elem-quote">')
    result = result.replace(/\[\/quote\]/g, '</div>')
    return result
}
export { escapeHtmle }
