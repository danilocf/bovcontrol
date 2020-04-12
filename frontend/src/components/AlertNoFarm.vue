<template>
  <v-alert border="left" outlined block type="warning" width="100%">
    No farm added yet.
    <a
      class="orange--text"
      @click="$emit('showDialog', { dialog: 'form', action: 'add' })"
    >
      <b>Click here to add.</b>
    </a>
  </v-alert>
</template>
