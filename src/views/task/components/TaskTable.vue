<script lang="ts" setup>
import type { JglxIndex, JglxValue } from '../TaskDetail/config'
import HrTable from '@/components/HrTable/HrTable.vue'
import { djlxData } from './config'

interface IProps {
  rwId: string
  djlx: JglxIndex
  jglx: JglxValue
  columns: any[]
  rwzt: string
  editable: boolean
}

const props = defineProps<IProps>()

const linkInspectionFeedbackDetails = () => {}

const handleTemplateImport = () => {}

const handleDownloadTemplateExample = () => {}

const tableData = ref<any[]>([])

const init = () => {
  const { size, current, records } = djlxData

  records.forEach((x, i) => {
    x.xh = (current - 1) * size + i + 1
  })

  tableData.value = records
}

init()

const tableItems = [
  { prop: 'xh', label: '序号', attr: { width: 80 } },
  { prop: 'bdcdyh', label: '不动产单元号', attr: { width: 255 }, slotName: 'bdcdyh' }
]
</script>

<template>
  <div class="task-table">
    <div v-if="editable">
      <el-button type="primary" @click="() => linkInspectionFeedbackDetails()">新增</el-button>
      <el-button plain @click="handleTemplateImport">模板导入</el-button>
      <el-button plain @click="handleDownloadTemplateExample">模板示例</el-button>
    </div>
    <HrTable :tableItems="tableItems" :tableData="tableData">
      <template #bdcdyh="{ row }">
        <el-link type="primary" :underline="false">{{ row.bdcdyh }}</el-link>
      </template>
    </HrTable>
  </div>
</template>

<style scoped lang="scss"></style>
