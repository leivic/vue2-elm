import Vue from 'vue'                  //import/export是 es6的模块化解决方案 以前的前端是没有模块化的 简单的说，就是在一个js文件里面不能引入另一个js
import VueRouter from 'vue-router'     //es6之前的模块解决方案是 AMD.js和Commnd.js es6import/export完全可以将之取代 export是将本模块暴露（理解为一个文件）出去 供其他文件使用 模块就是一个包含js代码的文件
                                       //可以暴露的有最外层 var let const定义的变量 类 函数  export和import的变量名必须一致  
import routes from './router/router'   //export default import和/export的变量名可以不一样 export时也可以不写变量名  导入后就可以使用导入的变量/类/函数 
import store from './store/'
import {routerMode} from './config/env'
import './config/rem'

Vue.use(VueRouter)   //vue对象的.use方法 VueRouter是实参 
const router = new VueRouter({  
	routes,
	mode: routerMode,
	strict: process.env.NODE_ENV !== 'production',
	scrollBehavior (to, from, savedPosition) { 
	    if (savedPosition) {
		    return savedPosition
		} else {
			if (from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop;
			}
		    return { x: 0, y: to.meta.savedPosition || 0 }
		}
	}
})

new Vue({
	router,
	store,
}).$mount('#app')

