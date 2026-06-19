<script setup lang="ts">

</script>

<template>
  <div class="not-found-container">
    <img src="/logo.png" alt="404" class="not-found-img" />
    <p>抱歉，您访问的页面不存在。</p>
    <a href="/" class="home-link">返回首页</a>
  </div>
</template>

<style scoped>
.not-found-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  gap: 16px;
}

.not-found-img {
  width: 200px;
  height: auto;
}
</style>