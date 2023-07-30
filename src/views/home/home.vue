<script lang="ts" setup>
import ModuleA from './components/ModuleA.vue'
import ModuleB from './components/ModuleB.vue'
import ModuleC from './components/ModuleC.vue'
import ModuleD from './components/ModuleD.vue'
import ModuleE from './components/ModuleE.vue'
import { vTitle } from '@/global'
</script>

<template>
  <div class="home">
    <el-row :gutter="15">
      <el-col :span="8">
        <div class="left-area">
          <div class="left-top" v-title="'查控任务量统计'">
            <ModuleA class="ps-box-border" />
          </div>
          <div class="left-bottom" v-title="'查控任务占比'">
            <ModuleD class="ps-box-border" />
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="center" v-title="'市县接入情况'">
          <ModuleB class="ps-box-border" />
        </div>
      </el-col>
      <el-col :span="8">
        <div class="right-area">
          <div class="right-top" v-title="'办结量统计'">
            <ModuleC class="ps-box-border" />
          </div>
          <div class="right-bottom" v-title="'超期量统计'">
            <ModuleE class="ps-box-border" />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.home {
  height: 100%;
  min-height: 600px;
  padding: 20px;

  .el-row {
    height: 100%;

    .left-top,
    .left-bottom,
    .center,
    .right-top,
    .right-bottom {
      > div {
        height: 100%;
      }
    }

    .left-area {
      height: 100%;

      .left-top {
        height: 60%;
      }

      .left-bottom {
        height: 40%;
      }
    }

    .center {
      height: 100%;
    }

    .right-area {
      height: 100%;

      .right-top {
        height: 40%;
      }

      .right-bottom {
        height: 60%;
      }
    }
  }
}
</style>
