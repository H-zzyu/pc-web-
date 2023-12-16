import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [

    {
        path: "/",
        name: "登录",
        component: () => import('@/views/Login.vue')

    }, {
        path: "/home",
        name: "主页",
        redirect: '/home/page',

        component: () => import('@/views/Home.vue'),
        children: [{
            path: "/page",
            name: "页",
            component: () => import('@/views/PageHome.vue')
        }, {
            path: "/playlist",
            name: "歌单",
            redirect: '/musicname',
            component: () => import('@/views/PlayList.vue'),
            children: [{
                path: "/musicsearch",
                name: "搜素",

                component: () => import("@/views/MusicSearch.vue")
            }, {
                path: "/musicname",
                name: "歌曲信息",
                component: () => import("@/views/MusicName.vue")
            }]
        }, {
            path: "/picture",
            name: "图片信息",
            component: () => import('@/views/Picture.vue')
        },{
            path:"/barrage",
            name:"弹幕",
            component: () => import('@/views/Barrage.vue')
        }


        ]
    }, 

]
const router = createRouter({
    /**
     * hash模式：createWebHashHistory，
     * history模式：createWebHistory
     */
    
    history: createWebHashHistory(),
    routes
})
export default router