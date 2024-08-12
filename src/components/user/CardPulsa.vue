<template>
  <div class="card bg-white" :class="{ 'selected-card': isSelected }" @click="selectCard">
    <div class="card-body">
      <h5 class="card-title fw-bold">{{ pulsa }}</h5>
      <p class="card-text">Rp{{ harga }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardPulsa',
  props: {
    pulsa: {
      type: String,
      required: true
    },
    harga: {
      type: String,
      required: true
    },
    isSelected: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    selectCard() {
      this.$emit('select', this.pulsa, this.harga);
    }
  }
}
</script>

<style scoped>
.card {
  margin-bottom: 1rem;
}
.selected-card {
  border: 2px solid blue;
}
</style>
