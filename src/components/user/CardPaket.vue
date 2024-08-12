<template>
  <div class="card bg-white" :class="{ 'selected-card': isSelected }" @click="selectCard">
    <div class="card-body">
      <h5 class="card-title fw-bold">{{ title }}</h5>
      <p class="card-description">{{ description }}</p>
      <p class="card-text">Rp{{ price }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardPaket',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
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
      this.$emit('select', this.title, this.price);
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
