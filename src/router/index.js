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
            redirect: '/lazyload',
            component: () => import('@/views/home/index.vue'),
            children: [
                {
                    path: 'tree',
                    name: 'tree',
                    component: () => import('@/views/tree/index.vue'),
                },
                {
                    path: 'layout',
                    name: 'layout',
                    component: () => import('@/views/layout/index.vue'),
                },
                {
                    path: 'ces',
                    name: 'ces',
                    component: () => import('@/views/ces/index.vue'),
                },
                {
                    path: 'lazyload',
                    name: 'lazyload',
                    component: () => import('@/views/lazyload/index.vue'),
                },

            ]
        }
    ]
})
