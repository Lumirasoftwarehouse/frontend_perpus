<script setup>
import Sidebar from "../../../components/admin/Sidebar.vue";
import Navbar from "../../../components/general/Navbar.vue";
import Footer from "../../../components/general/Footer.vue";
import Card from "../../../components/general/Card.vue";
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
          <h1 class="h3 mb-0 text-gray-800 text-center">List Product</h1>
          
          <div class="table-responsive">
            <div v-if="!ready" class="preloader"></div>
            <DataTable class="display table table-striped" v-if="ready">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Action</th>
                  <th scope="col">Product</th>
                  <th scope="col">Category</th>
                  <th scope="col">Brand</th>
                  <th scope="col">Seller</th>
                  <th scope="col">Price</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Desc</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in dataProduct" :key="item.id">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>
                    <button class="btn btn-success" @click="confirmationAdding(item)">
                      Add
                    </button>
                  </td>
                  <td>{{ item.product_name }}</td>
                  <td>{{ item.category }}</td>
                  <td>{{ item.brand }}</td>
                  <td>{{ item.seller_name }}</td>
                  <td>{{ item.price }}</td>
                  <td>{{ item.stock }}</td>
                  <td>{{ item.desc }}</td>
                  
                </tr>
              </tbody>
            </DataTable>
          </div>
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
import Swal from "sweetalert2";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";
DataTable.use(DataTablesCore);

export default {
  data() {
    return {
      dataProduct: [],
      user_id: "",
      ready: false,
      remainingTime: "Loading"
    };
  },
  methods: {
    async fetchDataProduct() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/harga/semua`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.dataProduct = response.data.data;
        this.ready = true;
      } catch (error) {
        console.error(error);
      }
    },
    confirmationAdding(product) {
      Swal.fire({
        title: `Konfirmasi Penambahan`,
        text: `Apakah Anda yakin ingin menambahkan product ${product.product_name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1cc88a",
        cancelButtonColor: "red",
        confirmButtonText: "Tambahkan",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          this.addingProduct(product);
        }
      });
    },
    addingProduct(product) {
      this.readyHotel = false;
      const formData = new FormData();
      formData.append("product_name", product.product_name);
      formData.append("category", product.category);
      formData.append("brand", product.brand);
      formData.append("type", product.type);
      formData.append("seller_name", product.seller_name);
      formData.append("price", product.price);
      formData.append("buyer_sku_code", product.buyer_sku_code);
      formData.append("seller_product_status", product.seller_product_status);
      formData.append("unlimited_stock", product.unlimited_stock);
      formData.append("stock", product.stock);
      formData.append("multi", product.multi);
      formData.append("start_cut_off", product.start_cut_off);
      formData.append("end_cut_off", product.end_cut_off);
      formData.append("desc", product.desc);
      axios
        .post(`http://127.0.0.1:8000/api/product/add-product`, 
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.showAlert(
            "Request Success",
            "Product berhasil ditambahkan",
            "success"
          );
        })
        .catch((error) => {
          this.showAlert("Request Failed", "Product gagal ditambahkan", "error");
          console.error(error);
          this.ready = true;
        });
    },
    showAlert(title, text, icon) {
      this.$swal({
        title: title,
        text: text,
        icon: icon,
      }).then(() => {
        $("#updateHotel").modal("hide");
      });
    },
  },
  created() {
    this.fetchDataProduct();
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
