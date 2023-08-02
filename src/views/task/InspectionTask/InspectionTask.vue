<script setup lang="ts">
import { onMounted } from 'vue'
import { cxrwList } from '@/api/ckrw'
import { replaceAsterisk } from '@/utils/tools'

const router = useRouter()

const pageInfo = reactive({
  current: 1,
  size: 10,
  total: 0
})

const tableList = ref([])

onMounted(() => {
  getPageList()
})

function getPageList() {
  const params = {}
  cxrwList(params).then((res) => {
    if (res.success) {
      tableList.value = res.data.records ?? []
      console.log(res.data.records)
    }
  })
}

// 初始化查询列表
const onQuery = () => {
  getPageList()
}

const onDetail = (row: any) => {
  router.push({
    path: '/task/task-detail',
    query: {
      id: row.id,
      rwzt: row.rwzt,
      type: 'inspection'
    }
  })
}

const handleSizeChange = (size: number) => {
  pageInfo.size = size
  getPageList()
}

const handleCurrentChange = (current: number) => {
  pageInfo.current = current
  getPageList()
}
</script>

<template>
  <div class="orgManage">
    <div class="page-content">
      <div class="header">
        <div class="header-left">查询列表</div>
        <div class="header-right">
          <el-button size="default" color="#0052d9" @click="onQuery">查询</el-button>
        </div>
      </div>
      <el-table
        :data="tableList"
        style="height: calc(100% - 100px)"
        :header-cell-style="{ background: '#F5F6F8' }"
      >
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column prop="cxqqdh" label="查询任务单号" />
        <el-table-column prop="cqsc" label="超期时长" />
        <el-table-column prop="xm" label="权限人">
          <template v-slot="{ row }">
            {{ replaceAsterisk(row.xm) }}
          </template>
        </el-table-column>
        <el-table-column prop="zjh" label="证件号">
          <template v-slot="{ row }">
            {{ replaceAsterisk(row.zjh) }}
          </template>
        </el-table-column> 
        <el-table-column label="操作" width="200">
          <template v-slot="{ row }">
            <el-button link style="color: #0052d9" size="small" @click="onDetail(row)"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagenation">
        <el-pagination
          small
          v-model:current-page="pageInfo.current"
          v-model:page-size="pageInfo.size"
          :page-sizes="[10, 20, 50]"
          background
          layout="prev, pager, next, sizes, total"
          :total="pageInfo.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.orgManage {
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: #eff1f5;

  :deep(.el-dialog__body) {
    padding: 10px 25px 25px !important;
  }
}
.page-content {
  background-color: #fff;
  // margin-top: 15px;
  padding: 15px;
  padding-bottom: 0;
  flex: 1;
  border-radius: 4px;

  .header {
    height: 35px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-left {
      font-size: 18px;
      font-weight: 700;
      color: #333333;
    }
    .header-right {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }

  .el-table {
    margin-top: 15px;
  }

  .pagenation {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 50px;
  }
}
</style>
