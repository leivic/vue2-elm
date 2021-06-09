import Vue from 'vue'                  //import/export是 es6的模块化解决方案 以前的前端是没有模块化的 简单的说，就是在一个js文件里面不能引入另一个js 所以我们也只有全局作用域和函数作用域
import VueRouter from 'vue-router'     //es6之前的模块解决方案是 AMD.js和Commnd.js es6import/export完全可以将之取代 export是将本模块暴露（理解为一个文件）出去 供其他文件使用 模块就是一个包含js代码的文件
                                       //可以暴露的有最外层 var let const定义的变量 类 函数  export和import的变量名必须一致  
import routes from './router/router'   //export default import和/export的变量名可以不一样 export时也可以不写变量名  导入后就可以使用导入的变量/类/函数 
import store from './store/'
import {routerMode} from './config/env'
import './config/rem'

Vue.use(VueRouter)   //vue对象的.use方法 VueRouter是实参 
const router = new VueRouter({  //新建一个常量对象  js里的对象不是基于java一样的类来的 而是基于对象函数和原型链的 这样写 router就可以继承vuerouter函数的所有属性方法 键值对是在给实例间创建的动态的属性和方法赋值
	routes,                      //router构造函数执行时 将函数的this指向新生成的router 所以原函数内的属性方法都指向了router 
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

new Vue({ //生成一个匿名vue对象 同时执行对象的.mount方法 挂载在id ＃app上  .mount方法在vue构造函数里封装了 vue构造函数是上面的import引入的 
	router,
	store,
}).$mount('#app')

