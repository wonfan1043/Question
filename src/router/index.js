import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Intro',
      component: () => import('../views/Intro.vue')
    },
    {
      path: '/userHome',
      name: 'UserHome',
      component: () => import('../views/UserHome.vue')
    },
    {
      path: '/adminHome',
      name: 'AdminHome',
      component: () => import('../views/AdminHome.vue')
    },
    {
      path: '/answer',
      name: 'Answer',
      component: () => import('../views/Answer.vue')
    },
    {
      path: '/answerCheck',
      name: 'AnswerCheck',
      component: () => import('../views/AnswerCheck.vue')
    },
    {
      path: '/create',
      name: 'Create',
      component: () => import('../views/Create.vue')
    },
    {
      path: '/createCheck',
      name: 'CreateCheck',
      component: () => import('../views/CreateCheck.vue')
    },
    {
      path: '/allRes',
      name: 'AllRes',
      component: () => import('../views/AllRes.vue')
    },
    {
      path: '/userResult',
      name: 'UserResult',
      component: () => import('../views/UserResult.vue')
    },
    {
      path: '/adminResult',
      name: 'AdminResult',
      component: () => import('../views/AdminResult.vue')
    },
    {
      path: '/checkRes',
      name: 'CheckRes',
      component: () => import('../views/CheckRes.vue')
    }
  ]
})

export default router
