<template>
  <div id="wrapper">
    <Sidebar :class="sidebarClass" />
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <Navbar @toggle-sidebar="toggleSidebar" />
        <div class="container-fluid mt-4">
          <h1 class="h3 mb-0 text-gray-800 text-center">Peminjaman Buku</h1>
          <button class="btn btn-success mt-3 float-end" data-toggle="modal" data-target="#addModal">Tambah Peminjaman</button>
          <div class="table-responsive">
            <div v-if="!ready" class="preloader">Loading...</div>
            <DataTable class="display table table-striped" v-if="ready">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Aksi</th>
                  <th scope="col">Judul Buku</th>
                  <th scope="col">Peminjam</th>
                  <th scope="col">Tanggal Pinjam</th>
                  <th scope="col">Tanggal Kembali</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in dataPeminjaman" :key="item.id">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>
                    <div class="btn-group" role="group">
                      <button type="button" class="btn btn-danger" @click="confirmDeleteLoan(item.id)">
                        <i class="bi bi-trash-fill"></i>
                      </button>
                      <button type="button" class="btn btn-warning" @click="confirmReturnLoan(item.id)">
                        <i class="bi bi-arrow-counterclockwise"></i>
                      </button>
                    </div>
                  </td>
                  <td>{{ item.book.title }}</td>
                  <td>{{ item.user.name }}</td>
                  <td>{{ formatDate(item.loanDate) }}</td>
                  <td>{{ formatDate(item.returnDate) }}</td>
                </tr>
              </tbody>
            </DataTable>
          </div>
        </div>
      </div>
      <Footer />
    </div>

    <!-- Modal Tambah Peminjaman -->
    <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addModalLabel">Tambah Peminjaman</h5>
            <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addLoan">
              <div class="mb-3">
                <label for="bookId" class="form-label">Pilih Buku</label>
                <select v-model="loanData.bookId" class="form-control" required>
                  <option v-for="book in availableBooks" :key="book.id" :value="book.id">{{ book.title }}</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="userId" class="form-label">Pilih User</label>
                <select v-model="loanData.userId" class="form-control" required>
                  <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary">Simpan</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "../../components/admin/Sidebar.vue";
import Navbar from "../../components/general/Navbar.vue";
import Footer from "../../components/general/Footer.vue";
import axios from "axios";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";
import Swal from "sweetalert2";

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
      ready: false,
      dataPeminjaman: [],
      availableBooks: [],
      users: [],
      loanData: {
        bookId: null,
        userId: null,
      },
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarToggled = !this.sidebarToggled;
      this.sidebarClass = this.sidebarToggled ? "toggle-sidebar" : "";
    },
    async fetchDataPeminjaman() {
      try {
        this.ready = false;
        const response = await axios.get("http://127.0.0.1:5000/loans");
        this.dataPeminjaman = response.data;
        this.ready = true;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchAvailableBooks() {
      try {
        const response = await axios.get("http://127.0.0.1:5000/books");
        this.availableBooks = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchUsers() {
      try {
        const response = await axios.get("http://127.0.0.1:5000/users");
        this.users = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async addLoan() {
      try {
        const response = await axios.post("http://127.0.0.1:5000/loans", this.loanData);
        this.dataPeminjaman.push(response.data);
        this.loanData = { bookId: null, userId: null };
        this.fetchAvailableBooks(); // Refresh the available books list
        this.fetchDataPeminjaman(); // Refresh table data
        $('#addModal').modal('hide');
      } catch (error) {
        console.error(error);
      }
    },
    async confirmReturnLoan(id) {
      try {
        const result = await Swal.fire({
          title: "Apakah anda yakin?",
          text: "Buku ini akan dikembalikan!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya, kembalikan!",
        });

        if (result.isConfirmed) {
          await this.returnLoan(id);
          this.fetchDataPeminjaman(); // Refresh table data
          Swal.fire("Dikembalikan!", "Buku telah dikembalikan.", "success");
        }
      } catch (error) {
        console.error(error);
      }
    },
    async returnLoan(id) {
      try {
        await axios.post("http://127.0.0.1:5000/loans-return", { loanId: id });
        this.dataPeminjaman = this.dataPeminjaman.map((item) => 
          item.id === id ? { ...item, returnDate: new Date().toISOString() } : item
        );
      } catch (error) {
        console.error(error);
      }
    },
    async confirmDeleteLoan(id) {
      try {
        const result = await Swal.fire({
          title: "Apakah anda yakin?",
          text: "Data ini akan dihapus!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya, hapus!",
        });

        if (result.isConfirmed) {
          await axios.delete(`http://127.0.0.1:5000/loans/${id}`);
          this.dataPeminjaman = this.dataPeminjaman.filter((item) => item.id !== id);
          this.fetchAvailableBooks(); // Refresh the available books list
          this.fetchDataPeminjaman(); // Refresh table data
          Swal.fire("Terhapus!", "Data telah dihapus.", "success");
        }
      } catch (error) {
        console.error(error);
      }
    },
    formatDate(date) {
      if (!date) return "-";
      return new Date(date).toLocaleDateString();
    },
  },
  mounted() {
    this.fetchDataPeminjaman();
    this.fetchAvailableBooks();
    this.fetchUsers();
  },
};
</script>

<style>
.toggle-sidebar {
  margin-left: 0 !important;
}

.sidebar .nav-item .nav-link {
  text-align: left;
}

.dataTables_wrapper .dataTables_length,
.dataTables_wrapper .dataTables_filter,
.dataTables_wrapper .dataTables_info,
.dataTables_wrapper .dataTables_paginate {
  padding: 10px;
}

.preloader {
  text-align: center;
  padding: 100px;
  font-size: 24px;
}
</style>
