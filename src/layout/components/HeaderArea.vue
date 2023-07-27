<script setup lang="ts">
import SearchMenu from './SearchMenu.vue'
import { routeList } from '@/router'
import { localCache } from '@/utils/cache'
import { CACHE_USER_INFO } from '@/global/constants'

const userInfo = ref(localCache.getItem(CACHE_USER_INFO))

import avatar from '@/assets/images/common/logo.svg'

const route = useRoute()
const router = useRouter()

const handleRouterPush = (item: any) => {
  router.push(item.path)
}

const handleExit = () => {
  localCache.clear()
  window.location.reload()

  // router.push('/login')
}
</script>

<template>
  <div class="header-area">
    <div class="nav-bar"></div>
    <SearchMenu />
    <div class="user-area">
      <el-avatar class="avatar" size="small" :src="avatar"></el-avatar>
      <!-- <div class="user-name">{{ '未知用户' }}</div>
      <div class="line">|</div> -->
      <el-dropdown>
        <div class="status">{{ userInfo.realName }}</div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExit"> 退出 </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="less">
.header-area {
  display: flex;
  justify-content: end;
  align-items: center;
  border-bottom: 1px solid #e9ebef;

  .nav-bar {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 16px;

    .nav-item {
      box-sizing: border-box;
    }
  }

  .user-area {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 10px;
    margin-right: 10px;
    width: 210px;
    color: #333;
    cursor: pointer;

    .avatar {
      margin-right: 10px;
    }

    .line {
      margin: 0 5px;
    }
    .status {
      padding: 0 5px;
    }
  }
}
</style>
