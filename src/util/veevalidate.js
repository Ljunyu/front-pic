import { extend, localize } from 'vee-validate'
import { email, required, min, max, length, confirmed } from 'vee-validate/dist/rules'
import zh from 'vee-validate/dist/locale/zh_CN.json'
extend('email', email)
extend('required', required)
extend('min', min)
extend('max', max)
extend('length', length)
extend('confirmed', confirmed)
localize('zh_CN', zh)
