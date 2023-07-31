<script lang="tsx" setup>
import { h, ref } from 'vue'
import { ElButton } from 'element-plus'

const counter = ref(0)

const TsxCounter = () => {
  return (
    <div class="app">
      <ElButton onClick={() => counter.value--} type='primary'>-1</ElButton>
      <span>当前计数：{counter.value}</span>
      <ElButton onClick={() => counter.value++} type='primary'>+1</ElButton>
    </div>
  )
}
</script>

<template>
  <div class="task-exception">
    <h2>tsx写的计数器</h2>
    <TsxCounter />
  </div>
</template>

<style scoped lang="scss">
.task-exception {
  padding: 20px;
}
</style>
