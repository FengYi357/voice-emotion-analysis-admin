<script setup lang="ts"></script>

<template>
  <n-modal-provider>
    <n-dialog-provider>
      <n-message-provider>
        <RouterView />
      </n-message-provider>
    </n-dialog-provider>
  </n-modal-provider>
</template>

<style lang="less" scoped></style>
