<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { RouteLocationNormalizedLoaded, RouteRecordName, LocationQuery } from 'vue-router'
import { routeList } from '@/router'
import { useRouterStore } from '@/stores/router'

interface ITag {
  title: string
  path: string
  name?: RouteRecordName | null
  query?: LocationQuery
}

const tags = ref<ITag[]>([])
const active = ref()

const route = useRoute()
const router = useRouter()
const routerStore = useRouterStore()

const getTag = (route: RouteLocationNormalizedLoaded) => ({
  title: route.meta.title as string,
  path: route.path,
  name: route.name,
  query: route.query
})

const updateTags = (p: string) => {
  active.value = p

  const i = tags.value.findIndex((x) => x.path === p)
  
  if (i !== -1) return

  if (route.meta.keepAlive && route.name) {
    // 保留状态
    routerStore.updateKeepAliveList(route.name as string)
  }
  

  tags.value.push(getTag(route))
}

watch(() => route.path, updateTags, { immediate: true })



const onCommand = (type: string) => {
  if (type === 'all') {
    // 关闭所有
    tags.value = []
    if (active.value === routerStore.getFirstRoutePath) return updateTags(active.value)
    else router.push('/')

  } else {
    tags.value = [getTag(route)]
  }
}

const onClose = (tag: ITag) => {
  // 涉及数组移除，一般都是findIndex+splice来实现
  const i = tags.value.findIndex((x) => x.path === tag.path)
  // 去除对应的tag
  tags.value.splice(i, 1)

  if (route.meta.keepAlive && route.name) {
    // 移除状态
    routerStore.updateKeepAliveList(route.name as string)
  }

  if (!tags.value.length) {
    // 为空
    const p = routerStore.getFirstRoutePath
    if (tag.path === p) {
      location.reload()
    } else {
      router.push(p)
    }

    return
  }

  // 关闭的是当前激活的
  if (tag.path === active.value) {
    const t = tags.value[i === 0 ? 0 : i - 1]
    router.push({ path: t.path, query: t.query })
  }
}

const onClick = (tag: ITag) => {
  active.value = tag.path

  router.push({ path: tag.path, query: tag.query })
}
</script>

<template>
  <div class="tag-menu">
    <div class="tag-menu-left">
      <el-tag
        v-for="tag in tags"
        :key="tag.path"
        :class="['tag-item', { 'tag-active': active === tag.path }]"
        closable
        @close="onClose(tag)"
        @click="onClick(tag)"
      >
        {{ tag.title }}
      </el-tag>
    </div>
    <div class="tag-menu-right">
      <el-dropdown @command="onCommand" v-if="tags.length > 1">
        <img src="@/assets/images/common/tag-tools.png" alt="标签" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="all">关闭所有标签</el-dropdown-item>
            <el-dropdown-item command="non-select">关闭非当前标签</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tag-menu {
  padding: 12px;
  display: flex;
  justify-content: space-between;

  .tag-menu-left {
    flex: 1;

    .tag-item {
      height: 36px;
      line-height: 100%;
      padding: 0 10px;
      background-color: #f4f7f9;
      border-radius: 4px;
      font-size: 14px;
      font-family: Noto Sans S Chinese-Regular, Noto Sans S Chinese;
      font-weight: 400;
      color: #666666;
      cursor: pointer;
      :deep(i) {
        color: #495060;
        font-size: 16px;
        font-weight: 900;
      }
    }

    .tag-item + .tag-item {
      /* 间隔加margin */
      margin-left: 15px;
    }

    .tag-item:not(.tag-active) {
      --el-tag-hover-color: #fff;
    }
    .tag-active {
      background-color: #1890ff;
      color: #fff;
      border: 1px solid #fff;
      :deep(i) {
        color: #fff;
      }
    }
  }

  .tag-menu-right {
    width: 30px;
  }
}
</style>
