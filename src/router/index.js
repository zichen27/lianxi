import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const importLayout = name => require(`@/views/${name}/index.vue`).default


export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: '/tree',
            component: () => import('@/views/home/index.vue'),
            children: [
                {
                    path: 'tree',
                    name: 'tree',
                    component: () => import('@/views/tree/index.vue'),
                }
            ]
        }
    ]
})
