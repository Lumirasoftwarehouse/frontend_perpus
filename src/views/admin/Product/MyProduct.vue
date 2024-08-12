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
          <h1 class="h3 mb-0 text-gray-800 text-center">Price List</h1>

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
                  <th scope="col">Margin</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Desc</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in dataProduct" :key="item.id">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>
                    <div
                      class="btn-group"
                      role="group"
                      aria-label="Basic mixed styles example"
                    >
                      <button
                        type="button"
                        class="btn btn-warning"
                        @click="setData(item)"
                        data-toggle="modal"
                        data-target="#modalMargin"
                      >
                        <i class="bi bi-pencil-square"></i>
                      </button>
                      <button type="button" class="btn btn-danger" @click="confirmationDeleting(item)">
                        <i class="bi bi-trash-fill"></i>
                      </button>
                    </div>
                  </td>
                  <td>{{ item.product_name }}</td>
                  <td>{{ item.category }}</td>
                  <td>{{ item.brand }}</td>
                  <td>{{ item.seller_name }}</td>
                  <td>{{ item.price }}</td>
                  <td>{{ item.margin }}</td>
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

  <!-- Modal set margin -->
  <div
    class="modal fade"
    id="modalMargin"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modalMarginLabel"
    aria-hidden="true"
    ref="modalMarginRef"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalMarginLabel">Atur Margin</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="margin" class="form-label">Margin</label>
            <input
              type="number"
              class="form-control"
              id="margin"
              v-model="dataSelected.margin"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
          <button type="submit" class="btn btn-primary" @click="updateSosial()">
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- end Modal set margin -->
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
      dataSelected: [],
      user_id: "",
      ready: false,
      remainingTime: "Loading",
    };
  },
  methods: {
    setData(product) {
      this.dataSelected = product;
    },
    async updateSosial() {
      try {
        const formData = new FormData();
        formData.append("buyer_sku_code", this.dataSelected.buyer_sku_code);
        formData.append("margin", this.dataSelected.margin);
        const response = await axios.post(
          `http://127.0.0.1:8000/api/product/margin-product`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        this.showAlert("Success", "Margin product berhasil di atur", "success");
      } catch (error) {
        console.error(error); // Handle error if any
        this.showAlert(
          "Oops...",
          "Terjadi kesalahan saat mengatur margin",
          "error"
        );
      }
    },
    async fetchDataProduct() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/product/list-product-pulsa-data`,
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
    confirmationDeleting(product) {
      Swal.fire({
        title: `Konfirmasi Penghapusan`,
        text: `Apakah Anda yakin ingin menghapus product ${product.product_name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "red",
        cancelButtonColor: "grey",
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteProduct(product.id);
        }
      });
    },
    deleteProduct(id) {
      this.ready = false;
      axios
        .delete(`http://127.0.0.1:8000/api/product/delete-product/${id}`, 
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
            "Product berhasil dihapus",
            "success"
          );
          this.fetchDataProduct();
        })
        .catch((error) => {
          this.showAlert("Request Failed", "Product gagal dihapus", "error");
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
        $("#modalMargin").modal("hide");
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
