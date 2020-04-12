<template>
  <div class="Loading d-flex justify-center align-center">
    <v-progress-circular :size="50" width="5" color="primary" indeterminate />
  </div>
</template>

<style lang="scss">
.Loading {
  width: 100%;
  height: calc(100vh - 100px);
}
</style>
