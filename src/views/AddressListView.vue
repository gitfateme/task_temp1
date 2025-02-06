<script setup>
import { ref, onMounted } from "vue";
import axios from "../helpers/axios";
const items = ref([]);
const loading = ref(false);
const getAddresses = async () => {
  try {
    loading.value = true;
    const res = await axios.get("", {
      // params: {
      //   offset: 0,
      //   limit: 1,
      // },
    });
    if (res && res.data) items.value = res.data;
    loading.value = false;
  } catch (err) {
    console.log(err);
    loading.value = false;
  }
};
onMounted(() => {
  getAddresses();
});
</script>

<template>
  <div class="container mt-4">
    <div>
      <div class="title mb-3">آدرس ها و مشخصات</div>
      <div v-if="loading" class="text-center bg-white rounded shadow py-5">در حال دریافت اطلاعات...</div>
      <template v-else>
        <div
          class="bg-white rounded shadow-sm mb-3"
          v-for="(item, index) in items"
          :key="index"
        >
          <div class="d-none d-sm-flex row p-4 pb-2">
            <div class="col-4 mb-3">
              <div class="text-muted mb-1">نام</div>
              <div>
                {{ item.first_name }}
              </div>
            </div>
            <div class="col-4 mb-3">
              <div class="text-muted mb-1">نام خانوادگی</div>
              <div>
                {{ item.last_name }}
              </div>
            </div>
            <div class="col-4 mb-3">
              <div class="text-muted mb-1">شماره تلفن همراه</div>
              <div>0{{ item.coordinate_mobile.slice(2, 12) }}</div>
            </div>
            <div class="col-4 mb-3">
              <div class="text-muted mb-1">شماره تلفن ثابت</div>
              <div>
                {{ item.coordinate_phone_number ? 0 : "" }}0{{
                  item.coordinate_phone_number.slice(2, 12)
                }}
              </div>
            </div>
            <div class="col-4 mb-3">
              <div class="text-muted mb-1">جنسیت</div>
              <div>{{ item.gender === "female" ? "خانم" : "آقا" }}</div>
            </div>
            <div class="col-4 mb-3">
              <div class="text-muted mb-1">آدرس</div>
              <div>{{ item.address }}</div>
            </div>
          </div>
          <div class="d-block d-sm-none p-3">
            <div class="d-flex justify-content-between mb-2">
              <div class="text-muted mb-1">نام</div>
              <div>
                {{ item.first_name }}
              </div>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <div class="text-muted mb-1">نام خانوادگی</div>
              <div>
                {{ item.last_name }}
              </div>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <div class="text-muted mb-1">شماره تلفن همراه</div>
              <div>0{{ item.coordinate_mobile.slice(2, 12) }}</div>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <div class="text-muted mb-1">شماره تلفن ثابت</div>
              <div>
                {{ item.coordinate_phone_number ? 0 : "" }}0{{
                  item.coordinate_phone_number.slice(2, 12)
                }}
              </div>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <div class="text-muted mb-1">جنسیت</div>
              <div>{{ item.gender === "female" ? "خانم" : "آقا" }}</div>
            </div>
            <hr />
            <div class="mb-2">
              <div class="text-muted mb-1">آدرس</div>
              <div>{{ item.address }}</div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  max-width: 960px;
  padding-bottom: 120px;
}
* {
  overflow-wrap: anywhere;
}
</style>
