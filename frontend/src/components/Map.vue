<template>
  <l-map
    style="height: calc(100vh - 56px); z-index: 0;"
    :zoom="zoom"
    :center="center"
  >
    <l-tile-layer :url="url" />
    <l-marker v-for="(mark, index) in markers" :key="index" :lat-lng="mark" />
  </l-map>
</template>

<script>
export default {
  props: {
    markers: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    zoom: 3,
    center: [10.223945, -80.442116]
  })
};
</script>
