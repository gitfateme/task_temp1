<template>
  <header>
    <div
      class="h-100 container d-flex align-items-center justify-content-between"
    >
      <div>
        <img
          src="https://achareh.co/_nuxt/img/achareh-type-logo-v2.c68d84f.png"
          alt="آچاره"
          width="76"
          height="38"
          data-v-1922683c=""
        />
      </div>
      <nav>
        <ul class="d-flex">
          <li class="ms-3">
            <RouterLink to="/">ثبت آدرس</RouterLink>
          </li>
          <li>
            <RouterLink to="/list">مشاهده آدرس ها</RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
</script>

<style lang="scss" scoped>
header {
  background-color: #fff;
  height: 80px;
  position: fixed;
  width: 100%;
  z-index: 2;
}
nav {
  ul {
    list-style: none;
    margin-bottom: 0;
  }
  a {
    color: #000;
    text-decoration: none;
  }
}
</style>
