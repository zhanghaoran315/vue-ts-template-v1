import { getMenuIcon } from '@/utils/tools'

export default {
  path: '/task',
  name: 'task',
  redirect: '/task/inspection-task',
  meta: {
    title: '查控任务',
    icon: getMenuIcon('court-icon.svg'),
    menuVisible: true
  },
  children: [
    {
      path: '/task/inspection-task',
      name: 'InspectionTask',
      component: () => import('@/views/task/InspectionTask/InspectionTask.vue'),
      meta: {
        title: '查询任务',
        icon: getMenuIcon('inspection-task.png'),
        keepAlive: true,
        permission: 'PHCICS:CXRW',
        menuVisible: true
      }
    },
    {
      path: '/task/control-task',
      name: 'ControlTask',
      component: () => import('@/views/task/ControlTask/ControlTask.vue'),
      meta: {
        title: '控制任务',
        icon: getMenuIcon('control-task.png'),
        keepAlive: true,
        permission: 'PHCICS:KZRW',
        menuVisible: true
      }
    },
    {
      path: '/task/task-detail',
      name: 'TaskDetail',
      component: () => import('@/views/task/TaskDetail/TaskDetail.vue'),
      meta: {
        title: '任务详情'
      }
    },
    {
      path: '/task/feedback-detail',
      name: 'feedback-detail',
      component: () => import('@/views/task/FeedbackDetail/FeedbackDetail.vue'),
      meta: {
        title: '查询反馈详情'
      }
    }
  ]
}
