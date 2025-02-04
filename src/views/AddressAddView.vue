<script setup>
import { ref } from "vue";
import L from "leaflet";
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
});
const nextStep = () => {
  console.log(step.value);
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
</script>

<template>
  <div class="container">
    <div class="title mb-4">ثبت آدرس</div>
    <div class="bg-white rounded shadow-sm p-3 p-md-5">
      <form class="row" v-if="step === 'form'" @change="validateForm()">
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
            required=""
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
              <label class="form-check-label" for="genderFemale"> خانم </label>
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
        <button class="btn btn-primary">asd</button>
      </form>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container {
  max-width: 960px;
}
small {
  font-size: 13px;
}
</style>
