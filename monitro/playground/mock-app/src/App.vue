<script setup lang="ts">
</script>

<template>
  <div>

  </div>
</template>

<script lang="ts" setup>
function  test(params:type) {
   try{
    setTimeout(() => {
        throw new Error("12312312");
        
    }, 5000);
   }catch(e){}
}

test()
</script>