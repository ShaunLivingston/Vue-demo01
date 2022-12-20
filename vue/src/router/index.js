import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";

Vue.use(VueRouter)

const routes = [
    // {
    //     path: '/',
    //     name: 'Manage',
    //     component: () => import('../views/Manage.vue'),
    //     redirect: "/home",
    //     children: [{
    //         path: 'user',
    //         name: '用户管理',
    //         component: () => import('../views/User.vue')
    //     },
    //         {
    //             path: 'home',
    //             name: '首页',
    //             component: () => import('../views/Home.vue')
    //         },
    //         {
    //             path: 'person',
    //             name: '个人信息',
    //             component: () => import('../views/Person.vue')
    //         },
    //         {
    //             path: 'role',
    //             name: '角色管理',
    //             component: () => import('../views/Role.vue')
    //         },
    //         {
    //             path: 'menu',
    //             name: '菜单管理',
    //             component: () => import('../views/Menu.vue')
    //         },
    //         {
    //             path: 'file',
    //             name: '文件管理',
    //             component: () => import('../views/Files')
    //         }]
    // },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register.vue')
    },
    {
        path: '/front',
        name: 'Front',
        component: () => import('../views/front/Front.vue'),
        children: [
            {
                path: 'home',
                name: 'FrontHome',
                component: () => import('../views/front/Home.vue')
            },
            {
                path: 'person',
                name: 'FrontPerson',
                component: () => import('../views/front/Person.vue')
            },
            {
                path: 'password',
                name: 'FrontPassword',
                component: () => import('../views/front/Pwd.vue')
            },
            {
                path: 'video',
                name: 'Video',
                component: () => import('../views/front/Video.vue')
            },
            {
                path: 'videoDetail',
                name: 'VideoDetail',
                component: () => import('../views/front/VideoDetail.vue')
            },
            {
                path: 'article',
                name: 'Article',
                component: () => import('../views/front/Article.vue')
            },
            {
                path: 'articleDetail',
                name: 'ArticleDetail',
                component: () => import('../views/front/ArticleDetail.vue')
            }
        ]
    },
    {
        path: '/404',
        name: 'NotFound',
        component: () => import('../views/404.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

//提供一个重置路由的方法
export const resetRouter = () => {
    router.matcher = new VueRouter({
            mode: 'history',
            base: process.env.BASE_URL,
            routes
        }
    )
}

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

//路由守卫
// router.beforeEach((to,from,next)=>{
//     localStorage.setItem("currentPathName",to.name) //设置当前的路由名称,为了在header组件中去使用
//     store.commit("setPath")     //触发store的数据更新
//     next        //放行路由
// })

//注：刷新页面会导致路由重置
export const setRoutes = () => {
    const storeMenus = localStorage.getItem('menus');
    if (storeMenus) {
        //获取当前的路由对象名称数组
        const currentRouteNames = router.getRoutes().map(v => v.name)
        if (!currentRouteNames.includes('Manage')) {
            //拼装动态路由
            const manageRoute = {
                path: '/',
                name: 'Manage',
                component: () => import('../views/Manage.vue'),
                redirect: "/home",
                children: [
                    {path: '/person', name: '个人信息', component: () => import('../views/Person.vue')},
                    {path: '/pwd', name: '修改密码', component: () => import('../views/Pwd.vue')}
                ]
            }
            const menus = JSON.parse(storeMenus)
            menus.forEach(item => {
                if (item.path) { //当且仅当path不为空的时候去设置路由
                    let itemMenu = {
                        path: item.path.replace("/", ""),
                        name: item.name,
                        component: () => import('../views/' + item.pagePath + '.vue'),
                    }
                    manageRoute.children.push(itemMenu)
                } else if (item.children.length) {
                    item.children.forEach(item => {
                        if (item.path) {
                            let itemMenu = {
                                path: item.path.replace("/", ""),
                                name: item.name,
                                component: () => import('../views/' + item.pagePath + '.vue'),
                            }
                            manageRoute.children.push(itemMenu)
                        }
                    })

                }
            })
            //动态添加到现在的路由对象中去
            router.addRoute(manageRoute)
        }
    }
}

//重置我就再set一次路由
setRoutes()

router.beforeEach((to, from, next) => {

    //未找到路由的情况
    if (!to.matched.length) {
        const storeMenus = localStorage.getItem("menus")
        if (storeMenus) {
            next("/404")
        } else {
            // 跳回登陆页面
            next("/login")
        }
    }
    //其它的情况都放行
    next()
})

export default router
