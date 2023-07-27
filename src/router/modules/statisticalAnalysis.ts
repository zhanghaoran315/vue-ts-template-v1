import { getMenuIcon } from '@/utils/tools'

export default {
  path: '/statistical-analysis',
  name: 'statisticalAnalysis',
  redirect: { name: 'taskStatistical' },
  meta: {
    title: '统计分析',
    icon: getMenuIcon('statistic-analysis.svg'),
    menuVisible: true
  },
  children: [
    {
      path: '/statistic-analysis/task-statistics',
      name: 'taskStatistical',
      component: () => import('@/views/statisticalAnalysis/TaskStatistical/TaskStatistical.vue'),
      meta: {
        title: '任务统计',
        icon: getMenuIcon('task-statistics.png'),
        keepAlive: true,
        permission: 'PHCICS:TJFX',
        menuVisible: true
      }
    }
  ]
}