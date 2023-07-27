<script setup lang="ts">
import { useRouterStore } from '@/stores/router'
</script>

<template>
  <div class="main-area">
    <RouterView v-slot="{ Component }">
      <transition name="fade">
        <KeepAlive :include="useRouterStore().getKeepAliveList">
          <component :is="Component"></component>
        </KeepAlive>
      </transition>
    </RouterView>
  </div>
</template>

<style scoped lang="less"></style>
