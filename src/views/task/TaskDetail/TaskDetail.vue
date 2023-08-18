<script lang="ts" setup>
import { cxrwDetail } from '@/api/ckrw'
import DetailContainer from '../components/DetailContainer.vue'
import { ElMessage } from 'element-plus'
import { cxxxFormConfig, inspectionTaskMenu } from './config'

const router = useRouter()
const route = useRoute()

const loading = ref(false)

const taskMenu = ref<any>([])

const init = async () => {
  try {
    loading.value = true
    const { id: cxrwId, type } = route.query as { id: string; type: 'inspection' | 'control' }

    const res = await cxrwDetail({ cxrwId })
    if (!res.success) throw res.message ?? '查询失败'

    const { cxrw } = res.data

    console.log('cxrw: ', cxrw)

    const rwzt = cxrw.rwzt

    // 菜单第一个的配置
    const formConfig = type === 'inspection' ? cxxxFormConfig : []

    // 回显
    formConfig.forEach((x) => {
      x.form.forEach((f) => {
        f.value = cxrw[f.prop]
      })
    })

    const editable = true

    const config = { cxrwId, formConfig, rwzt, editable }

    if (type === 'inspection') {
      taskMenu.value = inspectionTaskMenu(config)

      console.log('taskMenu: ', taskMenu.value);
      
    } else {
      console.log('控制任务')
    }
  } catch (error) {
    ElMessage.error(error as string)
  } finally {
    loading.value = false
  }
}

init()

const onTaskMenuChange = () => {}

const ControlBtns = {
  fh: {
    label: '返回',
    type: 'default',
    click: () => {
      ElMessage('返回')
      router.back()
    }
  },
  lqrw: {
    label: '领取任务',
    type: 'primary',
    click: () => {
      ElMessage('领取任务')
    }
  },
  fqlq: {
    label: '放弃领取',
    type: 'primary',
    click: () => {
      ElMessage('放弃领取')
    }
  },
  dc: {
    label: '导出',
    type: 'primary',
    click: () => {
      ElMessage('导出')
    }
  },
  tj: {
    label: '提交',
    type: 'primary',
    click: () => {
      ElMessage('提交')
    }
  }
}
// 根据任务的状态和权限将按钮放入
const taskBtns: any[] = [
  ControlBtns.lqrw,
  ControlBtns.fqlq,
  ControlBtns.tj,
  ControlBtns.dc,
  ControlBtns.fh
]
</script>

<template>
  <div class="task-detail">
    <!-- 这里网络请求结束再渲染，因为页面需要依赖请求的数据 -->
    <div class="task-loading" v-if="loading" v-loading="loading"></div>
    <DetailContainer v-else :task-menu="taskMenu">
      <template #header>
        <div class="detail-header">
          <div class="title">任务详情</div>
          <div class="btns">
            <el-button
              v-for="item in taskBtns"
              :key="item.label"
              :type="item.type"
              @click="item.click"
            >
              {{ item.label }}
            </el-button>
          </div>
        </div>
      </template>
    </DetailContainer>
  </div>
</template>

<style scoped lang="scss">
.task-detail {
  height: 100%;
  width: 100%;

  .task-loading {
    height: 100%;
    width: 100%;
  }

  .detail-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
      font-size: 18px;
      font-weight: 700;
    }
  }
}
</style>
