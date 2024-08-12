<template>
  <div class="card bg-white">
    <div class="card-body">
      <h5 class="card-title fw-bold">{{ title }}</h5>
      <p class="card-description">{{ description }}</p>
      <p class="card-text text-warning">Rp{{ price }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardVoucherGame',
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
    }
  }
}
</script>

<style scoped>
.card {
  margin-bottom: 1rem;
}
.card-title{
  color: black;
}
.card-description{
  font-size: 10px;
  color: grey;
}

</style>
