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
      <v-sheet height="220" style="position: relative;">
        <v-icon
          size="50"
          @click="sheet = !sheet"
          style="position: absolute; top: 10px; left: 10px; opacity: .5;"
          >info_outline
        </v-icon>
        <div style="position: absolute; top: 10px; right: 10px;">
          <v-btn
            depressed
            small
            width="100"
            color="primary white--text mb-2"
            @click="sheet = !sheet"
            >Close<v-icon right color="white">close</v-icon></v-btn
          >
        </div>
        <div
          v-show="bottomNav === 'Settings'"
          style="position: absolute; bottom: 10px; right: 10px;"
        >
          <v-btn depressed small width="100" color="warning white--text mb-2"
            >Edit<v-icon right color="white">edit</v-icon></v-btn
          ><br />
          <v-btn depressed small width="100" color="error white--text"
            >Delete<v-icon right color="white">delete</v-icon></v-btn
          >
        </div>
        <div class="py-5 ma-auto" style="max-width: 70vw">
          <v-simple-table dense>
            <template v-slot:default>
              <tbody>
                <tr>
                  <td>
                    <small class="font-weight-light text--secondary"
                      >Name</small
                    >
                  </td>
                  <td>{{ farms[0].name }}</td>
                </tr>
                <tr>
                  <td>
                    <small class="font-weight-light text--secondary"
                      >Owner</small
                    >
                  </td>
                  <td>{{ farms[0].owner }}</td>
                </tr>
                <tr>
                  <td>
                    <small class="font-weight-light text--secondary"
                      >Address</small
                    >
                  </td>
                  <td>{{ farms[0].address }}</td>
                </tr>
                <tr>
                  <td>
                    <small class="font-weight-light text--secondary">Lat</small>
                  </td>
                  <td>{{ farms[0].lat }}</td>
                </tr>
                <tr>
                  <td>
                    <small class="font-weight-light text--secondary"
                      >Long</small
                    >
                  </td>
                  <td>{{ farms[0].long }}</td>
                </tr>
                <tr>
                  <td>
                    <small class="font-weight-light text--secondary"
                      >Created at</small
                    >
                  </td>
                  <td>{{ farms[0].createdAt }}</td>
                </tr>
                <tr>
                  <td>
                    <small class="font-weight-light text--secondary"
                      >Updated at</small
                    >
                  </td>
                  <td>{{ farms[0].updatedAt }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
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
