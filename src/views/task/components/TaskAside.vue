<script lang="ts" setup>
interface IProps {
  taskMenu: any[]
}

const props = defineProps<IProps>()

const defaultActive = ref('Cxxx')

const defaultOpeneds = ref(['Cxfk'])

const emit = defineEmits(['onSelect'])

const onSelect = (index: string) => {
  emit('onSelect', index)
}
</script>

<template>
  <div class="task-aside">
    <el-menu
      :default-active="defaultActive"
      :default-openeds="defaultOpeneds"
      @select="onSelect"
      style="height: 100%"
    >
      <template v-for="item in taskMenu" :key="item.index">
        <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.index">
          <template #title>{{ item.title }}</template>
          <el-menu-item v-for="iten in item.children" :key="iten.index" :index="iten.index">
            <template #title>{{ iten.title }}</template>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="item.index">
          <template #title>{{ item.title }}</template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<style scoped lang="scss">
.task-aside {
  height: 100%;
}
</style>
