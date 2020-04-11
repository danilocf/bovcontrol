<template>
  <v-app>
    <!-- FIXME: -->
    <img src="@/assets/logo.svg" style="position: fixed; top: 0; left: 14px" />

    <v-bottom-navigation v-model="menu" app dark shift mandatory>
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
                    v-show="showActions"
                    style="position: absolute; top: -10px; right: -10px; z-index: 1;"
                  >
                    <v-btn
                      color="warning"
                      fab
                      x-small
                      class="mr-2"
                      @click="showDialogForm('edit', farm)"
                    >
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn
                      color="error"
                      fab
                      x-small
                      @click="showDialogDelete(farm)"
                    >
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </div>
                </v-fab-transition>
                <v-img src="@/assets/farm.jpg" height="170px" />
                <!-- FIXME: -->
                <v-card-text
                  class="pb-2"
                  @click="showDialogInfo(farm)"
                  style="cursor: pointer;"
                >
                  <v-fab-transition>
                    <div
                      v-if="showActions"
                      style="position: absolute; top: 180px; right: 10px; z-index: 1;"
                    >
                      <v-icon>info_outline</v-icon>
                    </div>
                  </v-fab-transition>
                  <h3 class="black--text mb-1">
                    {{ farm.name }}
                  </h3>
                  <p class="mb-2">
                    <small class="font-weight-light text--secondary">
                      {{ labels["owner"] }}
                    </small>
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

    <v-bottom-sheet v-model="dialogInfo">
      <v-sheet height="220" style="position: relative;">
        <v-icon
          size="50"
          style="position: absolute; top: 10px; left: 10px; opacity: .5;"
          >info_outline
        </v-icon>
        <div style="position: absolute; top: 10px; right: 10px;">
          <v-btn
            depressed
            small
            width="100"
            color="primary white--text mb-2"
            @click="dialogInfo = false"
            >Close<v-icon right color="white">close</v-icon></v-btn
          >
        </div>
        <div
          v-show="showActions"
          style="position: absolute; bottom: 10px; right: 10px;"
        >
          <v-btn
            depressed
            small
            width="100"
            color="warning white--text mb-2"
            @click="showDialogForm('edit', selectedFarm)"
            >Edit<v-icon right color="white">edit</v-icon></v-btn
          ><br />
          <v-btn
            depressed
            small
            width="100"
            color="error white--text"
            @click="showDialogDelete(selectedFarm)"
            >Delete<v-icon right color="white">delete</v-icon></v-btn
          >
        </div>
        <div class="py-5 ma-auto" style="max-width: 70vw">
          <v-simple-table dense>
            <template v-slot:default>
              <tbody>
                <tr v-for="(val, key, index) in selectedFarm" :key="index">
                  <td>
                    <small class="font-weight-light text--secondary">
                      {{ labels[key] }}
                    </small>
                  </td>
                  <td>{{ val }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </v-sheet>
    </v-bottom-sheet>

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
        @click="showDialogForm('add')"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-dialog v-model="dialogForm" width="400px">
      <v-card>
        <v-card-title>
          {{ dialogFormAction === "add" ? "Add new Farm" : "Edit Farm" }}
        </v-card-title>
        <v-container>
          <v-form ref="form" v-model="form.valid" lazy-validation>
            <v-text-field
              v-model="form.name"
              :rules="form.basicRule"
              :label="labels['name']"
              :disabled="form.loading"
              required
              dense
            />
            <v-text-field
              v-model="form.owner"
              :rules="form.basicRule"
              :label="labels['owner']"
              :disabled="form.loading"
              required
              dense
            />
            <v-text-field
              v-model="form.address"
              :rules="form.basicRule"
              :label="labels['address']"
              :disabled="form.loading"
              required
              dense
            />
            <v-text-field
              v-model="form.lat"
              :rules="form.basicRule"
              :label="labels['lat']"
              :disabled="form.loading"
              required
              dense
            />
            <v-text-field
              v-model="form.long"
              :rules="form.basicRule"
              :label="labels['long']"
              :disabled="form.loading"
              required
              dense
            />
          </v-form>
        </v-container>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="dialogForm = false">Cancel</v-btn>
          <v-btn color="primary" depressed @click="onSubmit">{{
            dialogFormAction === "add" ? "Add Farm" : "Save"
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDelete" width="400px">
      <v-card>
        <v-card-title>
          Delete farm
        </v-card-title>
        <v-container>todo...</v-container>
        <v-card-actions>
          <v-spacer />
          <v-btn text color="primary" @click="dialogDelete = false">
            Cancel
          </v-btn>
          <v-btn outlined color="error" @click="onDelete">
            {{ dialogDeleteConfirming ? "Click again to confirm" : "Delete" }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    menu: "View",
    dialogInfo: false,
    dialogForm: false,
    dialogFormAction: null,
    dialogDelete: false,
    dialogDeleteConfirming: false,
    farms: [
      {
        name: "Freire's Farm",
        owner: "Danilo Freire",
        address:
          "Rua Doutor Tertuliano Delphim Júnior, São José dos Campos - SP",
        lat: "40.689060",
        long: "74.044636",
        createdAt: "04-10-2020 3:56 PM",
        updatedAt: "04-10-2020 3:56 PM"
      }
    ],
    selectedFarm: {
      name: null,
      owner: null,
      address: null,
      lat: null,
      long: null,
      createdAt: null,
      updatedAt: null
    },
    form: {
      name: null,
      owner: null,
      address: null,
      lat: null,
      long: null,
      loading: false,
      valid: false,
      basicRule: [
        v => !!v || "This field is required",
        v =>
          (v && v.length <= 240) ||
          "This field must be less than 240 characters"
      ]
    },
    labels: {
      name: "Name",
      owner: "Owner",
      address: "Address",
      lat: "Latitude",
      long: "Longitude",
      createdAt: "Created at",
      updatedAt: "Updated at"
    }
  }),
  watch: {
    dialogDelete() {
      this.dialogDeleteConfirming = false;
    },
    dialogForm() {
      this.resetForm();
    }
  },
  computed: {
    showActions() {
      return this.menu === "Settings";
    }
  },
  mounted() {
    //
  },
  methods: {
    showDialogInfo(farm) {
      this.selectedFarm = farm;
      this.dialogInfo = true;
    },

    showDialogDelete(farm) {
      this.selectedFarm = farm;
      this.dialogDelete = true;
    },

    showDialogForm(action, farm) {
      this.dialogForm = true;
      this.dialogFormAction = action;
      this.$nextTick(() => {
        if (farm) {
          this.form.name = farm.name;
          this.form.owner = farm.owner;
          this.form.address = farm.address;
          this.form.lat = farm.lat;
          this.form.long = farm.long;
        }
      });
    },

    onDelete() {
      if (!this.dialogDeleteConfirming) {
        this.dialogDeleteConfirming = true;
        return;
      }
      this.dialogDelete = false;
    },

    onSubmit() {
      const valid = this.$refs.form.validate();
      if (valid) {
        this.dialogForm = false;
      }
    },

    resetForm() {
      this.form.name = null;
      this.form.owner = null;
      this.form.address = null;
      this.form.lat = null;
      this.form.long = null;
      this.$refs.form && this.$refs.form.resetValidation();
    }
  }
};
</script>
