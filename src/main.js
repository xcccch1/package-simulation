import Vue from 'vue'
import App from './App.vue'
import "@/css/reset.css"
import {Container,Main,Aside,Form,FormItem,Select,Option,Button,Input,Message} from 'element-ui'

Vue.config.productionTip = false
Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Option)
Vue.use(Select)
Vue.use(Button)
Vue.use(Input)
Vue.prototype.$message = Message





new Vue({
  render: h => h(App),
}).$mount('#app')
