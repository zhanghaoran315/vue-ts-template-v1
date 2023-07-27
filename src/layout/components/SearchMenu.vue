<script lang="ts" setup>
import { useRouterStore } from '@/stores/router'
import { useRouter } from 'vue-router'

const router = useRouter()

const state = ref('')

interface RestaurantItem {
  title: string
  path: string
}

const restaurants = ref<RestaurantItem[]>([])

const querySearch = (queryString: string, cb: any) => {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value
  cb(results)
}

const createFilter = (queryString: string) => {
  return (restaurant: RestaurantItem) => {
    return restaurant.title.toLowerCase().indexOf(queryString.toLowerCase()) === 0
  }
}
const loadAll = (data: any[]) => {
  const _filterRoutes = (data: any[]) => {
    const results: RestaurantItem[] = []

    data.forEach((x) => {
      results.push({ title: x.meta?.title ?? '', path: x.path })
      if (x.children && x.children.length) results.push(..._filterRoutes(x.children))
    })

    return results
  }

  return _filterRoutes(data)
}

const handleSelect = (item: Record<string, string>) => {
  router.push(item.path)
}

onMounted(() => {
  restaurants.value = loadAll(useRouterStore().getRoutes)
})
</script>

<template>
  <div class="search-menu">
    <el-autocomplete
      class="ipt"
      v-model="state"
      :fetch-suggestions="querySearch"
      clearable
      placeholder="搜索菜单"
      @select="handleSelect"
      value-key="title"
    >
      <template #prefix>
        <el-icon><Search /></el-icon>
      </template>
    </el-autocomplete>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-input) {
  width: 240px;
}
</style>
