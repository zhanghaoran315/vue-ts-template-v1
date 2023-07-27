import { getMenuIcon } from '@/utils/tools'

export default {
  path: '/log-manage',
  name: 'logManage',
  redirect: { name: 'systemLog' },
  meta: {
    title: '日志管理',
    icon: getMenuIcon('log-manage.png'),
    menuVisible: true
  },
  children: [
    {
      path: '/log-manage/system-log',
      name: 'systemLog',
      component: () => import('@/views/logManage/SystemLog/SystemLog.vue'),
      meta: {
        title: '系统日志',
        icon: getMenuIcon('system-log.png'),
        keepAlive: true,
        permission: 'PHCICS:XTRZ',
        menuVisible: true
      }
    },
    {
      path: '/log-manage/task-exception',
      name: 'taskException',
      component: () => import('@/views/logManage/TaskException/TaskException.vue'),
      meta: {
        title: '任务异常',
        icon: getMenuIcon('task-exception-log.png'),
        keepAlive: true,
        permission: 'PHCICS:RWYC',
        menuVisible: true
      }
    }
  ]
}
