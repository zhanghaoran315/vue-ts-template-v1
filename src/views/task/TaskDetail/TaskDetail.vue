<script lang="ts" setup>
import { cxrwDetail } from '@/api/ckrw'

const route = useRoute()

const { id: cxrwId, type } = route.query

cxrwDetail({ cxrwId }).then((res) => {
  if (res.success) {
    console.log(res)

    const { cxrw } = res.data

    const rwzt = cxrw.rwzt
  }
})
</script>

<template>
  <div class="task-detail">
    <h2>task-detail</h2>
  </div>
</template>

<style scoped lang="scss"></style>
