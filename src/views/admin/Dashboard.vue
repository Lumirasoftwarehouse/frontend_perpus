<script setup>
import Sidebar from "../../components/admin/Sidebar.vue";
import Navbar from "../../components/general/Navbar.vue";
import Footer from "../../components/general/Footer.vue";
import Card from "../../components/general/Card.vue";
import { ref } from "vue";

const sidebarToggled = ref(false);
const sidebarClass = ref("");

const toggleSidebar = () => {
  sidebarToggled.value = !sidebarToggled.value;
  sidebarClass.value = sidebarToggled.value ? "toggle-sidebar" : "";
};
</script>
<template>
  <div id="wrapper">
    <Sidebar :class="sidebarClass" />

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">
      <!-- Main Content -->
      <div id="content">
        <Navbar @toggle-sidebar="toggleSidebar" />

        <!-- Begin Page Content -->
        <div class="container-fluid mt-4">
          <h1 class="h3 mb-0 text-gray-800 text-center">Dashboard</h1>
          
        </div>
        <!-- /.container-fluid -->
      </div>
      <!-- End of Main Content -->

      <!-- Footer -->
      <Footer />
      <!-- End of Footer -->
    </div>
    <!-- End of Content Wrapper -->
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      dataDashboard: [],
      user_id: "",
      ready: false,
      remainingTime: "Loading"
    };
  },
  methods: {
  },
  created() {
    // const currentTimeUTC = new Date().toUTCString();
    // console.log("Waktu Sekarang (UTC):", currentTimeUTC);
    // const token = sessionStorage.getItem("token"); // Ambil token dari local storage

    // if (token) {
    //   try {
    //     const [headerBase64, signatureBase64] = token.split(".");
    //     const header = JSON.parse(atob(headerBase64));
    //     const signature = atob(signatureBase64);

    //     const tokenPayload = JSON.parse(atob(token.split(".")[1])); // Mendekode bagian payload dari token JWT
    //     const expTimestamp = tokenPayload.exp;

    //     const expDate = new Date(expTimestamp * 1000); // Konversi Unix Timestamp ke JavaScript Date

    //     console.log("Waktu Kedaluwarsa (UTC):", expDate.toUTCString()); // Tampilkan waktu kedaluwarsa dalam format UTC

    //     if (new Date() > expDate) {
    //       console.log("Keluar");
    //       sessionStorage.removeItem("token");
    //       this.$router.push("/");
    //     } else {
    //       console.log("Aman");
    //     }
    //     const level = tokenPayload.level; // Ambil level pengguna dari payload
    //     this.user_id = tokenPayload.id;
    //     if (level !== "1") {
    //       this.$router.push("/unauthorized");
    //     } else if (!header || !signature) {
    //       this.$router.push("/");
    //       sessionStorage.removeItem("token");
    //     }
    //     // success
    //     this.getAllDataProject();
    //     // akhir
    //   } catch (error) {
    //     console.error("Error decoding token:", error);
    //     this.$router.push("/"); // Tindakan jika terjadi kesalahan dekode
    //   }
    // } else {
    //   this.$router.push("/"); // Tindakan jika token tidak ada (pengguna belum terautentikasi)
    // }
  },
};
</script>


<style>
#content-wrapper {
  min-height: 780px !important;
}
</style>
