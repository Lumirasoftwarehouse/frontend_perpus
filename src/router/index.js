import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/pin',
      name: 'pin',
      component: () => import('../views/Pin.vue')
    },

    // admin
    {
      path: '/',
      name: 'dashboard',
      component: () => import('../views/admin/Dashboard.vue')
    },
    {
      path: '/buku',
      name: 'buku',
      component: () => import('../views/admin/Buku.vue')
    },
    {
      path: '/peminjaman',
      name: 'peminjaman',
      component: () => import('../views/admin/Peminjaman.vue')
    },
    {
      path: '/anggota',
      name: 'anggota',
      component: () => import('../views/admin/Anggota.vue')
    },

  ]
})

export default router
