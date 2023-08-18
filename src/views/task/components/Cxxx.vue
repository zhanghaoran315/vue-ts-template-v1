<script lang="ts" setup>
import HrForm from '@/components/HrFrom/HrForm.vue'
interface IProps {
  formConfig: Array<{
    title: string
    form: any[]
  }>
  cols: number
  cxrwId: string
  editable: false,
  attr?: any
}

const props = withDefaults(defineProps<IProps>(), {
  attr: {
    labelPosition: 'top',
    labelWidth: '100px'
  }
})

const HrFormRefs = ref<InstanceType<typeof HrForm>[]>()

const submit = () => {}

defineExpose({
  submit
})
</script>

<template>
  <div class="cxxx">
    <el-button plain>下载信息</el-button>
    <div class="task-form-box" v-for="(item, index) in formConfig" :key="index">
      <p class="title">{{ item.title }}</p>
      <HrForm :form="item.form" :cols="cols" :attr="attr" ref="HrFormRefs" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.cxxx {
  .title {
    font-size: 16px;
    font-weight: 700;
    margin: 10px 0;
  }
}
</style>
