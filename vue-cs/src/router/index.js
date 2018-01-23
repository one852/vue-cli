import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import News from '@/components/News'
import Images from '@/components/Images'
import Product from '@/components/Product'
import Product_z from '@/components/Product-z'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/News',
      name: 'News',
      component: News
    },{
      path: '/Images',
      name: 'Images',
      component: Images
    },{
      path: '/Product',
      name: 'Product',
      component: Product
    },{
      path: '/Product-z/:cs/:title',
      name: 'Product-z',
      component: Product_z
    }
  ]
})
