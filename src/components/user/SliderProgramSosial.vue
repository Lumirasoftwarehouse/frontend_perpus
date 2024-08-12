<template>
  <div class="photo-gallery">
    <div class="gallery-container">
      <div v-for="item in items" :key="item.id" class="gallery-item me-2">
        <img :src="item.photo" alt="Photo" class="gallery-photo"/>
        <div class="gallery-text">{{ item.text }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const items = [
      { id: 1, photo: 'https://via.placeholder.com/150', text: 'Photo 1' },
      { id: 2, photo: 'https://via.placeholder.com/150', text: 'Photo 2' },
      { id: 3, photo: 'https://via.placeholder.com/150', text: 'Photo 3' },
      { id: 4, photo: 'https://via.placeholder.com/150', text: 'Photo 4' },
      { id: 5, photo: 'https://via.placeholder.com/150', text: 'Photo 5' },
    ];

    return {
      items,
    };
  },
};
</script>

<style scoped>
.photo-gallery {
  overflow-x: auto;
  white-space: nowrap;
  /* padding: 20px; */
}


.gallery-item {
  display: inline-block;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s;
}

.gallery-item:hover {
  transform: scale(1.05);
}

.gallery-photo {
  display: block;
  width: 100%;
  border-bottom: 1px solid #eee;
}

.gallery-text {
  padding: 10px;
  text-align: center;
}
</style>
