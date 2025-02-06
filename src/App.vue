<script setup>
import { RouterLink, RouterView } from "vue-router";

import Header from "@/components/Header.vue";
</script>

<template>
  <div class="app-container">
    <Header />
    <div class="router-container"><RouterView /></div>
  </div>
</template>
<style scoped>
.app-container {
  background-color: #f0f0f0;
  min-height: 100vh;
}
.router-container {
  padding-top: 80px;
}
</style>
