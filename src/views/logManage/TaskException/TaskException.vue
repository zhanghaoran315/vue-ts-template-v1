<script lang="tsx" setup>
import { h, ref } from 'vue'
import type { VNode } from 'vue';
import { ElButton } from 'element-plus'

const counter = ref(0)

const RenderCounter = (props: { aaa: string }): VNode => {
  return h('div', { class: 'counter' }, [
    h(ElButton, { type: 'primary', onClick: () => counter.value-- }, '-1'),
    h('span', `当前计数${counter.value}`),
    h(ElButton, { type: 'primary', onClick: () => counter.value++ }, '+1'),
    h('span', props.aaa)
  ])
}

const TsxCounter = (props?: { bbb: string }): VNode => {
  return (
    <div class="app">
      <ElButton onClick={() => counter.value--} type="primary">
        -1
      </ElButton>
      <span>当前计数：{counter.value}</span>
      <ElButton onClick={() => counter.value++} type="primary">
        +1
      </ElButton>
      <span>{ props?.bbb }</span>
    </div>
  )
}

const Render = (props: { vnode: VNode }) => props.vnode
</script>

<template>
  <div class="task-exception">
    <h2>渲染函数写的计数器</h2>
    <RenderCounter aaa="我是渲染函数的props" />
    <h2>tsx写的计数器</h2>
    <TsxCounter bbb="我是tsx的props"/>
    <h2>函数式组件</h2>
    <Render :vnode="TsxCounter()" />
  </div>
</template>

<style scoped lang="scss">
.task-exception {
  padding: 20px;
}
</style>
