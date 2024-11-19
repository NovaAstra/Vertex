<script setup lang="ts">
</script>

<template>
  <div>
    <img src="https://localhost:1231" alt="">
  </div>
</template>

<script lang="ts" setup>
async function asyncFunctionWithError() {
  throw new Error('Async function error'); // 触发 unhandledrejection 事件
}

asyncFunctionWithError()
</script>