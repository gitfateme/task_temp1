<script setup>
import { ref, onMounted } from "vue";
import axios from "../helpers/axios";
//mock data since api is working slow without offset and limit
const items = ref([
  {
    id: "665679",
    address_id: "218dac2d-221f-4f43-9aff-faf10948b642",
    region: {
      id: 1,
      name: "\u0644\u0648\u06cc\u0632\u0627\u0646  -  \u0634\u06cc\u0627\u0646",
      city_object: {
        city_id: 333,
        city_name: "\u062a\u0647\u0631\u0627\u0646",
      },
      state_object: {
        state_id: 8,
        state_name: "\u062a\u0647\u0631\u0627\u0646",
      },
    },
    address: "لورم ایپسوم متن ساختگی با تولید سادگی ",
    last_name: "\u0627\u06a9\u0627\u0646\u062a",
    first_name: "\u062a\u0633\u062a",
    gender: "",
    lat: 35.7335542582977,
    lng: 51.308727264404304,
    coordinate_mobile: "989356363050",
    coordinate_phone_number: "983213213211",
  },
  {
    id: "665678",
    address_id: "ff332b8b-7bd5-453d-992f-720c8d66998d",
    region: {
      id: 1,
      name: "\u0644\u0648\u06cc\u0632\u0627\u0646  -  \u0634\u06cc\u0627\u0646",
      city_object: {
        city_id: 333,
        city_name: "\u062a\u0647\u0631\u0627\u0646",
      },
      state_object: {
        state_id: 8,
        state_name: "\u062a\u0647\u0631\u0627\u0646",
      },
    },
    address: "لورم ایپسوم متن ساختگی با تولید سادگی ",
    last_name: "\u0627\u06a9\u0627\u0646\u062a",
    first_name: "\u062a\u0633\u062a",
    gender: "",
    lat: 35.72811963001227,
    lng: 51.362972259521484,
    coordinate_mobile: "989125450440",
    coordinate_phone_number: "981232132154",
  },
  {
    id: "665677",
    address_id: "a03c863f-06e0-4f07-8b01-b2810dd9df6d",
    region: {
      id: 1,
      name: "\u0644\u0648\u06cc\u0632\u0627\u0646  -  \u0634\u06cc\u0627\u0646",
      city_object: {
        city_id: 333,
        city_name: "\u062a\u0647\u0631\u0627\u0646",
      },
      state_object: {
        state_id: 8,
        state_name: "\u062a\u0647\u0631\u0627\u0646",
      },
    },
    address: "لورم ایپسوم متن ساختگی با تولید سادگی ",
    last_name: "\u0627\u06a9\u0627\u0646\u062a",
    first_name: "\u062a\u0633\u062a",
    gender: "",
    lat: 35.78314551429483,
    lng: 51.34357452392578,
    coordinate_mobile: "989356363050",
    coordinate_phone_number: "982312345678",
  },
  {
    id: "665676",
    address_id: "00af74fc-e980-4d1e-92c4-d1324fc436b2",
    region: {
      id: 1,
      name: "\u0644\u0648\u06cc\u0632\u0627\u0646  -  \u0634\u06cc\u0627\u0646",
      city_object: {
        city_id: 333,
        city_name: "\u062a\u0647\u0631\u0627\u0646",
      },
      state_object: {
        state_id: 8,
        state_name: "\u062a\u0647\u0631\u0627\u0646",
      },
    },
    address: "لورم ایپسوم متن ساختگی با تولید سادگی ",
    last_name: "\u0627\u06a9\u0627\u0646\u062a",
    first_name: "\u062a\u0633\u062a",
    gender: "",
    lat: 35.71885203682274,
    lng: 51.339883804321296,
    coordinate_mobile: "989323232020",
    coordinate_phone_number: "989323232020",
  },
  {
    id: "665675",
    address_id: "da83c803-0bd0-41bb-a4c8-dae1208fc955",
    region: {
      id: 1,
      name: "\u0644\u0648\u06cc\u0632\u0627\u0646  -  \u0634\u06cc\u0627\u0646",
      city_object: {
        city_id: 333,
        city_name: "\u062a\u0647\u0631\u0627\u0646",
      },
      state_object: {
        state_id: 8,
        state_name: "\u062a\u0647\u0631\u0627\u0646",
      },
    },
    address: " qwqwqewqwe qwqwqewqweqwqwqewqwe qwqwqewqwe qwqwqewqwe",
    last_name: "\u0627\u06a9\u0627\u0646\u062a",
    first_name: "\u062a\u0633\u062a",
    gender: "",
    lat: 35.7219,
    lng: 51.3347,
    coordinate_mobile: "989123232050",
    coordinate_phone_number: "989123232050",
  },
]);
const getAddresses = async () => {
  try {
    const res = await axios.get("", {
      // params: {
      //   offset: 0,
      //   limit: 1,
      // },
    });
    if (res && res.data) items.value = res.data;
  } catch (err) {
    console.log(err);
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
    </div>
  </div>
</template>

<style scoped lang="scss">
* {
  overflow-wrap: anywhere;
}
</style>
