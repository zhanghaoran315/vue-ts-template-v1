<script lang="ts" setup>
import { useSystemStore } from '@/stores/system';
const systemStore = useSystemStore();

const { dic } = storeToRefs(systemStore);

const props = defineProps({
  // 接收父级参数
  modelValue: String,
  placeholder: {
    type: String,
    default: '请选择'
  },
  clearable: Boolean,
  disabled: Boolean,
  label: String
});

const emit = defineEmits(['update:modelValue']);

const options = computed(
  () =>
    dic.value.find((item: any) => item.label === props.label)?.childrens || []
);

const value = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue)
});
</script>

<template>
  <el-select
    v-model="value"
    :disabled="disabled"
    :clearable="clearable"
    :placeholder="placeholder"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>

<style scoped lang="less">
.el-select {
  width: 100%;
}
</style>
