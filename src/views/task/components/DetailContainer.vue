<script lang="ts" setup>
import TaskAside from './TaskAside.vue'

interface IProps {
  taskMenu: any[]
}

const props = defineProps<IProps>()

console.log(import.meta.glob('./*.vue'))

// 这是一个对象，key是路径，value是一个返回promise的工厂函数(实际是返回了一个import函数)
const importComps: { [key: string]: () => Promise<Component> } = import.meta.glob('./*.vue')

// 异步组件
const AsyncComp = (p: string) => defineAsyncComponent(importComps[p])

const convertKv = (data: any[]) => {
  const t: { [key: string]: [Component, any] } = {}

  data.forEach((x) => {
    if (x.comp) t[x.index] = [AsyncComp(x.comp), x.compAttr]

    if (x.children && x.children.length) Object.assign(t, convertKv(x.children))
  })

  return t
}

console.log('props.taskMenu: ', props.taskMenu)

const current = ref('Cxxx')

// taskMenu转键值对
const comps = convertKv(props.taskMenu)
const compsRef = ref()
const compsRefs: Ref[] = []

const keepAlive = true

console.log('comps: ', comps)

const updateCompsRefs = () => {
  if (keepAlive && compsRef.value && !compsRefs.includes(compsRef.value)) {
    compsRefs.push(compsRef.value)
  }
  return compsRefs
}

const onSelect = (index: string) => {
  updateCompsRefs()
  current.value = index
}

// 这样获取KeepAlive包裹的components会失效
const getComps = () => (keepAlive ? updateCompsRefs() : compsRef.value)

defineExpose({
  getComps
})
</script>

<template>
  <div class="detail-container">
    <el-container class="container-wrap">
      <el-header>
        <slot name="header"></slot>
      </el-header>
      <el-container class="container-content">
        <el-aside width="200px">
          <TaskAside :task-menu="taskMenu" @on-select="onSelect" />
        </el-aside>
        <el-main style="--el-main-padding: 0 20px 0 20px;">
          <KeepAlive v-if="keepAlive">
            <component :is="comps[current][0]" v-bind="comps[current][1]" ref="compsRef" />
          </KeepAlive>
          <component v-else :is="comps[current][0]" v-bind="comps[current][1]" ref="compsRef" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.detail-container {
  height: 100%;

  .container-wrap {
    height: 100%;
  }
}
</style>
