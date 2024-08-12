<template>
  <div>
    <router-link :to="{ name: path }">
      <div
        class="menu-item text-center"
        :style="{ backgroundColor: backgroundColor }"
      >
        <div class="icon-wrapper">
          <i :class="icon"></i>
        </div>
      </div>
      <span>{{ title }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    backgroundColor: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: #fff;
  text-align: center;
  margin: 10px auto;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

span {
  font-size: 13px;
  text-align: center;
}

.icon-wrapper {
  font-size: 1.5em;
  margin-bottom: 5px;
}
</style>
