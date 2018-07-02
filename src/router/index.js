import Vue from 'vue'
import Router from 'vue-router'
import VueStripeCheckout from 'vue-stripe-checkout'
// import HelloWorld from '@/components/HelloWorld'

const routerOptions = [
  // { path: '/', component: 'Sponsor' },
  { path: '/about', component: 'About' },
  { path: '*', component: 'Sponsor' }
]
const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/components/${route.component}.vue`)
  }
})

Vue.use(Router)

export default new Router({
  routes,
  mode: 'history'
})

// base/global options
// these options can be overridden
// by the options in the .open(options)
// function.
const options = {
  key: 'pk_live_rNrIXxEyBd9tpTLxTw0P4iiA',
  image: 'https://tchen.webfactional.com/sponsor/static/img/VOSlogo-small.png',
  locale: 'auto',
  currency: 'PHP',
  billingAddress: false,
  zipCode: true,
  panelLabel: 'Sponsor {{amount}}'
}

Vue.use(VueStripeCheckout, options)
