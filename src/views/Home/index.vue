<script setup>
import HomeCategory from './components/HomeCategory.vue'
import HomeProduct from './components/HomeProduct.vue'
import HomeBanner from './components/HomeBanner.vue'
</script>

<template>
  <div class="container">
    <HomeCategory />
    <HomeBanner/>
  </div>
  <HomeProduct />
</template>