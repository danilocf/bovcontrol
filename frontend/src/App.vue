<template>
  <v-app>
    <!-- FIXME: -->
    <img src="@/assets/logo.svg" style="position: fixed; top: 0; left: 10px" />

    <v-bottom-navigation v-model="bottomNav" app dark shift mandatory>
      <v-btn value="View">
        <span>View</span>
        <v-icon>visibility</v-icon>
      </v-btn>
      <v-btn value="Settings">
        <span>Settings</span>
        <v-icon>settings</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <v-content>
      <v-container fluid>
        <v-row>
          <v-col cols="6"> </v-col>
          <v-col cols="6" class="pa-5">
            <v-card class="mb-4">
              <v-card-title>Farm 1</v-card-title>
              <v-card-text>Text</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-fab-transition>
      <v-btn
        v-show="bottomNav === 'Settings'"
        bottom
        color="primary"
        dark
        fab
        fixed
        right
        @click="dialog = !dialog"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-dialog v-model="dialog" width="400px">
      <v-card>
        <v-card-title>
          Add new farm
        </v-card-title>
        <v-container> </v-container>
        <v-card-actions>
          <v-spacer />
          <v-btn text color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    bottomNav: "view",
    dialog: false
  })
};
</script>
