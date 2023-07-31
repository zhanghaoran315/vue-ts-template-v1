<script lang="ts" setup>
import { h, ref } from 'vue'
import { ElButton } from 'element-plus'

const counter = ref(0)

const RenderCounter = () => {
  return h('div', { class: 'counter' }, [
    h(ElButton, { type: 'primary', onClick: () => counter.value-- }, '-1'),
    h('span', `当前计数${counter.value}`),
    h(ElButton, { type: 'primary', onClick: () => counter.value++ }, '+1')
  ])
}
</script>

<template>
  <div class="system-log">
    <h2>渲染函数写的计数器</h2>
    <RenderCounter />
  </div>
</template>

<style scoped lang="scss">
.system-log {
  padding: 20px;
}
</style>
