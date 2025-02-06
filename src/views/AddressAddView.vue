<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "../helpers/axios";

var map = null;
var marker = null;
const step = ref("form");
const form = ref({
  firstName: null,
  firstNameIsValid: true,
  lastName: null,
  lastNameIsValid: true,
  mobile: null,
  mobileIsValid: true,
  phone: null,
  phoneIsValid: true,
  address: null,
  addressIsValid: true,
  gender: "female",
  lat: 35.7219,
  lng: 51.3347,
});
const submit = async () => {
  if (step.value === "form") {
    if (
      form.value.firstNameIsValid &&
      form.value.lastNameIsValid &&
      form.value.mobileIsValid &&
      form.value.addressIsValid &&
      form.value.phoneIsValid
    ) {
      step.value = "map";

      setTimeout(() => {
        intializeMap();
      }, 0);
    }
  } else if (step.value === "map") {
    if (marker) {
      try {
        const res = await axios.post("", {
          first_name: form.value.firstName,
          last_name: form.value.lastName,
          coordinate_mobile: form.value.mobile,
          coordinate_phone_number: form.value.phone,
          address: form.value.address,
          region: 1,
          lat: form.value.lat,
          lng: form.value.lng,
          gender: form.value.gender,
        });
        if (res) step.value = "success";
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("لطفا موقعیت را انتخاب کنید");
    }
  }
};
const validateForm = () => {
  form.value.firstNameIsValid = true;
  form.value.lastNameIsValid = true;
  form.value.mobileIsValid = true;
  form.value.addressIsValid = true;
  const mobileRegex = /^09\d{9}$/;
  const phoneRegex = /^0\d{10}$/;
  if (form.value.firstName !== null && form.value.firstName.length < 3)
    form.value.firstNameIsValid = false;
  if (form.value.lastName !== null && form.value.lastName.length < 3)
    form.value.lastNameIsValid = false;
  form.value.mobileIsValid =
    form.value.mobile === null || mobileRegex.test(form.value.mobile);
  form.value.phoneIsValid =
    !form.value.phone || phoneRegex.test(form.value.phone);
  if (form.value.address !== null && form.value.address.length < 10)
    form.value.addressIsValid = false;
};

const onMapClick = (event) => {
  const { lat, lng } = event.latlng;
  form.value.lat = lat;
  form.value.lng = lng;
  if (marker) {
    map.removeLayer(marker);
  }
  marker = L.marker([lat, lng]).addTo(map);
};
const intializeMap = () => {
  map = L.map("map-canvas").setView([form.value.lat, form.value.lng], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  map.on("moveend", function (ev) {
    let center = map.getCenter();
    form.value.lat = center.lat;
    form.value.lng = center.lng;
  });
  map.on("click", onMapClick);
};
</script>

<template>
  <form @submit.prevent="submit()" @change="validateForm()">
    <div class="container">
      <div class="title mb-2" v-if="step === 'form'">ثبت آدرس</div>
      <div
        class="title mb-2 d-none d-sm-block"
        v-else-if="step === 'map'"
        style="cursor: pointer"
        @click="step = 'form'"
      >
        &#8594; انتخاب آدرس
      </div>
      <div v-if="step === 'success'" class="text-center">
        <div>
          <div class="checkmark-wrapper">
            <div class="checkmark"></div>
          </div>
          <p>اطلاعات شما با موفقیت ثبت شد.</p>
        </div>
        <RouterLink to="/list" class="btn btn-outline-primary"
          >مشاهده اطلاعات</RouterLink
        >
      </div>
      <div
        v-else
        class="bg-white rounded shadow-sm p-md-5"
        :class="step === 'form' ? 'p-3' : 'p-sm-3'"
      >
        <div class="row" v-if="step === 'form'">
          <div class="col-12 col-md-4 mb-4">
            <label class="form-label">نام</label>
            <input
              type="text"
              class="form-control"
              placeholder="مثال: فاطمه"
              required=""
              :class="form.firstNameIsValid ? '' : 'is-invalid'"
              v-model="form.firstName"
            />
            <div v-if="!form.firstNameIsValid" class="invalid-feedback">
              نام باید دارای 3 کاراکتر باشد
            </div>
          </div>
          <div class="col-12 col-md-4 mb-4">
            <label class="form-label">نام خانوادگی</label>
            <input
              type="text"
              class="form-control"
              placeholder="مثال: جلیلیان"
              required=""
              :class="form.lastNameIsValid ? '' : 'is-invalid'"
              v-model="form.lastName"
            />
            <div v-if="!form.lastNameIsValid" class="invalid-feedback">
              نام خانوادگی باید دارای 3 کاراکتر باشد
            </div>
          </div>
          <div class="col-12 col-md-4 mb-4">
            <label class="form-label">شماره تلفن همراه</label>
            <input
              type="text"
              class="form-control"
              placeholder="مثال: 09356363050"
              required=""
              :class="form.mobileIsValid ? '' : 'is-invalid'"
              v-model="form.mobile"
            />
            <div v-if="!form.mobileIsValid" class="invalid-feedback">
              شماره وارد شده صحیح نمی باشد
            </div>
          </div>
          <div class="col-12 col-md-4 mb-4">
            <div class="d-flex justify-content-between">
              <label class="form-label"
                >شماره تلفن ثابت
                <small class="text-muted">(اختیاری)</small></label
              >
              <small class="text-muted">*با پیش شماره</small>
            </div>

            <input
              type="text"
              class="form-control"
              placeholder="مثال: 02112345678"
              :class="form.phoneIsValid ? '' : 'is-invalid'"
              v-model="form.phone"
            />
            <div v-if="!form.phoneIsValid" class="invalid-feedback">
              شماره وارد شده صحیح نمی باشد
            </div>
          </div>
          <div class="col-12 col-md-8 mb-4">
            <label class="form-label">آدرس </label>
            <input
              type="text"
              class="form-control"
              required=""
              :class="form.addressIsValid ? '' : 'is-invalid'"
              v-model="form.address"
            />
            <div v-if="!form.addressIsValid" class="invalid-feedback">
              آدرس باید حداقل 10 کاراکتر باشد
            </div>
          </div>
          <div class="col-12 d-flex flex-wrap">
            <label class="form-label ms-5">جنسیت </label>
            <div class="d-flex flex-wrap">
              <div class="form-check ms-3">
                <input
                  class="form-check-input"
                  type="radio"
                  name="genderFemale"
                  id="genderFemale"
                  value="female"
                  v-model="form.gender"
                />
                <label class="form-check-label" for="genderFemale">
                  خانم
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="genderMale"
                  id="genderMale"
                  value="male"
                  v-model="form.gender"
                />
                <label class="form-check-label" for="genderMale"> آقا </label>
              </div>
            </div>
          </div>
        </div>
        <div class="row" v-show="step === 'map'">
          <div class="map-container p-0 p-sm-2" key="1">
            <div class="map-title py-2">
              <div class="d-block d-sm-none">
                <div
                  class="position-absolute"
                  style="right: 10px"
                  @click="step = 'form'"
                >
                  &#8594;
                </div>
                <div class="text-center">انتخاب موقعیت</div>
              </div>
            </div>
            <div class="map-marker">
              <!-- <img src="/assets/images/icons-map-marker.png" alt="" /> -->
            </div>
            <div id="map-canvas"></div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="step !== 'success'"
      class="btn-container d-flex align-items-center justify-content-center"
    >
      <button type="submit" class="btn btn-primary">ثبت و ادامه</button>
    </div>
  </form>
</template>
<style lang="scss" scoped>
.container {
  max-width: 960px;
  padding-bottom: 120px;
}
small {
  font-size: 13px;
}
.btn-container {
  background-color: #fff;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100px;
  z-index: 2 !important;

  button {
    padding: 6px 80px;
    max-width: 100%;
  }
}
.map-container {
  position: relative;
  .map-title {
    position: absolute;
    z-index: 2;
    left: 0;
    right: 0;
    top: 0;
    background-color: rgba(255, 255, 255, 0.8);
  }
  .map-marker {
    position: absolute;
    top: calc(50% - 48px);
    right: calc(50% - 24px);
    z-index: 400;
    pointer-events: none;
    img {
      height: 48px;
      width: 48px;
    }
  }
}
.checkmark-wrapper {
  margin: 30px auto 20px auto;
  border: 1px solid #000;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  position: relative;
}
.checkmark {
  position: absolute;
  left: 10px;
  top: 3px;
  display: inline-block;
  transform: rotate(45deg);
  height: 20px;
  width: 12px;
  border-bottom: 1px solid #000;
  border-right: 1px solid #000;
}
#map-canvas {
  height: 100vh;
  max-height: calc(100vh - 200px);
  z-index: 1 !important;
}
@media (min-width: 576px) {
  #map-canvas {
    max-height: 550px;
  }
}
</style>
