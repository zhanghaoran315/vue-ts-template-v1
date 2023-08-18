<script lang="ts" setup>
import { ref } from 'vue'
const props = defineProps({
  tableData: {
    type: Array,
    default: () => []
  },
  tableCount: {
    type: Number,
    default: 0
  },
  query: {
    type: Object,
    default: () => ({ currentPage: 1, pageSize: 10 })
  },
  tableItems: {
    type: Array,
    default: () => []
  },
  showFooter: {
    type: Boolean,
    default: true
  },
  showSelectColumn: {
    type: Boolean,
    default: false
  },
  showIndexColumn: {
    type: Boolean,
    default: false
  },
  childrenProps: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:query'])

const handleSizeChange = (pageSize: number) => {
  emit('update:query', { ...props.query, pageSize })
}

const handleCurrentChange = (currentPage: number) => {
  emit('update:query', { ...props.query, currentPage })
}
</script>

<template>
  <div class="table">
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      v-bind="childrenProps"
      :header-cell-style="{ background: '#F5F6F8' }"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        width="60"
        align="center"
      />
      <el-table-column
        v-if="showIndexColumn"
        label="序号"
        type="index"
        width="60"
        align="center"
      />

      <!-- 自定义列 -->
      <template v-for="item in tableItems" :key="item.label">
        <el-table-column v-bind="item" align="center" show-overflow-tooltip>
          <template v-slot="{ row, column }">
            <slot
              :name="item.slotName"
              :row="row"
              :column="column"
              :prop="item.prop ?? ''"
            >
              {{ row[item.prop ?? ''] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          :current-page="query.currentPage"
          :page-size="query.pageSize"
          :page-sizes="[10, 20, 30]"
          small
          layout="total, sizes, prev, pager, next"
          :total="tableCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<style scoped lang="less">

.table {
  margin-top: 10px;
}
.footer {
  margin-top: 15px;
  .el-pagination {
    justify-content: flex-end;
  }
}
</style>