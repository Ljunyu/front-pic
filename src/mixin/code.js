import { getCode } from '../api/login'
import { v4 as uuidv4 } from 'uuid'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
  data () {
    return {
      code: '',
      svg: ''
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  mounted () {
    let sid = ''
    if (localStorage.getItem('sid') != null) {
      this.$store.state.uuid = localStorage.getItem('sid')
    } else {
      sid = uuidv4()
      localStorage.setItem('sid', sid)
      this.$store.state.uuid = sid
    }
    this._getCode()
  },
  methods: {
    _getCode () {
      console.log(this.$store.state.uuid)
      getCode(this.$store.state.uuid).then((res) => {
        if (res.code === 200) {
          this.svg = res.data
        }
      })
    }
  }
}
