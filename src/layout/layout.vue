<script setup lang="ts">
import AsideArea from './components/AsideArea.vue'
import HeaderArea from './components/HeaderArea.vue'
import TagMenu from './components/TagMenu.vue'
import MainArea from './components/MainArea.vue'
import { nextTick } from 'vue'
import { useRouterStore } from '@/stores/router'
import { routeList } from '@/router'

const route = useRoute()

const routerStore = useRouterStore()


// 每次刷新页面回到顶部
watch(
  () => route.path,
  () => {
    nextTick(() => {
      const scrollWrap = document.querySelector('#global-scroll-wrap')
      scrollWrap && scrollWrap.scroll({ top: 0 })
    })
  },
  {
    deep: true
  }
)
</script>

<template>
  <div class="layout">
    <AsideArea />
    <div class="container-wrap">
      <HeaderArea />
      <TagMenu />
      <MainArea id="global-scroll-wrap" />
    </div>
    <el-backtop
      :right="30"
      :bottom="30"
      target="#global-scroll-wrap"
      style="color: #0052d9"
    ></el-backtop>
  </div>
</template>

<style scoped lang="scss">
.layout {
  height: 100vh;
  display: flex;

  .aside-area {
    width: 250px;
  }

  .container-wrap {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .header-area {
      height: 60px;
    }

    .main-area {
      flex: 1;
      overflow-y: auto;
    }
  }
}
</style>
