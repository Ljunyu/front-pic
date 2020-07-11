import { escapeHtmle } from './escape'
export default {
    richtext: {
        bind: function (el, binding, vnode) {
            el.innerHTML = escapeHtmle(binding.value)
        },
        componentUpdated: function (el, binding, vnode) {
            el.innerHTML = escapeHtmle(binding.value)
        }
    }
}
