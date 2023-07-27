<script setup lang="ts">
// import { routeList } from '@/router'
const route = useRoute()
const router = useRouter()
import { useRouterStore } from '@/stores/router'

const routerStore = useRouterStore()

// const subList = ref(routeList)
const subList = routerStore.getRoutes


const handleSelect = (path: any) => {
  router.push(path)
}

</script>

<template>
  <div class="aside-area" v-if="subList.length">
    <div class="logo">
      <img class="logo-img" src="@/assets/images/common/logo.svg" alt="" />
      <div class="logo-name">基础开发模板v1</div>
    </div>
    <el-menu
      style="border-right: none"
      :default-active="route.path"
      @select="handleSelect"
    >
      <template v-for="item in subList" :key="item.path">
        <template v-if="item?.children?.length">
          <el-sub-menu :index="item.path">
            <template #title>
              <img :src="item.meta.icon" alt="" />
              <span>{{ item.meta.title }}</span>
            </template>
            <el-menu-item v-for="iten in item.children" :index="iten.path" :key="iten.path">
              <img :src="iten.meta.icon" alt="" />
              <span>{{ iten.meta.title }}</span>
            </el-menu-item>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.path" class="first-menu-item">
            <template #title>
              <img :src="item.meta.icon" alt="" />
              <span>{{ item.meta.title }}</span>
            </template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<style scoped lang="scss">
.aside-area {
  background-color: #171717;
  $borderLeftColor: #0052d9;


  .logo {
    padding: 12px 0;
    padding-left: 20px;
    display: flex;
    align-items: center;

    .logo-img {
      width: 40px;
      height: 40px;
    }

    .logo-name {
      flex: 1;

      padding-left: 20px;
      font-size: 20px;
      font-weight: 700;
      color: #fff;
    }
  }

  .el-menu {
    --el-menu-item-height: 55px;
    --el-menu-sub-item-height: 55px;
    --el-menu-text-color: #fff;
    --el-menu-hover-text-color: #fff;
    --el-menu-bg-color: #171717;
    --el-menu-hover-bg-color: rgb(18, 18, 18);
    --el-menu-item-hover: #3c3c3c;

    .el-sub-menu {
      :deep(.el-sub-menu__title) {
        border-left: 4px solid transparent;
      }

      &.is-active {
        :deep(.el-sub-menu__title) {
          border-left: 4px solid $borderLeftColor;
          /* border-left: 4px solid #0052d9; */
          // color: #0052d9;
          // background-color: rgba(#0052d9, 0.1);
          background-color: #171717;
        }
      }
    }

    .first-menu-item {
      border-left: 4px solid transparent;
      &.is-active {
        border-left: 4px solid $borderLeftColor;
        // color: #0052d9;
        // background-color: rgba(#0052d9, 0.1);
        background-color: #171717;
      }
    }

    img {
      width: 18px;
      height: 18px;
    }

    span {
      margin-left: 10px;
      color: #fff;
    }
  }
}
</style>
