import { getMenuIcon } from '@/utils/tools'

export default {
  path: '/home',
  name: 'home',
  component: () => import('@/views/home/home.vue'),
  meta: {
    title: '首页',
    icon: getMenuIcon('home-icon.png'),
    permission: 'PHCICS:SY',
    menuVisible: true
  }
}