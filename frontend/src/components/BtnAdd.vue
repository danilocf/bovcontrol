<template>
  <v-fab-transition>
    <v-btn
      v-show="showActions"
      bottom
      color="primary"
      dark
      fab
      fixed
      right
      large
      id="add"
      class="BtnAdd"
      @click="$emit('showDialog', { dialog: 'form', action: 'add' })"
    >
      <v-icon>add</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script>
export default {
  props: {
    showActions: {
      type: Boolean,
      required: false,
      default: false
    }
  }
};
</script>

<style lang="scss">
.BtnAdd {
  z-index: 101;
}
</style>
