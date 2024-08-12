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
          <h1 class="h3 mb-0 text-gray-800 text-center">List Buku</h1>

          <!-- Tambah Buku Button -->
          <div class="text-right mt-3">
            <button
              class="btn btn-success"
              data-toggle="modal"
              data-target="#modalAddBook"
            >
              Tambah Buku
            </button>
          </div>

          <div class="table-responsive">
            <div v-if="!ready" class="preloader"></div>
            <DataTable class="display table table-striped" v-if="ready">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Aksi</th>
                  <th scope="col">Judul</th>
                  <th scope="col">Genre</th>
                  <th scope="col">Penulis</th>
                  <th scope="col">Tahun Terbit</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in DataBuku" :key="item.id">
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
                        data-toggle="modal"
                        data-target="#modalUpdate"
                        @click="setData(item)"
                      >
                        <i class="bi bi-pencil-square"></i>
                      </button>
                      <button
                        type="button"
                        class="btn btn-danger"
                        @click="confirmDeleteBook(item.id)"
                      >
                        <i class="bi bi-trash-fill"></i>
                      </button>
                    </div>
                  </td>
                  <td>{{ item.title }}</td>
                  <td>{{ item.genre }}</td>
                  <td>{{ item.author }}</td>
                  <td>{{ item.publishedYear }}</td>
                  <td>{{ item.available == 1 ? 'Tersedia' : 'Belum Tersedia' }}</td>
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

  <!-- Modal Add Book -->
  <div
    class="modal fade"
    id="modalAddBook"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modalAddBookLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalAddBookLabel">Tambah Buku</h5>
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
            <label for="title" class="form-label">Judul</label>
            <input
              type="text"
              class="form-control"
              id="title"
              v-model="dataselect.title"
            />
          </div>
          <div class="mb-3">
            <label for="genre" class="form-label">Genre</label>
            <input
              type="text"
              class="form-control"
              id="genre"
              v-model="dataselect.genre"
            />
          </div>
          <div class="mb-3">
            <label for="author" class="form-label">Penulis</label>
            <input
              type="text"
              class="form-control"
              id="author"
              v-model="dataselect.author"
            />
          </div>
          <div class="mb-3">
            <label for="publishedYear" class="form-label">Tahun Terbit</label>
            <input
              type="text"
              class="form-control"
              id="publishedYear"
              v-model="dataselect.publishedYear"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="addBook">
            Tambah
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- End Modal Add Book -->

  <!-- Modal Update Book -->
  <div
    class="modal fade"
    id="modalUpdate"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modalUpdateLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalUpdateLabel">Update Buku</h5>
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
            <label for="title" class="form-label">Judul</label>
            <input
              type="text"
              class="form-control"
              id="title"
              v-model="dataselect.title"
            />
          </div>
          <div class="mb-3">
            <label for="genre" class="form-label">Genre</label>
            <input
              type="text"
              class="form-control"
              id="genre"
              v-model="dataselect.genre"
            />
          </div>
          <div class="mb-3">
            <label for="author" class="form-label">Penulis</label>
            <input
              type="text"
              class="form-control"
              id="author"
              v-model="dataselect.author"
            />
          </div>
          <div class="mb-3">
            <label for="publishedYear" class="form-label">Tahun Terbit</label>
            <input
              type="text"
              class="form-control"
              id="publishedYear"
              v-model="dataselect.publishedYear"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="updateBook">
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- End Modal Update Book -->
</template>

<script>
import Sidebar from "../../components/admin/Sidebar.vue";
import Navbar from "../../components/general/Navbar.vue";
import Footer from "../../components/general/Footer.vue";
import axios from "axios";
import Swal from "sweetalert2";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";
DataTable.use(DataTablesCore);

export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
    DataTable,
  },
  data() {
    return {
      sidebarToggled: false,
      sidebarClass: "",
      DataBuku: [],
      dataselect: {
        title: "",
        genre: "",
        author: "",
        publishedYear: "",
      },
      ready: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarToggled = !this.sidebarToggled;
      this.sidebarClass = this.sidebarToggled ? "toggle-sidebar" : "";
    },
    async fetchDataBuku() {
      this.ready = false;
      try {
        const response = await axios.get("http://127.0.0.1:5000/books", {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        });
        this.DataBuku = response.data;
        this.ready = true;
      } catch (error) {
        console.error(error);
      }
    },
    async addBook() {
      try {
        const payload = {
          title: this.dataselect.title,
          genre: this.dataselect.genre,
          author: this.dataselect.author,
          publishedYear: this.dataselect.publishedYear,
          available: this.dataselect.available, // Add this if available is part of the payload
        };

        const response = await axios.post(
          "http://127.0.0.1:5000/create-book",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Buku berhasil ditambahkan",
        });
        // Close the modal
        $("#modalAddBook").modal("hide");
        this.fetchDataBuku(); // Reload the book data after adding a new one
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Terjadi kesalahan saat menambahkan buku",
        });
        // Close the modal
        $("#modalAddBook").modal("hide");
      }
    },

    async updateBook() {
      try {
        const payload = {
          title: this.dataselect.title,
          genre: this.dataselect.genre,
          author: this.dataselect.author,
          publishedYear: this.dataselect.publishedYear,
          available: this.dataselect.available, // Add this if available is part of the payload
        };

        const response = await axios.post(
          `http://127.0.0.1:5000/update-book/${this.dataselect.id}`,
          payload
        );

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Buku berhasil diupdate",
        });

        $("#modalUpdate").modal("hide");
        this.fetchDataBuku(); // Reload the book data after updating a book
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Terjadi kesalahan saat mengupdate buku",
        });
        $("#modalUpdate").modal("hide");
      }
    },
    async deleteBook(id) {
      try {
        const response = await axios.delete(
          `http://127.0.0.1:5000/books/${id}`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Buku berhasil dihapus",
        });

        this.fetchDataBuku(); // Reload the book data after deleting a book
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Terjadi kesalahan saat menghapus buku",
        });
      }
    },
    setData(item) {
      this.dataselect = { ...item };
    },
    confirmDeleteBook(id) {
      Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Anda tidak dapat mengembalikan data yang telah dihapus!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteBook(id);
        }
      });
    },
  },
  created() {
    this.fetchDataBuku();
  },
};
</script>

<style>
#content-wrapper {
  min-height: 780px !important;
}
</style>
