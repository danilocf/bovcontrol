<template>
  <v-bottom-navigation
    :value="value"
    @change="v => $emit('input', v)"
    app
    dark
    shift
    mandatory
    class="Menu"
  >
    <v-btn value="View">
      <span>View</span>
      <v-icon>visibility</v-icon>
    </v-btn>
    <v-btn value="Settings">
      <span>Settings</span>
      <v-icon>settings</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss">
.Menu {
  z-index: 100;
}
</style>
