<script setup lang="ts">
</script>

<template>
  <div>
    <img src="https://localhost:1231" alt="">
  </div>
</template>

<script lang="ts" setup>
 function asyncFunctionWithError() {
  setTimeout(() => {
    throw new Error('Async function error'); // 触发 unhandledrejection 事件

  }, 5000);
}

asyncFunctionWithError()
</script>