<template>
  <div id="wrapper">
    <Sidebar :class="sidebarClass" />
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <Navbar @toggle-sidebar="toggleSidebar" />
        <div class="container-fluid mt-4">
          <h1 class="h3 mb-0 text-gray-800 text-center">List Anggota</h1>
          <button class="btn btn-success mt-3  float-end" data-toggle="modal" data-target="#addModal">Tambah Anggota</button>
          <div class="table-responsive">
            <div v-if="!ready" class="preloader"></div>
            <DataTable class="display table table-striped" v-if="ready">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Aksi</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Gender</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in dataAnggota" :key="item.id">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>
                    <div class="btn-group" role="group">
                      <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#editModal" @click="setEditData(item)">
                        <i class="bi bi-pencil-square"></i>
                      </button>
                      <button type="button" class="btn btn-danger" @click="confirmDeleteUser(item.id)">
                        <i class="bi bi-trash-fill"></i>
                      </button>
                    </div>
                  </td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.email }}</td>
                  <td>{{ item.gender }}</td>
                </tr>
              </tbody>
            </DataTable>
          </div>
        </div>
      </div>
      <Footer />
    </div>

    <!-- Modal Tambah Anggota -->
    <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="addModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addModalLabel">Tambah Anggota</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="addName">Name</label>
              <input type="text" class="form-control" id="addName" v-model="newUser.name">
            </div>
            <div class="form-group">
              <label for="addEmail">Email</label>
              <input type="email" class="form-control" id="addEmail" v-model="newUser.email">
            </div>
            <div class="form-group">
              <label for="addGender">Gender</label>
              <select class="form-control" id="addGender" v-model="newUser.gender">
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="addUser">Tambah</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Edit Anggota -->
    <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editModalLabel">Edit Anggota</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="editName">Name</label>
              <input type="text" class="form-control" id="editName" v-model="editUser.name">
            </div>
            <div class="form-group">
              <label for="editEmail">Email</label>
              <input type="email" class="form-control" id="editEmail" v-model="editUser.email">
            </div>
            <div class="form-group">
              <label for="editGender">Gender</label>
              <select class="form-control" id="editGender" v-model="editUser.gender">
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="updateUser">Update</button>
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
      dataAnggota: [],
      ready: false,
      newUser: {
        name: "",
        email: "",
        gender: "Laki-laki" // Default value
      },
      editUser: {
        id: null,
        name: "",
        email: "",
        gender: "Laki-laki" // Default value
      }
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarToggled = !this.sidebarToggled;
      this.sidebarClass = this.sidebarToggled ? "toggle-sidebar" : "";
    },
    async fetchDataAnggota() {
      try {
        this.ready = false;
        const response = await axios.get("http://127.0.0.1:5000/users");
        this.dataAnggota = response.data;
        this.ready = true;
      } catch (error) {
        this.ready = true;
        console.error(error);
      }
    },
    setEditData(item) {
      this.editUser.id = item.id;
      this.editUser.name = item.name;
      this.editUser.email = item.email;
      this.editUser.gender = item.gender;
    },
    async addUser() {
      try {
        await axios.post("http://127.0.0.1:5000/create-user", this.newUser);
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Anggota berhasil ditambahkan"
        });
        this.newUser.name = "";
        this.newUser.email = "";
        this.newUser.gender = "Laki-laki"; // Reset default value
        this.fetchDataAnggota();
        $('#addModal').modal('hide');
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Terjadi kesalahan saat menambahkan anggota"
        });
      }
    },
    async updateUser() {
      try {
        await axios.post(`http://127.0.0.1:5000/update-users/${this.editUser.id}`, this.editUser);
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Anggota berhasil diperbarui"
        });
        this.fetchDataAnggota();
        $('#editModal').modal('hide');
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Terjadi kesalahan saat memperbarui anggota"
        });
      }
    },
    async confirmDeleteUser(id) {
      const result = await Swal.fire({
        title: 'Apakah Anda yakin?',
        text: "Anda tidak akan dapat mengembalikan data ini!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus!'
      });

      if (result.isConfirmed) {
        this.deleteUser(id);
      }
    },
    async deleteUser(id) {
      try {
        await axios.delete(`http://127.0.0.1:5000/delete-user/${id}`);
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Anggota berhasil dihapus"
        });
        this.fetchDataAnggota();
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Terjadi kesalahan saat menghapus anggota"
        });
      }
    }
  },
  mounted() {
    this.fetchDataAnggota();
  }
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
  margin: 10px 0;
}
</style>
