<template>
  <v-app>
    <!-- FIXME: -->
    <img src="@/assets/logo.svg" style="position: fixed; top: 0; left: 14px" />

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
          <v-col cols="5"> </v-col>
          <v-col cols="7">
            <div class="d-flex flex-wrap">
              <v-card
                v-for="(farm, index) in farms"
                :key="index"
                outlined
                class="font-weight-medium mb-4 mx-2"
                width="250px"
              >
                <!-- FIXME: -->
                <v-fab-transition>
                  <div
                    v-show="bottomNav === 'Settings'"
                    style="position: absolute; top: -10px; right: -10px; z-index: 1;"
                  >
                    <v-btn
                      color="warning"
                      fab
                      x-small
                      class="mr-2"
                      @click.prevent="alert('edit')"
                    >
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn color="error" fab x-small>
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </div>
                </v-fab-transition>
                <v-img src="@/assets/farm.jpg" height="170px" />
                <!-- FIXME: -->
                <v-card-text
                  class="pb-2"
                  @click="sheet = true"
                  style="cursor: pointer;"
                >
                  <v-fab-transition>
                    <div
                      v-if="bottomNav === 'Settings'"
                      style="position: absolute; top: 180px; right: 10px; z-index: 1;"
                    >
                      <v-icon>info_outline</v-icon>
                    </div>
                  </v-fab-transition>
                  <h3 class="black--text mb-1">
                    {{ farm.name }}
                  </h3>
                  <p class="mb-2">
                    <small class="font-weight-light text--secondary"
                      >Owner</small
                    >
                    {{ farm.owner }}
                  </p>
                  <!-- FIXME: -->
                  <small
                    class="d-inline-flex align-center text--secondary mb-0"
                    style="font-size: .8rem"
                  >
                    <v-icon small>room</v-icon>
                    +{{ farm.lat }} -{{ farm.long }}
                  </small>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-bottom-sheet v-model="sheet">
      <v-sheet class="text-center" height="200px">
        <v-btn class="mt-6" text color="red" @click="sheet = !sheet"
          >close</v-btn
        >
        <!-- FIXME: -->
        <div class="py-3">
          <p class="mb-0">
            <small class="font-weight-light text--secondary">Address</small>
            {{ farms[0].address }}
          </p>
          <p class="mb-0">
            <small
              class="d-inline-flex align-center font-weight-light mr-1 mb-0"
              style="font-size: .8rem"
            >
              <v-icon small class="mr-1">schedule</v-icon>
              {{ farms[0].createdAt }}
            </small>
            <small
              class="d-inline-flex align-center font-weight-light mr-1 mb-0"
              style="font-size: .8rem"
            >
              <v-icon small class="mr-1">history</v-icon>
              {{ farms[0].updatedAt }}
            </small>
          </p>
        </div>
      </v-sheet>
    </v-bottom-sheet>

    <v-fab-transition>
      <v-btn
        v-show="bottomNav === 'Settings'"
        bottom
        color="primary"
        dark
        fab
        fixed
        right
        large
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
    sheet: false,
    dialog: false,
    farms: [
      {
        name: "Freire's Farm",
        owner: "Danilo Freire",
        address:
          "Rua Doutor Tertuliano Delphim Júnior, São José dos Campos - SP",
        lat: "40.689060",
        long: "74.044636",
        createdAt: "04-10-2020 3:56 PM",
        updatedAt: "04-10-2020 3:56 PM",
        showTime: false
      },
      {
        name: "Freire's Farm",
        owner: "Danilo Freire",
        address:
          "Rua Doutor Tertuliano Delphim Júnior, São José dos Campos - SP",
        lat: "40.689060",
        long: "74.044636",
        createdAt: "04-10-2020 3:56 PM",
        updatedAt: "04-10-2020 3:56 PM",
        showTime: false
      },
      {
        name: "Freire's Farm",
        owner: "Danilo Freire",
        address:
          "Rua Doutor Tertuliano Delphim Júnior, São José dos Campos - SP",
        lat: "40.689060",
        long: "74.044636",
        createdAt: "04-10-2020 3:56 PM",
        updatedAt: "04-10-2020 3:56 PM",
        showTime: false
      },
      {
        name: "Freire's Farm",
        owner: "Danilo Freire",
        address:
          "Rua Doutor Tertuliano Delphim Júnior, São José dos Campos - SP",
        lat: "40.689060",
        long: "74.044636",
        createdAt: "04-10-2020 3:56 PM",
        updatedAt: "04-10-2020 3:56 PM",
        showTime: false
      },
      {
        name: "Freire's Farm",
        owner: "Danilo Freire",
        address:
          "Rua Doutor Tertuliano Delphim Júnior, São José dos Campos - SP",
        lat: "40.689060",
        long: "74.044636",
        createdAt: "04-10-2020 3:56 PM",
        updatedAt: "04-10-2020 3:56 PM",
        showTime: false
      }
    ]
  }),
  mounted() {
    // setInterval(() => {
    //   this.farms.push(Object.assign({}, this.farms[0]))
    //   this.$vuetify.goTo(9999)
    // }, 1000)
  }
};
</script>
