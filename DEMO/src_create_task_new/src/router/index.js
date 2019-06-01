import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 大背景页
const Main = (resolve) => {
    import ('@/main/main.vue').then((module) => {
        resolve(module)
    })
}

// 主题列表
const index = (resolve) => {
    import ('views/home/index.vue').then((module) => {
        resolve(module)
    })
}

// 创建任务
const create_subject = (resolve) => {
    import ('views/home/create_subject.vue').then((module) => {
        resolve(module)
    })
}

// 门店列表
const shop_task_list = (resolve) => {
    import ('views/home/shop_task_list.vue').then((module) => {
        resolve(module)
    })
}

// 任务列表
const task_list = (resolve) => {
    import ('views/home/task_list.vue').then((module) => {
        resolve(module)
    })
}

// 任务详情
const task_detail = (resolve) => {
    import ('views/home/task_detail.vue').then((module) => {
        resolve(module)
    })
}

// 相关会员列表
const member_relative_list = (resolve) => {
    import ('views/home/member_relative_list.vue').then((module) => {
        resolve(module)
    })
}

// 会员列表
const member_result_list = (resolve) => {
    import ('views/home/member_result_list.vue').then((module) => {
        resolve(module)
    })
}

// 创建任务
const create_task = (resolve) => {
    import ('views/home/create_task.vue').then((module) => {
        resolve(module)
    })
}

// 选择主题
const select_subject = (resolve) => {
    import ('views/home/select_subject.vue').then((module) => {
        resolve(module)
    })
}

// 筛选会员条件
const condition_filter = (resolve) => {
    import ('views/home/condition_filter.vue').then((module) => {
        resolve(module)
    })
}

// 编辑主题
const edit_subject = (resolve) => {
    import ('views/home/edit_subject.vue').then((module) => {
        resolve(module)
    })
}

export default new Router({
    routes: [{
            path: '/',
            component: Main,
            children: [
                {
                    path: '/',
                    name: '主题列表',
                    meta: {
                        title: "任务列表"
                    },
                    component: index
                },
                {
                    path: '/create_subject',
                    name: '新建主题',
                    meta: {
                        title: "新建任务"
                    },
                    component: create_subject
                },
                {
                    path: '/shop_task_list',
                    name: '门店列表',
                    meta: {
                        title: "门店任务"
                    },
                    component: shop_task_list
                },
                {
                    path: '/task_list',
                    name: '任务列表',
                    meta: {
                        title: "导购任务"
                    },
                    component: task_list
                },
                {
                    path: '/task_detail',
                    name: '任务详情',
                    meta: {
                        title: "任务详情"
                    },
                    component: task_detail
                },
                {
                    path: '/member_relative_list',
                    name: '相关会员列表',
                    meta: {
                        title: "相关会员列表"
                    },
                    component: member_relative_list
                },
                {
                    path: '/member_result_list',
                    name: '会员列表',
                    meta: {
                        title: "会员列表"
                    },
                    component: member_result_list
                },
                {
                    path: '/select_subject',
                    name: '选择主题',
                    meta: {
                        title: "选择主题"
                    },
                    component: select_subject
                },
                {
                    path: '/create_task',
                    name: '创建任务',
                    meta: {
                        title: "创建任务"
                    },
                    component: create_task
                },
                {
                    path: '/condition_filter',
                    name: '筛选会员条件',
                    meta: {
                        title: "筛选会员条件"
                    },
                    component: condition_filter
                },
                ,
                {
                    path: '/edit_subject',
                    name: '编辑主题',
                    meta: {
                        title: "编辑主题"
                    },
                    component: edit_subject
                }
            ]
        },
        {
            path: '/',
            redirect: '/publicContent',
        }
    ]
})