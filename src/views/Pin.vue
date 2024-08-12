<template>
  <div class="container-fluid">
    <!-- Header Row -->
    <div class="row mt-3 align-items-center">
      <div class="col-2">
        <i class="bi bi-arrow-left fs-3 text-dark fw-bold" @click="goBack"></i>
      </div>
      <div class="col-8 text-center">
        <h6 class="fw-bold">PIN</h6>
      </div>
      <div class="col-2"></div>
    </div>

    <!-- Title Row -->
    <div class="row my-4">
      <div class="col-12 text-center">
        <h3>Masukkan PIN</h3>
      </div>
    </div>

    <!-- PIN Input Row -->
    <div class="row justify-content-center my-3">
      <div class="col-6 text-center">
        <input
          type="password"
          v-model="pin"
          class="custom-pin-input"
          maxlength="6"
          @input="handlePinInput"
        />
      </div>
    </div>

    <!-- Keyboard Row -->
     <div class="row justify-content-center my-3">
      <div class="col-10">
        <div class="row mb-2">
          <div class="col-4" v-for="number in numbers.slice(0, 3)" :key="number">
            <button class="btn btn-outline-secondary btn-lg btn-block" @click="appendNumber(number)">
              {{ number }}
            </button>
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-4" v-for="number in numbers.slice(3, 6)" :key="number">
            <button class="btn btn-outline-secondary btn-lg btn-block" @click="appendNumber(number)">
              {{ number }}
            </button>
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-4" v-for="number in numbers.slice(6, 9)" :key="number">
            <button class="btn btn-outline-secondary btn-lg btn-block" @click="appendNumber(number)">
              {{ number }}
            </button>
          </div>
        </div>
        <div class="row mb-2">
          <div class="col-4">
            <button class="btn btn-outline-secondary btn-lg btn-block" @click="deleteLastDigit">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
          <div class="col-4">
            <button class="btn btn-outline-secondary btn-lg btn-block" @click="appendNumber('0')">
              0
            </button>
          </div>
          <div class="col-4">
            <button class="btn btn-outline-secondary btn-lg btn-block" @click="submitPin">
              <i class="bi bi-check-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      pin: '',
      numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    };
  },
  methods: {
    async cekPin() {
      try {
        const formData = new FormData();
        formData.append("buyer_sku_code", "pln");
        formData.append("customer_no", "530000000001");
        formData.append("ref_id", "some1d");
        const response = await axios.post(
          "http://127.0.0.1:8000/api/auth/test",
          formData,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        this.dataTagihan = response.data.data;
      } catch (error) {
        console.error(error); // Handle error if any
      }
    },
    goBack() {
      // Adjust according to your routing setup
      window.history.back();
    },
    appendNumber(number) {
      if (this.pin.length < 6) {
        this.pin += number;
      }
    },
    deleteLastDigit() {
      this.pin = this.pin.slice(0, -1);
    },
    handlePinInput(event) {
      this.pin = event.target.value.replace(/\D/g, '').slice(0, 6);
    },
    submitPin() {
      // Handle pin submission
      console.log('Submitted PIN:', this.pin);
    }
  },
  created(){
    this.cekPin();
  }
};
</script>

<style scoped>
.container-fluid {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.row.fixed-bottom {
  background: #ffffff;
  border-top: 1px solid #dddddd;
}

.custom-pin-input {
  font-size: 2rem;
  letter-spacing: 0.5rem;
  border: none;
  outline: none;
  border-bottom: 2px solid #000;
  width: 100%;
  text-align: center;
}

.custom-pin-input::placeholder {
  color: transparent;
}

.custom-pin-input::-webkit-input-placeholder {
  color: transparent;
}

.btn {
  width: 80px;
  height: 80px;
  font-size: 1.5rem;
}

.btn-block {
  width: 100%;
}

.bi-backspace {
  font-size: 1.5rem;
}
</style>
