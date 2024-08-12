<template>
  <div class="bottom-menu">
    <div 
      class="menu-item" 
      v-for="item in menuItems" 
      :key="item.label" 
      :class="{ active: item.label === activeItem }" 
      @click="setActiveItem(item.label)"
    >
    <router-link class="text-dark" :to="item.path">
      <i :class="`bi bi-${item.icon}`"></i>
      <div class="menu-label">{{ item.label }}</div>
    </router-link>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const menuItems = [
      { label: 'Home', icon: 'house-door', path: '/' },
      { label: 'Voucher', icon: 'ticket', path: 'profile' },
      { label: 'Bayar', icon: 'credit-card', path: 'profile' },
      { label: 'Inbox', icon: 'envelope', path: 'profile' },
      { label: 'Profile', icon: 'person', path: '/profile' },
    ];
    const activeItem = ref('Home');

    const setActiveItem = (label) => {
      activeItem.value = label;
    };

    return {
      menuItems,
      activeItem,
      setActiveItem,
    };
  },
};
</script>

<style scoped>
.bottom-menu {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  border-top: 1px solid #ddd;
}

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #333;
  text-decoration: none;
  cursor: pointer;
}

.menu-item .bi {
  font-size: 1.2rem;
  /* color: black; */
}

.menu-item.active .bi,
.menu-item.active .menu-label {
  color: green;
}

.menu-label {
  margin-top: 5px;
  font-size: 12px;
}
</style>
