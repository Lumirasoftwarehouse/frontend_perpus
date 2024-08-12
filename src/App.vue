<template>
  <div id="page-top">
    <router-view/>
    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded bg-success" href="#page-top">
        <i class="fas fa-angle-up"></i>
    </a>
  </div>
</template>

<script>
export default{
  data() {
  return {};
},

}
</script>

<style scoped>
.customToTop{
  margin-bottom: 60px;
}
</style>
